export interface SpriteData {
    name: string;
    image: HTMLImageElement;
    width: number;
    height: number;
    totalFrames: number;
    frameTime: number;
}

export interface SpritesheetRegion {
    name: string;
    x: number;
    y: number;
}

export interface SpritesheetData {
    name: string;
    regions: SpritesheetRegion[];
}


function loadSprite(name: string, width: number, height: number, totalFrames: number, frameTime: number) : Promise<SpriteData> {
    return new Promise((resolve, reject) => {
        const spriteImage = new Image();

        spriteImage.onload = () => resolve({
            name: name,
            image: spriteImage,
            width: width,
            height: height,
            totalFrames: totalFrames,
            frameTime: frameTime
        });

        spriteImage.onerror = () => reject;
        spriteImage.src = `/game/${name}.png` ;
    });
}

function extractSpriteFromSheet(spritesheetName: string, sourceImage: HTMLImageElement, region: SpritesheetRegion): Promise<SpriteData> {
    return new Promise((resolve, reject) => {
        try {
            // Create a canvas to extract the sprite region
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            canvas.width = 64;
            canvas.height = 64;

            // Draw the specific region from the source image
            ctx.drawImage(sourceImage, region.x, region.y, 64, 64,  0, 0, 64, 64);

            // Create a new HTMLImageElement from the canvas data
            const extractedImage = new Image();
            extractedImage.onload = () => {
                resolve({
                    name: `${spritesheetName}${region.name}`,
                    image: extractedImage,
                    width: 64,
                    height: 64,
                    totalFrames: 1,
                    frameTime: 0
                });
            };

            extractedImage.onerror = () => reject(new Error(`Failed to create extracted sprite: ${region.name}`));
            extractedImage.src = canvas.toDataURL('image/png');
        } catch (error) {
            reject(error);
        }
    });
}


function loadSpritesheet(spritesheetData: SpritesheetData): Promise<SpriteData[]> {
    return new Promise((resolve, reject) => {
        const spritesheetImage = new Image();

        spritesheetImage.onload = async () => {
            try {
                const sprites = await Promise.all(
                    spritesheetData.regions.map(region => 
                        extractSpriteFromSheet(spritesheetData.name, spritesheetImage, region)
                    )
                );
                resolve(sprites);
            } catch (error) {
                reject(error);
            }
        };

        spritesheetImage.onerror = () => reject(new Error(`Failed to load spritesheet: ${spritesheetData.name}`));
        spritesheetImage.src = `/game/${spritesheetData.name}.png`;
    });
}

export async function loadAllSprites(): Promise<SpriteData[]> {
    let imagesToLoad = [
        { name: "BackgroundSunset", width: 640, height: 320, totalFrames: 1, frameTime: 0 },
        { name: "GroundFlat", width: 128, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "GroundFlatEndLeft", width: 128, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "GroundFlatEndRight", width: 128, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "GroundSoilEndLeft", width: 128, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "GroundSoilEndRight", width: 128, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "GroundSlopeUp", width: 128, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "GroundSoilSlopeUp", width: 128, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "GroundSoil", width: 128, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "GroundSlopeDown", width: 128, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "GroundSoilSlopeDown", width: 128, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "Bridge", width: 256, height: 128, totalFrames: 1, frameTime: 0 },
        { name: "Barrel", width: 64, height: 64, totalFrames: 1, frameTime: 0 },
        { name: "GroomIdle", width: 64, height: 64, totalFrames: 2, frameTime: 0.5/2 },
        { name: "GroomRun", width: 64, height: 64, totalFrames: 8, frameTime: 1.0/8 },
        { name: "GroomJump", width: 64, height: 64, totalFrames: 5, frameTime: 0.5/5 },
        { name: "BrideIdle", width: 64, height: 64, totalFrames: 2, frameTime: 0.5/2 },
        { name: "BrideRun", width: 64, height: 64, totalFrames: 8, frameTime: 1.0/8 },
        { name: "BrideJump", width: 64, height: 64, totalFrames: 5, frameTime: 0.5/5 },
        { name: "TifaIdle", width: 64, height: 64, totalFrames: 4, frameTime: 1.0/4 },
        { name: "AuraIdle", width: 64, height: 64, totalFrames: 7, frameTime: 0.5/7 },
        { name: "RegenIdle", width: 64, height: 64, totalFrames: 8, frameTime: 0.5/8 },
    ];

    let spritesheets: SpritesheetData[] = [
        {
            name: "WoodWall",
            regions: [
                { name: "TopLeft", x: 0, y: 0 },
                { name: "TopMiddleLeft", x: 64, y: 0 },
                { name: "TopMiddleRight", x: 128, y: 0 },
                { name: "TopRight", x: 192, y: 0 },
                { name: "MiddleLeft", x: 0, y: 64 },
                { name: "MiddleMiddleLeft", x: 64, y: 64 },
                { name: "MiddleMiddleRight", x: 128, y: 64 },
                { name: "MiddleRight", x: 192, y: 64 },
                { name: "BottomLeft", x: 0, y: 128 },
                { name: "BottomMiddleLeft", x: 64, y: 128 },
                { name: "BottomMiddleRight", x: 128, y: 128 },
                { name: "BottomRight", x: 192, y: 128 },
            ]
        },
        {
            name: "Door",
            regions: [
                { name: "Top", x: 0, y: 0 },
                { name: "Bottom", x: 0, y: 64 },
            ]
        },
    ];

    try {
        // Load individual sprites
        const individualSprites = await Promise.all(
            imagesToLoad.map(image => 
                loadSprite(image.name, image.width, image.height, image.totalFrames, image.frameTime)
            )
        );

        // Load sprites from spritesheets
        const spritesheetSprites = await Promise.all(
            spritesheets.map(sheet => loadSpritesheet(sheet))
        );

        // Flatten the spritesheet results and combine with individual sprites
        const allSpritesheetSprites = spritesheetSprites.flat();
        
        return [...individualSprites, ...allSpritesheetSprites];
    } catch (error) {
        console.error('Error loading sprites:', error);
        throw error;
    }

    return Promise.all(imagesToLoad.map(image => loadSprite(image.name, image.width, image.height, image.totalFrames, image.frameTime)));
}