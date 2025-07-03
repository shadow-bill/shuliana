<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import DebugMenu from '$lib/components/DebugMenu.svelte';
	import { type SpriteData } from '$lib/ImageLoader';
    import { type World, type Actor, type Tile, type Animation, type AnimationName, type AnimationDirection, type Prefab, type Particle, getTile, getDecoration, getActor, getCheckpoint, getParticle } from '$lib/GameObjectFactory';

	export let GameImages: Record<string, SpriteData> = {};
    export let PlayerName: string;
    export let PlayerX: number;

    let canvasFocused: boolean
    let animationId: number;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
    let lastTime = 0;
    let canvasWidth = 640;
    let isVisible = false;
    let intersectionObserver: IntersectionObserver | null = null;

    // Reactive statement that runs when window dimensions change
    $: if (canvas) {
        resizeCanvas();
    }

    function resizeCanvas() {
        if (canvas.parentElement == null) {
            return;
        }

        const rect = canvas.parentElement.getBoundingClientRect();
        canvasWidth = rect.width;
        
        // Update canvas dimensions
        canvas.width = canvasWidth;
    }

    // This allows us to have full reactivity for the name / image object in real-time
    let playerCharacter = getActor('Shane', 'Groom', 'Idle');

    // init location is a little easier
    playerCharacter.x = 4542;

    Object.defineProperty(playerCharacter, 'x', {
        get() { return PlayerX; },
        set(x: number) { PlayerX = x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(playerCharacter, 'name', {
        get() { return PlayerName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(playerCharacter, 'image', {
        get() { return PlayerName === "Shane" ? "Groom" : "Bride"; },
        enumerable: true,
        configurable: true
    });

    let game: World = {
        camera: {
            x: 0,
            y: 0,
            smoothing: 0.1
        },
        worldBounds: {
            top: -400,
            bottom: 400,
            left: -256,
            right: 5568,
        },
        prefabs: {
            House: {
                tiles: [
                    getTile("WoodWallTopLeft", 0, 0, 1, 1),
                    getTile("WoodWallTopMiddleLeft", 1, 0, 1, 1),
                    getTile("WoodWallTopMiddleRight", 2, 0, 1, 1),
                    getTile("WoodWallTopRight", 3, 0, 1, 1),
                    getTile("WoodWallMiddleLeft", 0, 1, 1, 1),
                    getTile("WoodWallMiddleMiddleLeft", 1, 1, 1, 1),
                    getTile("WoodWallMiddleMiddleRight", 2, 1, 1, 1),
                    getTile("WoodWallMiddleRight", 3, 1, 1, 1),
                    getTile("WoodWallBottomLeft", 0, 2, 1, 1),
                    getTile("WoodWallBottomMiddleLeft", 1, 2, 1, 1),
                    getTile("WoodWallBottomMiddleRight", 2, 2, 1, 1),
                    getTile("WoodWallBottomRight", 3, 2, 1, 1),
                    getTile("DoorTop", 2, 1, 1, 1),
                    getTile("DoorBottom", 2, 2, 1, 1),
                ]
            },
            Barrel: {
                tiles: [
                    getTile("Barrel", 0, 0, 1, 1),
                ]
            }
        },
        scenery: [
            getTile("GroundFlatEndLeft", -1, 4, 1, 1),
            getTile("GroundSoilEndLeft", -1, 5, 1, 2),
            getTile("GroundSoil", 0, 5, 15, 2),
            getTile("GroundFlat", 0, 4, 6, 1),
            getTile("GroundSoilSlopeUp", 6, 4, 1, 1),
            getTile("GroundSoil", 7, 4, 2, 1),
            getTile("GroundSlopeUp", 6, 3, 1, 1, 'UpRight'),
            getTile("GroundFlat", 7, 3, 2, 1),
            getTile("GroundSlopeDown", 9, 3, 1, 1, 'DownRight'),
            getTile("GroundSoilSlopeDown", 9, 4, 1, 1, 'DownRight'),
            getTile("GroundFlat", 10, 4, 5, 1),
            getTile("GroundFlatEndRight", 15, 4, 1, 1),
            getTile("GroundSoilEndRight", 15, 5, 1, 2),
            getTile("GroundFlatEndLeft", 17, 4, 1, 1),
            getTile("GroundSoilEndLeft", 17, 5, 1, 2),
            getTile("GroundFlatEndRight", 18, 4, 1, 1),
            getTile("GroundSoilEndRight", 18, 5, 1, 2),
            getTile("GroundFlatEndLeft", 21, 4, 1, 1),
            getTile("GroundSoilEndLeft", 21, 5, 1, 2),
            getTile("Bridge", 22, 4, 1, 1),
            getTile("GroundFlat", 23, 4, 7, 1),
            getTile("GroundSoil", 23, 5, 7, 2),
            getTile("GroundFlatEndRight", 30, 4, 1, 1),
            getTile("GroundSoilEndRight", 30, 5, 1, 2),
            getTile("GroundFlatEndLeft", 36, 3, 1, 1),
            getTile("GroundSoilEndLeft", 36, 4, 1, 3),
            getTile("GroundSoil", 37, 4, 6, 3),
            getTile("GroundFlat", 37, 3, 6, 1),
            getTile("GroundSlopeUp", 43, 2, 1, 1, 'UpRight'),
            getTile("GroundSoilSlopeUp", 43, 3, 1, 1),
            getTile("GroundSoil", 43, 4, 1, 3),
            getTile("GroundSlopeUp", 44, 1, 1, 1, 'UpRight'),
            getTile("GroundSoilSlopeUp", 44, 2, 1, 1),
            getTile("GroundSoil", 44, 3, 1, 4),
            getTile("GroundFlatEndRight", 45, 1, 1, 1),
            getTile("GroundSoilEndRight", 45, 2, 1, 5),
            getTile("GroundFlatEndLeft", 54, 5, 1, 1),
            getTile("GroundSoilEndLeft", 54, 6, 1, 1),
            getTile("GroundFlat", 55, 5, 3, 1),
            getTile("GroundSoil", 55, 6, 3, 1),
            getTile("GroundFlatEndRight", 58, 5, 1, 1),
            getTile("GroundSoilEndRight", 58, 6, 1, 1),
            getTile("GroundFlatEndLeft", 61, 4, 1, 1),
            getTile("GroundSoilEndLeft", 61, 5, 1, 2),
            getTile("GroundFlatEndRight", 62, 4, 1, 1),
            getTile("GroundSoilEndRight", 62, 5, 1, 2),
            getTile("GroundFlatEndLeft", 65, 3, 1, 1),
            getTile("GroundSoilEndLeft", 65, 4, 1, 3),
            getTile("GroundFlatEndRight", 66, 3, 1, 1),
            getTile("GroundSoilEndRight", 66, 4, 1, 3),
            getTile("GroundFlatEndLeft", 71, 3, 1, 1),
            getTile("GroundSoilEndLeft", 71, 4, 1, 3),
            getTile("GroundFlat", 72, 3, 2, 1),
            getTile("GroundSoil", 72, 4, 2, 3),
            getTile("GroundFlatEndRight", 74, 3, 1, 1),
            getTile("GroundSoilEndRight", 74, 4, 1, 3),
            getTile("GroundFlatEndLeft", 82, 2, 1, 1),
            getTile("GroundSoilEndLeft", 82, 3, 1, 4),
            getTile("GroundFlat", 83, 2, 30, 1),
            getTile("GroundSoil", 83, 3, 30, 4),
            getTile("GroundFlatEndRight", 113, 2, 1, 1),
            getTile("GroundSoilEndRight", 113, 3, 1, 4),
        ],
        decorations: [
            getDecoration("House", 2, 1),
            getDecoration("Barrel", 1, 3),
            getDecoration("House", 26, 1)

        ],
        actors: [
            getActor("Tifa", "Tifa", "Idle", 128.0, 192.0)
        ],
        particles: [],
        player: playerCharacter,
        checkpoints: [
            // These must be in descending (inverse) order of x so that later checkpoints are checked first
            getCheckpoint(4542, 4542, 0),
            getCheckpoint(4158, 4158, 0),
            getCheckpoint(3902, 3902, 64),
            getCheckpoint(3456, 3456, 128),
            getCheckpoint(2314, 2314, 0),
            getCheckpoint(1350, 1350, 64),
            getCheckpoint(1100, 1120, 64),
            getCheckpoint(940, 940, 64),
            getCheckpoint(-1000000, 0, 0),
        ],
        background: 'BackgroundSunset',
        events: {
            jump: false,
            right: false,
            left: false,
            special: false,
        },
        over: false
    };

	onMount(() => {
    let tmpCtx = canvas.getContext('2d');

    if (tmpCtx === null) {
        throw Error("Unable to load 2d context");
    }

    ctx = tmpCtx;

    // Set up intersection observer to track visibility
    intersectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                isVisible = entry.isIntersecting;
                
                // If becoming visible and animation loop isn't running, start it
                if (isVisible && !animationId) {
                    lastTime = 0; // Reset timing to prevent large deltaTime jump
                    animationId = requestAnimationFrame((time) => frame(time / 1000.0));
                }
            });
        },
        {
            // Trigger when at least 10% of the container is visible
            threshold: 0.1,
            // Optional: add some margin to start rendering slightly before fully visible
            rootMargin: '50px 0px'
        }
    );

    // Start observing the canvas container
    if (canvas.parentElement) {
        intersectionObserver.observe(canvas.parentElement);
    }
    
    function frame(currentTime: number) {
        if (ctx === null) {
            return;
        }

        // Only continue the animation loop if visible
        if (!isVisible) {
            animationId = 0; // Clear the animation ID
            return;
        }

        const deltaTime = lastTime === 0 ? 0 : currentTime - lastTime;
        lastTime = currentTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        handleCheckpoints();

        handleInput(deltaTime, handleEndGame());

        updateCamera();
        
        // Save canvas state for camera transformation
        ctx.save();
        ctx.translate(-game.camera.x, -game.camera.y);
        
        renderBackground("BackgroundSunset");
        renderScenery(currentTime);
        renderDecorations(currentTime);
        renderActors(currentTime, deltaTime);
        renderPlayer(currentTime, deltaTime);
        renderParticles(currentTime, deltaTime);
        
        // Restore canvas state
        ctx.restore();
        
        // Continue the animation loop
        animationId = requestAnimationFrame((time) => frame(time / 1000.0));
    }

    // Start the initial animation frame (visibility check will handle pausing)
    animationId = requestAnimationFrame((time) => frame(time / 1000.0));

    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (intersectionObserver) {
            intersectionObserver.disconnect();
        }
    };
});

    function handleCheckpoints() {
        if (game.player.y <= 512) {
            return;
        }

        for (let checkpoint of game.checkpoints) {
            if (game.player.x > checkpoint.x) {
                game.player.x = checkpoint.respawnX;
                game.player.y = checkpoint.respawnY;
                game.player.velocityX = 0;
                game.player.velocityY = 0;
                return;
            }
        }
    }

    function handleInput(deltaTime: number, isGameOver: boolean) {
        handleActorInput(game.player, game.events.left, game.events.right, game.events.jump, game.events.special, isGameOver, deltaTime);
        game.events.jump = false;
        game.events.special = false;
    }

    function updateCamera() {
        // Calculate desired camera position (center player on screen)
        const desiredCameraX = game.player.x + game.player.width / 2 - canvas.width / 2;
        const desiredCameraY = game.player.y + game.player.height / 2 - canvas.height / 2;
        
        // Apply smoothing to camera movement
        game.camera.x += (desiredCameraX - game.camera.x) * game.camera.smoothing;
        game.camera.y += (desiredCameraY - game.camera.y) * game.camera.smoothing;
        
        // Round camera position to prevent subpixel rendering issues
        game.camera.x = Math.round(game.camera.x);
        game.camera.y = Math.round(game.camera.y);
        
        // Clamp camera to world bounds
        game.camera.y = Math.max(game.worldBounds.top, Math.min(game.worldBounds.bottom - canvas.height, game.camera.y));
        game.camera.x = Math.max(game.worldBounds.left, Math.min(game.worldBounds.right - canvas.width, game.camera.x));
    }

    function renderBackground(name: string) {
        const image = GameImages[name];
        
        ctx.drawImage(image.image, 0, 0, image.width, image.height, game.camera.x, game.camera.y, canvas.width, canvas.height);
    }

    function renderScenery(time: number) {
        // Calculate visible bounds with camera transformation
        const viewLeft = game.camera.x;
        const viewRight = game.camera.x + canvas.width;
        const viewTop = game.camera.y;
        const viewBottom = game.camera.y + canvas.height;
        
        for (let item of game.scenery) {
            // Calculate item bounds
            const itemLeft = item.x;
            const itemRight = item.x + item.width;
            const itemTop = item.y;
            const itemBottom = item.y + item.height;
            
            // Skip rendering if item is completely outside the visible area
            if (itemRight < viewLeft || itemLeft > viewRight || 
                itemBottom < viewTop || itemTop > viewBottom) {
                continue;
            }
            
            const image: SpriteData = GameImages[item.image];

            for (var x = 0; x < item.width; x += item.tileWidthPx) {
                for (var y = 0; y < item.height; y += item.tileHeightPx) {
                    // Calculate individual tile bounds
                    const tileX = Math.round(item.x + x);
                    const tileY = Math.round(item.y + y);
                    const tileRight = tileX + item.tileWidthPx;
                    const tileBottom = tileY + item.tileHeightPx;
                    
                    // Skip this tile if it's completely outside the visible area
                    if (tileRight < viewLeft || tileX > viewRight || 
                        tileBottom < viewTop || tileY > viewBottom) {
                        continue;
                    }
                    
                    ctx.drawImage(image.image, 0, 0, image.width, image.height, tileX, tileY, item.tileWidthPx, item.tileHeightPx);
                }
            }
        }
    }

    function renderDecorations(time: number) {
        for (let item of game.decorations) {
            const prefab: Prefab = game.prefabs[item.name];

            for (let tile of prefab.tiles) {
                const image: SpriteData = GameImages[tile.image];
                                
                ctx.drawImage(image.image, 0, 0, 64, 64, Math.round(item.x + tile.x), Math.round(item.y + tile.y), 64, 64);
            }
        }
    }

    function renderActors(time: number, deltaTime: number) {
        for (let actor of game.actors) {
            handleActorInput(actor, false, false, false, false, false, deltaTime);
            resolveCollisions(actor, deltaTime);
            handleMomentum(time, actor);
            renderImage(time, actor);
        }
    }

    function renderPlayer(time: number, deltaTime: number) {
        resolveCollisions(game.player, deltaTime);
        handleMomentum(time, game.player);
        renderImage(time, game.player);
    }

    function renderParticles(time: number, deltaTime: number) {
        let particlesToRemove : Particle[] = [];

        for (let particle of game.particles) {
            if (particle.animation.frame == 0 && particle.animation.lastFrameTime != 0) {
                particlesToRemove.push(particle);
                continue;
            }

            renderParticle(time, particle);
        }

        for (let particle of particlesToRemove) {
            game.particles = game.particles.filter(removed => removed.id != particle.id);
        }
    }

    function resolveCollisions(actor: Actor, deltaTime: number) {
        // Apply movement with delta time
        actor.x += actor.velocityX * deltaTime;
        actor.y += actor.velocityY * deltaTime;
        
        // Reset ground state
        actor.onGround = false;
        
        // Get actor bounds
        const actorLeft = actor.x + actor.collisionBox.x;
        const actorRight = actorLeft + actor.collisionBox.width;
        const actorCenterX = actorLeft + actor.collisionBox.width / 2;
        
        let groundY = null;
        
        // Find the highest ground level at the actor's position
        for (let item of game.scenery) {
            if (item.type === 'TileSlope') {
                const slopeGroundY = getSlopeGroundY(item, actorCenterX);
                if (slopeGroundY !== null) {
                    if (groundY === null || slopeGroundY < groundY) {
                        groundY = slopeGroundY;
                    }
                }
            } else {
                // Rectangle collision
                if (actorRight > item.x && actorLeft < item.x + item.width) {
                    const rectGroundY = item.y;
                    if (groundY === null || rectGroundY < groundY) {
                        groundY = rectGroundY;
                    }
                }
            }
        }
        
        // Apply ground collision
        if (groundY !== null) {
            const desiredActorY = groundY - actor.collisionBox.y - actor.collisionBox.height;
            const maxJumpHeight = 32; // Maximum height player can "step up" onto
            
            // Only apply if actor is at or below ground level, and not too far below
            if (actor.y >= desiredActorY - 1 && actor.y <= desiredActorY + maxJumpHeight) {
                actor.y = desiredActorY;
                
                if (actor.velocityY >= 0) {
                    actor.velocityY = 0;
                    actor.onGround = true;
                }
            }
        }
        
        // Handle wall collisions separately
        handleWallCollisions(actor);
    }

    function getSlopeGroundY(slope: Tile, x: number) {
        // Check if x is within slope bounds (with small extension for smooth transitions)
        if (x < slope.x - 10 || x > slope.x + slope.width + 10) {
            return null;
        }
        
        // Calculate relative position within slope
        const relativeX = x - slope.x;
        const progress = Math.max(0, Math.min(1, relativeX / slope.width));
        
        let groundY;
        switch (slope.slopeDirection) {
            case 'UpRight':
                groundY = slope.y + slope.height * (1 - progress);
                break;
            case 'UpLeft':
                groundY = slope.y + slope.height * progress;
                break;
            case 'DownRight':
                groundY = slope.y + slope.height * progress;
                break;
            case 'DownLeft':
                groundY = slope.y + slope.height * (1 - progress);
                break;
            default:
                return null;
        }
        
        return groundY;
    }

    function handleWallCollisions(actor: Actor) {
        const actorLeft = actor.x + actor.collisionBox.x;
        const actorRight = actorLeft + actor.collisionBox.width;
        const actorTop = actor.y + actor.collisionBox.y;
        const actorBottom = actorTop + actor.collisionBox.height;
        
        for (let item of game.scenery) {
            // Only check wall collisions for rectangles
            if (item.type !== 'TileSlope') {
                const itemLeft = item.x;
                const itemRight = item.x + item.width;
                const itemTop = item.y;
                const itemBottom = item.y + item.height;
                
                // Check if there's any overlap at all
                if (actorRight > itemLeft && actorLeft < itemRight && 
                    actorBottom > itemTop && actorTop < itemBottom) {
                    
                    // Determine which side to push out from based on movement direction and overlap
                    const overlapLeft = actorRight - itemLeft;
                    const overlapRight = itemRight - actorLeft;
                    const overlapTop = actorBottom - itemTop;
                    const overlapBottom = itemBottom - actorTop;
                    
                    // Find the smallest overlap to determine push direction
                    const minHorizontal = Math.min(overlapLeft, overlapRight);
                    const minVertical = Math.min(overlapTop, overlapBottom);
                    
                    // If horizontal overlap is smaller, push horizontally
                    if (minHorizontal < minVertical) {
                        if (overlapLeft < overlapRight) {
                            // Push actor to the left
                            actor.x = itemLeft - actor.collisionBox.x - actor.collisionBox.width;
                            if (actor.velocityX > 0) actor.velocityX = 0;
                        } else {
                            // Push actor to the right
                            actor.x = itemRight - actor.collisionBox.x;
                            if (actor.velocityX < 0) actor.velocityX = 0;
                        }
                    }
                    // Note: We don't handle vertical pushing here since ground collision handles that
                }
            }
        }
    }

    function handleMomentum(currentTime: number, actor: Actor) {
        // Movement is now handled in resolveCollisions, this function just handles animation state

        if (actor.velocityX < 2 && actor.velocityX > -2) {
            actor.velocityX = 0;
        }

        const movingLeft = actor.velocityX <= -25;
        const movingRight = actor.velocityX >= 25;
        const notMoving = !movingLeft && !movingRight;

        if (notMoving) {
            actor.animation.direction = "Down";
        }

        if (movingLeft) {
            actor.animation.direction = "Left";
        }

        if (movingRight) {
            actor.animation.direction = "Right";
        }

        if (actor.velocityY != 0.0) {
            SetAnimation(actor.animation, "Jump");
            return;
        }

        if (notMoving) {
            SetAnimation(actor.animation, "Idle");
            return;
        }

        if (movingLeft) {
            SetAnimation(actor.animation, "Run");
            return;
        }

        if (movingRight) {
            SetAnimation(actor.animation, "Run");
            return;
        }
    }

    function SetAnimation(animation: Animation, name: AnimationName) {
        if (animation.name != name) {
            animation.frame = 0;
            animation.name = name;
        }
    }

    function renderParticle(currentTime: number, particle: Particle) {
        const image = GameImages[`${particle.image}${particle.animation.name}`];

        if (currentTime - particle.animation.lastFrameTime >= image.frameTime) {
            // Advance to next frame
            particle.animation.frame = (particle.animation.frame + 1) % image.totalFrames;
            particle.animation.lastFrameTime = currentTime;
        }

        const sourceX = particle.animation.frame * image.width;
        const sourceY = image.height * getRowFromDirection(particle.animation.direction);
        
        // Round actor position to prevent subpixel rendering
        const actorX = Math.round(particle.x);
        const actorY = Math.round(particle.y);
        
        ctx.drawImage(
            image.image,
            sourceX, sourceY,          // Source position
            image.width, image.height, // Source size
            actorX, actorY,            // Destination position (rounded)
            image.width, image.height  // Destination size
        );
    }


    function renderImage(currentTime: number, actor: Actor) {
        const image = GameImages[`${actor.image}${actor.animation.name}`];

        if (currentTime - actor.animation.lastFrameTime >= image.frameTime) {
            // Advance to next frame
            actor.animation.frame = (actor.animation.frame + 1) % image.totalFrames;
            actor.animation.lastFrameTime = currentTime;
        }

        const sourceX = actor.animation.frame * image.width;
        const sourceY = image.height * getRowFromDirection(actor.animation.direction);
        
        // Round actor position to prevent subpixel rendering
        const actorX = Math.round(actor.x);
        const actorY = Math.round(actor.y);
        
        ctx.drawImage(
            image.image,
            sourceX, sourceY,          // Source position
            image.width, image.height, // Source size
            actorX, actorY,            // Destination position (rounded)
            image.width, image.height  // Destination size
        );
    }

    function getRowFromDirection(direction: AnimationDirection) {
        switch (direction) {
            case "Up":
                return 0;
            case "Left":
                return 1;
            case "Down":
                return 2;
            default:
                return 3;
        }
    }

    function handleEndGame() : boolean {
        if (game.over) {
            if (game.player.x < 1000) {
                game.over = false;
                return false;
            }

            return true;
        }

        if (game.player.x > game.worldBounds.right) {
            game.over = true;
            return true;
        }

        return false;
    }

    function handleActorInput(actor: Actor, isMovingLeft: boolean, isMovingRight: boolean, isJumping: boolean, isUsingSpecial: boolean, isGameOver: boolean, deltaTime: number) {
        let acceleration = 0;

        if (actor.specialCooldownFrames > 0) {
            actor.specialCooldownFrames--;
        }

        if (actor.specialEffectFrames > 0) {
            actor.specialEffectFrames--;
        }

        if (isGameOver) {
            return;
        }
        
        if (isMovingLeft) {
            acceleration = -actor.acceleration;
        }

        if (isMovingRight) {
            acceleration = actor.acceleration;
        }
        
        // Apply acceleration with delta time
        actor.velocityX += acceleration * deltaTime;
        
        // Apply friction when not accelerating
        if (acceleration === 0) {
            // Convert friction to time-based: newVelocity = oldVelocity * friction^deltaTime
            actor.velocityX *= Math.pow(actor.friction, deltaTime);
        }
        
        // Limit horizontal speed
        if (actor.velocityX > actor.maxSpeed) actor.velocityX = actor.maxSpeed;
        if (actor.velocityX < -actor.maxSpeed) actor.velocityX = -actor.maxSpeed;
        
        // Jumping
        if (isJumping && actor.onGround) {
            actor.velocityY = -actor.jumpPower;
            actor.onGround = false;
        }

        if (actor.specialEffectFrames == 0 && game.player.name != 'Shane') {
            actor.gravity = 950.0;
        }

        if (actor.specialCooldownFrames > 0 && game.player.name != 'Shane' && !actor.onGround && actor.specialCooldownFrames % 30 == 0) {
            game.particles.push(getParticle('Regen', actor.x, actor.y));
        }

        if (isUsingSpecial && actor.specialCooldownFrames == 0) {
            if (game.player.name == 'Shane') {
                game.particles.push(getParticle('Aura', actor.x, actor.y));
                actor.velocityX = actor.maxSpeed * 100 * (actor.velocityX >= 0.0 ? 1 : -1);
                game.particles.push(getParticle('Aura', actor.x + actor.velocityX * deltaTime, actor.y));
            } else {
                game.particles.push(getParticle('Regen', actor.x, actor.y));
                actor.gravity = 20.0;
                actor.friction = 0.0000005;
                actor.specialEffectFrames = 100;
            }

            actor.specialCooldownFrames = 250;
        }
        
        // Apply gravity with delta time
        actor.velocityY += actor.gravity * deltaTime;

        // Terminal velocity
        if (actor.velocityY > 1500) {
            actor.velocityY = 1500;
        }
    }

    function handleCanvasKeydown(e: KeyboardEvent) {
        if (!canvasFocused) return;
        
        e.preventDefault();
        handleKeyDownEvent(e.code);
    }

    function handleKeyDownEvent(code: string) {

        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                game.events.jump = true;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                if (!game.events.right) {
                    game.events.left = true;
                }
                break;
            case 'KeyD':
            case 'ArrowRight':
                if (!game.events.left) {
                    game.events.right = true;
                }
                break;
            case 'KeyS':
            case 'ArrowDown':
            case 'Space':
                game.events.special = true;
                break;
        }
    }

    function handleCanvasKeyUp(e: KeyboardEvent) {
        if (!canvasFocused) return;
        
        e.preventDefault();
        handleKeyUpEvent(e.code);
    }

    function handleKeyUpEvent(code: string) {
        switch (code) {
            case 'KeyA':
            case 'ArrowLeft':
                game.events.left = false;
                break;
            case 'KeyD':
            case 'ArrowRight':
                game.events.right = false;
                break;
        }
    }

    function handleCanvasFocus() {
        canvasFocused = true;
    }

    function handleCanvasBlur() {
        canvasFocused = false;
        // Reset all movement states when canvas loses focus
        game.events.jump = false;
        game.events.left = false;
        game.events.right = false;
        game.events.special = false;
    }
</script>

<svelte:window on:resize={resizeCanvas} />

<div class="container">
    <DebugMenu bind:PositionX={game.player.x} bind:PositionY={game.player.y} bind:VelocityX={game.player.velocityX} bind:VelocityY={game.player.velocityY} />
    <div class="canvas-container">
        {#if !canvasFocused && !game.over}
            <div class="start">{$_('game.start')}</div>
        {/if}
        {#if game.over}
            <div class="over">
                {$_('game.complete')}
                <div class="again">{$_('game.again')} {game.player.name == 'Shane' ? 'Juli' : 'Shane' }</div>
            </div>
        {/if}
        {#if !game.over && game.player.specialCooldownFrames > 0}
            <div class="recharge">
                <div class="bar"></div>
                <div class="current" style:width={(100 - ((game.player.specialCooldownFrames / 250.0) * 100)) + "%"}></div>
                <div class="recharge-title">{$_('game.recharging')}</div>
            </div>
        {/if}
        <canvas
            bind:this={canvas}
            class="game-canvas"
            width={canvasWidth}
            height="320px"
            on:keydown={handleCanvasKeydown}
            on:keyup={handleCanvasKeyUp}
            on:focus={handleCanvasFocus}
            on:blur={handleCanvasBlur}
            on:click={() => canvas.focus()}
            tabindex="0"
            >
        </canvas>
    </div>
    <div class="mobile-controls">
        <div class="dpad">
            <div class="dpad-button dpad-up" class:active={game.events.jump} on:touchstart={() => handleKeyDownEvent("ArrowUp")} on:touchend={() => handleKeyUpEvent("ArrowUp")} on:mousedown={() => handleKeyDownEvent("ArrowUp")} on:mouseup={() => handleKeyUpEvent("ArrowUp")}>↑</div>
            <div class="dpad-button dpad-left" class:active={game.events.left} on:touchstart={() => handleKeyDownEvent("ArrowLeft")} on:touchend={() => handleKeyUpEvent("ArrowLeft")} on:mousedown={() => handleKeyDownEvent("ArrowLeft")} on:mouseup={() => handleKeyUpEvent("ArrowLeft")}>←</div>
            <div class="dpad-button dpad-right" class:active={game.events.right} on:touchstart={() => handleKeyDownEvent("ArrowRight")} on:touchend={() => handleKeyUpEvent("ArrowRight")} on:mousedown={() => handleKeyDownEvent("ArrowRight")} on:mouseup={() => handleKeyUpEvent("ArrowRight")}>→</div>
        </div>

        <div class="action-buttons">
            <div class="action-row">
                <div class="action-button" class:active={game.player.specialCooldownFrames == 0} on:touchstart={() => handleKeyDownEvent("Space")} on:touchend={() => handleKeyUpEvent("Space")} on:mousedown={() => handleKeyDownEvent("Space")} on:mouseup={() => handleKeyUpEvent("Space")}>X</div>
            </div>
        </div>
    </div>
</div>

<style>
    * {
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

    .debug {
        padding: 20px 20px 15px 20px;
        font-family: 'Press Start 2P', cursive;
        font-size: 12px;
        color: #2c1810;
        background: linear-gradient(135deg, #ffcfcf 0%, #929aa9 50%, #cad5fe 100%);
        border-radius: 0;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: inset 2px 2px 0px rgba(255, 255, 255, 0.8), inset -2px -2px 0px rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
    }

    .debug .item {
        padding-bottom: 5px;
    }

    .debug .item span {
        opacity: 0.7;
    }

	.canvas-container {
        position: relative;
    }

    .recharge {
        display: block;
        position: absolute;
        bottom: 20px;
        left: 25%;
        width: 50%;
        height: 20px;
    }

    .recharge .bar, .recharge .current {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
    }

    .recharge .bar {
        background: linear-gradient(90deg, #ff709d 0%, #ff709d 30%, cyan 100%);
        width: 100%;
    }

    .recharge .current {
        left: initial;
        right: 0;
        background-color: #000;
    }

    .recharge .recharge-title {
        position: absolute;
        top: 6px;
        width: 100%;
        text-align: center;
        color: #fff;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.65rem;
    }

    .start, .over {
        display: block;
        position: absolute;
        box-sizing: border-box;
        top: 20px;
        left: 20px;
        width: calc(100% - 40px);
        padding: 20px;
        background: linear-gradient(135deg, rgba(255,207,207,0.6) 0%, rgba(146,154,169,0.6) 50%, rgba(202,213,254,0.6) 100%);
        box-shadow: inset 2px 2px 0px rgba(255,255,255,0.8), inset -2px -2px 0px rgba(0,0,0,0.2);
        font-family: 'Press Start 2P', cursive;
        font-size: 12px;
        text-align: center;
        color: #000;
        text-transform: uppercase;
    }

    .over .again {
        padding-top: 0.8rem;
    }

    .mobile-controls {
        position: relative;
        display: none;
        justify-content: space-between;
        align-items: flex-end;
        padding: 1rem 0;
        z-index: 10;
    }

    .dpad {
        position: relative;
        width: 150px;
        height: 106px;
    }

    .dpad-button {
        position: absolute;
        width: 50px;
        height: 50px;
        background: #444;
        border: 2px solid #666;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        color: white;
        cursor: pointer;
        transition: all 0.1s ease;
    }

    .dpad-button.active {
        background: #007acc;
        border-color: #0099ff;
        transform: scale(0.95);
    }

    .dpad-button.long-press {
        background: #ff6600;
        border-color: #ff8833;
    }

    .dpad-up { top: 0; left: 50px; }
    .dpad-left { top: 50px; left: 0; }
    .dpad-right { top: 50px; right: 0; }

    .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .action-row {
        display: flex;
        gap: 15px;
    }

    .action-button {
        width: 60px;
        height: 60px;
        background: #444;
        border: 2px solid #666;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.7rem;
        font-weight: bold;
        color: white;
        cursor: pointer;
        transition: all 0.1s ease;
    }

    .action-button.active {
        background: #ff709d;
        border-color: #ff0099;
        color: #000000;
        transform: scale(0.95);
    }

    @media (max-width: 1200px) {
        .recharge {
            left: 5%;
            width: 90%;
        }

        .start {
            display: none;
        }

        .mobile-controls {
            display: flex;
        }
    }
</style>