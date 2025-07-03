export type GameObjectType = "Actor" | "TileRectangle" | "TileSlope" | "Decoration" | "Particle";

export type SlopeDirection = "None" | "UpRight" | "UpLeft" | "DownRight" | "DownLeft";

// In order that the png tiles are presented in vertically
export type AnimationDirection = "Up" | "Left" | "Down" | "Right";

export type AnimationName = "Idle" | "Run" | "Jump" | "Attack";

export type PrefabName = "House" | "Barrel";

export type ParticleName = "Aura" | "Regen";

export interface GameObject {
    type: GameObjectType,
    x: number,
    y: number,
    width: number,
    height: number,
    image: string
}

export interface Tile extends GameObject {
    slopeDirection: SlopeDirection,
    collision: boolean,
    tileWidthPx: number,
    tileHeightPx: number,
}

export interface Prefab {
    tiles: Tile[]
}

export interface Checkpoint {
    x: number,
    respawnX: number,
    respawnY: number,
}

export interface Decoration {
    name: PrefabName,
    x: number,
    y: number,
}

export interface Animation {
    name: AnimationName,
    frame: number,
    lastFrameTime: number,
    direction: AnimationDirection,
}

export interface Particle extends GameObject {
    id: string,
    name: ParticleName,
    animation: Animation
}

export interface CollisionBox {
    x: number,
    y: number,
    width: number,
    height: number,
}

export interface Actor extends GameObject {
    name: string,
    animation: Animation,
    velocityX: number,
    velocityY: number,
    collisionBox: CollisionBox,
    onGround: boolean,
    maxSpeed: number,
    acceleration: number,
    friction: number,
    jumpPower: number,
    gravity: number,
    health: number,
    specialCooldownFrames: number,
    specialEffectFrames: number,
}

export interface Camera {
    x: number,
    y: number,
    smoothing: number,
}

export interface WorldBounds {
    top: number,
    bottom: number,
    left: number,
    right: number,
}

export interface World {
    camera: Camera,
    worldBounds: WorldBounds,
    prefabs: Record<PrefabName, Prefab>,
    scenery: Tile[],
    decorations: Decoration[],
    actors: Actor[],
    particles: Particle[],
    player: Actor,
    checkpoints: Checkpoint[],
    background: string,
    events: GameEvents,
    over: boolean
}

export interface GameEvents {
    jump: boolean,
    right: boolean,
    left: boolean,
    special: boolean,
}

// Tiles MUST use images which are 64px and without any animation frames
export function getTile(image: string, x: number, y: number, width: number, height: number, direction: SlopeDirection | null = null) : Tile {
    return {
        type: `Tile${direction !== null && direction !== "None" ? "Slope" : "Rectangle"}`,
        x: x * 64,
        y: y * 64,
        width: width * 64,
        height: height * 64,
        image: image,
        tileWidthPx: 64,
        tileHeightPx: 64,
        slopeDirection: direction === null ? "None" : direction,
        collision: true
    };
}

// Decorations MUST use registered Prefabs, which are made of spritesheets with exactly 64px chunks and do not support ANY collision
export function getDecoration(name: PrefabName, x: number, y: number) : Decoration {
    return {
        name: name,
        x: x * 64,
        y: y * 64
    };
}

export function getActor(name: string = '', image: string = '', animation: AnimationName = 'Idle', x: number = 0.0, y: number = 0.0, velocityX: number = 0.0, velocityY: number = 0.0, direction: AnimationDirection = 'Up', health: number = 10.0) : Actor {
    return {
        type: 'Actor',
        name: name,
        image: image,
        animation: {
            name: animation,
            frame: 0,
            lastFrameTime: 0,
            direction: direction,
        },
        x: x,
        y: y,
        velocityX: velocityX,
        velocityY: velocityY,
        collisionBox: {
            x: 16,
            y: 0,
            width: 32,
            height: 64
        },
        onGround: false,
        maxSpeed: 300.0,
        acceleration: 900.0,
        friction: 0.005,
        jumpPower: 370.0,
        gravity: 950.0,
        health: health,
        specialCooldownFrames: 0,
        specialEffectFrames: 0,
        width: 64,
        height: 64
    };
}

export function getParticle(name: ParticleName, x: number = 0.0, y: number = 0.0) : Particle {
    return {
        id: (Math.random().toString(36)+'00000000000000000').slice(2, 12),
        type: 'Particle',
        name: name,
        image: name,
        animation: {
            name: 'Idle',
            frame: 0,
            lastFrameTime: 0,
            direction: 'Up',
        },
        x: x,
        y: y,
        width: 64,
        height: 64
    };
}

export function getCheckpoint(x: number, respawnX: number, respawnY: number) {
    return {
        x: x,
        respawnX: respawnX,
        respawnY: respawnY,
    };
}