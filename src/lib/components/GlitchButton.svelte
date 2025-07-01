<script lang="ts">
  export let text: string;
  export let href: string;

  let isHovered = false;
</script>

<a 
  class="holo-btn" 
  class:hovered={isHovered}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
  href={href}
>
  <span>{text}</span>
</a>

<style>
  
  .holo-btn {
    position: relative;
    display: inline-block;
    background: linear-gradient(45deg, #001122, #003366, #001122);
    border: none;
    color: #ff709d;
    padding: 1rem 4rem;
    font-family: 'Press Start 2P', cursive;
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-decoration: none;
    cursor: pointer;
    clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
    transform: perspective(1000px) rotateX(0deg);
  }
  
  /* Constantly rotating holographic border */
  .holo-btn::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg, 
      transparent, 
      #00ffff, 
      transparent, 
      #ff00ff, 
      transparent
    );
    animation: rotate 3s linear infinite;
    opacity: 0.8;
  }
  
  /* Inner background to create border effect */
  .holo-btn::after {
    content: '';
    position: absolute;
    inset: 2px;
    background: linear-gradient(45deg, #001122, #003366, #001122);
    clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);
    z-index: 1;
    transition: background 0.4s ease;
  }
  
  .holo-btn span {
    position: relative;
    z-index: 2;
    display: block;
    transition: all 0.4s ease;
  }

  .holo-btn.hovered {
    color: #70ffdf;
  }
    
  @keyframes rotate {
    0% { 
      transform: rotate(0deg); 
    }
    100% { 
      transform: rotate(360deg); 
    }
  }
  
  @keyframes borderPulse {
    0% { 
      transform: rotate(0deg) scale(1);
      filter: brightness(1) saturate(1);
    }
    50% {
      transform: rotate(180deg) scale(1.2);
      filter: brightness(1.5) saturate(1.8);
    }
    100% { 
      transform: rotate(360deg) scale(1);
      filter: brightness(1.2) saturate(1.4);
    }
  }
</style>