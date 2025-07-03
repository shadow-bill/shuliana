<script>
  import { onMount } from 'svelte';
  
  let canvas;
  let gl;
  let animationId;
  let offset = 0;
  let lastTime = 0;
  let isVisible = true;
  
  // Animation speed (pixels per second)
  const ANIMATION_SPEED = 60;
  
  // WebGL program and uniforms
  let program;
  let uniforms = {};
  let vertexBuffer;
  
  // Performance optimizations
  let targetFPS = 60;
  let frameInterval = 1000 / targetFPS;
  let lastFrameTime = 0;
  
  const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;
  
  const fragmentShaderSource = `
    precision mediump float; // Use mediump for better performance on mobile
    
    uniform vec2 u_resolution;
    uniform float u_offset;
    
    // Optimized constants
    const float HORIZON_Y = 0.4;
    const float VANISHING_X = 0.5;
    const float LINE_SPACING = 100.0;
    const float VERT_SPACING = 125.0;
    const int MAX_H_LINES = 15; // Reduced from 20
    const int MAX_V_LINES = 20; // Reduced from 30
    
    // Pre-calculated colors to avoid runtime calculations
    const vec3 BG_COLOR = vec3(0.04, 0.04, 0.06);
    const vec3 CYAN = vec3(0.0, 1.0, 1.0);
    const vec3 MAGENTA = vec3(1.0, 0.0, 1.0);
    const vec3 PURPLE = vec3(0.54, 0.17, 0.89);
    const vec3 BLUE = vec3(0.12, 0.56, 1.0);
    
    // Optimized smoothstep for line rendering
    float fastSmoothstep(float edge0, float edge1, float x) {
      float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      return t * t * (3.0 - 2.0 * t);
    }
    
    vec3 synthwaveGrid(vec2 uv, vec2 resolution) {
      vec3 color = BG_COLOR;
      
      // Pre-calculate common values
      float invResY = 1.0 / resolution.y;
      float invResX = 1.0 / resolution.x;
      float heightRange = 1.0 - HORIZON_Y;
      
      // Atmosphere gradient (simplified)
      float atmosphereGrad = fastSmoothstep(HORIZON_Y, 1.0, uv.y);
      color += PURPLE * 0.1 * atmosphereGrad + BLUE * 0.025 * atmosphereGrad;
      
      // Horizontal lines (reduced count)
      float totalSpacing = float(MAX_H_LINES) * LINE_SPACING;
      float offsetMod = mod(u_offset, LINE_SPACING);
      
      for (int i = 0; i < MAX_H_LINES; i++) {
        float fi = float(i);
        float baseProgress = (fi * LINE_SPACING + offsetMod) / totalSpacing;
        float y = HORIZON_Y + heightRange * pow(baseProgress, 2.5);
        
        // Early exit if line is outside visible area
        if (y <= HORIZON_Y || y >= 1.0) continue;
        
        float distanceRatio = (y - HORIZON_Y) / heightRange;
        float opacity = pow(distanceRatio, 0.5);
        float lineWidth = (1.0 + distanceRatio * 2.0) * invResY;
        
        float lineDist = abs(uv.y - y);
        float lineIntensity = fastSmoothstep(lineWidth, 0.0, lineDist);
        
        // Skip expensive calculations if line is not visible
        if (lineIntensity > 0.01) {
          color += CYAN * lineIntensity * opacity * 0.8;
          // Simplified glow (removed expensive exp function)
          color += CYAN * lineIntensity * opacity * 0.1;
        }
      }
      
      // Central vertical line (optimized)
      float centralLineDist = abs(uv.x - VANISHING_X);
      float centralLineWidth = 2.0 * invResY;
      float centralIntensity = fastSmoothstep(centralLineWidth, 0.0, centralLineDist);
      
      if (centralIntensity > 0.01 && uv.y >= HORIZON_Y) {
        float lineProgress = (uv.y - HORIZON_Y) / heightRange;
        vec3 lineColor = mix(CYAN, MAGENTA, 1.0 - lineProgress);
        float lineOpacity = mix(0.0, 0.8, lineProgress);
        if (lineProgress > 0.7) lineOpacity *= (1.0 - lineProgress) / 0.3;
        
        color += lineColor * centralIntensity * lineOpacity;
      }
      
      // Vertical/perspective lines (reduced count)
      float vanishingXPixels = VANISHING_X * resolution.x;
      
      for (int i = -MAX_V_LINES; i <= MAX_V_LINES; i++) {
        if (i == 0) continue; // Skip center line (already drawn)
        
        float fi = float(i);
        float baseXPixels = vanishingXPixels + (fi * VERT_SPACING);
        float startXPixels = baseXPixels + (fi * VERT_SPACING * 2.0);
        float endXPixels = vanishingXPixels + (fi * 10.0);
        
        float startX = startXPixels * invResX;
        float endX = endXPixels * invResX;
        
        // Early culling - skip lines completely outside view
        if ((startX < 0.0 && endX < 0.0) || (startX > 1.0 && endX > 1.0)) continue;
        
        // Optimized line equation
        float denom = endX - startX;
        if (abs(denom) < 0.001) continue; // Avoid division by near-zero
        
        float lineSlope = (HORIZON_Y - 1.0) / denom;
        float lineIntercept = 1.0 - lineSlope * startX;
        float lineY = lineSlope * uv.x + lineIntercept;
        float lineDist = abs(uv.y - lineY);
        
        // Bounds check with early exit
        bool withinBounds = (uv.y >= HORIZON_Y && uv.y <= 1.0) &&
                           ((startX < endX && uv.x >= startX && uv.x <= endX) ||
                            (startX > endX && uv.x >= endX && uv.x <= startX));
        
        if (withinBounds) {
          float lineWidth = 2.0 * invResY;
          float lineIntensity = fastSmoothstep(lineWidth, 0.0, lineDist);
          
          if (lineIntensity > 0.01) {
            float lineProgress = (uv.y - HORIZON_Y) / heightRange;
            vec3 lineColor = mix(CYAN, MAGENTA, 1.0 - lineProgress);
            float lineOpacity = mix(0.0, 0.8, lineProgress);
            if (lineProgress > 0.7) lineOpacity *= (1.0 - lineProgress) / 0.3;
            
            color += lineColor * lineIntensity * lineOpacity;
          }
        }
      }
      
      // Simplified horizon glow
      float horizonDist = abs(uv.y - HORIZON_Y);
      float horizonGlow = fastSmoothstep(50.0 * invResY, 0.0, horizonDist);
      color += PURPLE * horizonGlow * 0.3;
      
      // Simplified vignette
      vec2 center = vec2(0.5, 0.5);
      float vignette = 1.0 - fastSmoothstep(0.0, 1.0, length(uv - center));
      color *= mix(0.6, 1.0, vignette);
      
      return color;
    }
    
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      uv.y = 1.0 - uv.y;
      vec3 color = synthwaveGrid(uv, u_resolution);
      gl_FragColor = vec4(color, 1.0);
    }
  `;
  
  onMount(() => {
    gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false, // Disable for performance
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });
    
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    
    // Performance optimizations
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.STENCIL_TEST);
    gl.disable(gl.BLEND);
    
    initWebGL();
    resizeCanvas();
    detectPerformance();
    
    lastTime = performance.now();
    animate();
    
    // Visibility API for performance
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', resizeCanvas);
    }
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', resizeCanvas);
      }

      cancelAnimationFrame(animationId);
    };
  });
  
  function detectPerformance() {
    // Simple performance detection
    const canvas2d = document.createElement('canvas');
    const ctx = canvas2d.getContext('2d');
    const start = performance.now();
    
    // Simple benchmark
    for (let i = 0; i < 1000; i++) {
      ctx.fillRect(i % 100, i % 100, 10, 10);
    }
    
    const renderTime = performance.now() - start;
    
    // Adjust quality based on performance
    if (renderTime > 50) {
      targetFPS = 30; // Lower FPS for slower devices
    }
    
    frameInterval = 1000 / targetFPS;
  }
  
  function handleVisibilityChange() {
    isVisible = !document.hidden;
    if (isVisible && !animationId) {
      lastTime = performance.now();
      animate();
    }
  }
  
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 100); // Debounce resize
  }
  
  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }
  
  function createProgram(vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }
  
  function initWebGL() {
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      console.error('Failed to create shaders');
      return;
    }
    
    program = createProgram(vertexShader, fragmentShader);
    if (!program) {
      console.error('Failed to create WebGL program');
      return;
    }
    
    gl.useProgram(program);
    
    // Get uniform locations
    uniforms.resolution = gl.getUniformLocation(program, 'u_resolution');
    uniforms.offset = gl.getUniformLocation(program, 'u_offset');
    
    // Create vertex buffer for full-screen quad
    const vertices = new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]);
    
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  }
  
  function resizeCanvas() {
    if (!canvas || !gl) return;
    
    const dpr = window.devicePixelRatio || 1;
    const maxDPR = 2;
    const effectiveDPR = Math.min(dpr, maxDPR);
    
    // Use Visual Viewport API if available, fallback to window dimensions
    let displayWidth, displayHeight;
    
    if (window.visualViewport) {
      displayWidth = window.visualViewport.width;
      displayHeight = window.visualViewport.height;
    } else {
      displayWidth = window.innerWidth;
      displayHeight = window.innerHeight;
    }
    
    canvas.width = displayWidth * effectiveDPR;
    canvas.height = displayHeight * effectiveDPR;
    
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';
    
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  
  function animate(currentTime = performance.now()) {
    if (!isVisible) {
      animationId = null;
      return;
    }
    
    // Frame rate limiting
    const deltaTime = currentTime - lastFrameTime;
    if (deltaTime < frameInterval) {
      animationId = requestAnimationFrame(animate);
      return;
    }
    
    lastFrameTime = currentTime - (deltaTime % frameInterval);
    
    // Calculate time delta in seconds
    const timeDelta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
    // Update offset
    offset += ANIMATION_SPEED * timeDelta;
    
    render();
    animationId = requestAnimationFrame(animate);
  }
  
  function render() {
    if (!program || !gl) return;
    
    // Set uniforms (removed unused u_time)
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.offset, offset);
    
    // Clear and draw
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
</script>

<style>
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #000;
  }
  
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

<div class="container">
  <canvas bind:this={canvas}></canvas>
</div>