<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { type SpriteData, loadAllSprites } from '$lib/ImageLoader';
	import Game from './Game.svelte';

	let juliCanvas: HTMLCanvasElement;
	let shaneCanvas: HTMLCanvasElement;
	let juliContext: CanvasRenderingContext2D | null;
	let shaneContext: CanvasRenderingContext2D | null;
	let images: Record<string, SpriteData> = {};
	let playerName: string = "Shane";
	let loading = false;

	onMount(() => {
		juliContext = juliCanvas.getContext('2d');
		shaneContext = shaneCanvas.getContext('2d');
		loadGameImages();
	});

	async function loadGameImages() {
		loading = true;
		
		try {
			let loadedImages = await loadAllSprites();

			if (juliContext === null || shaneContext === null) {
				throw Error("Unable to start game because one of the button contexts is null");
			}

			juliContext.imageSmoothingEnabled = false;
			shaneContext.imageSmoothingEnabled = false;

			for (var i = 0; i < loadedImages.length; i++)
			{
				images[loadedImages[i].name] = loadedImages[i];
			}

			// This draws the icons into the buttons
			juliContext.drawImage(images['BrideIdle'].image, 64, 128, 64, 64, 0, 0, 48, 48);
			shaneContext.drawImage(images['GroomIdle'].image, 64, 128, 64, 64, 0, 0, 48, 48);
		} catch (error) {
			console.error('Failed to load images:', error);
		}
			
		loading = false;
	}
</script>

<div class="game-container">
	<div class="hero-image left-two">
		<img src="/web/tifa-art.png" alt="Art of Tifa sat on her butt looking into the distance" />
	</div>
	<div class="hero-image left">
		<img src="/web/juli-art.png" alt="Art of Juliana sat on her butt looking into the distance" />
	</div>
	<div class="hero-image right">
		<img src="/web/shane-art.png" alt="Art of Shane sat on his butt looking into the distance" />
	</div>
	<div class="game-content">
		{#if !loading}
			<Game bind:PlayerName={playerName} bind:GameImages={images} />
		{:else}
			<p>{$_('game.loading')}</p>
		{/if}
		<div class="buttons">
			<div class="retro-button" id="playAsJuli" on:click={() => playerName = "Juli"}>
				<canvas bind:this={juliCanvas} id="juliCanvas" width="48" height="48"></canvas>
				{$_('game.play-as')} Juli
			</div>
			<div class="retro-button secondary" id="playAsShane" on:click={() => playerName = "Shane"}>
				<canvas bind:this={shaneCanvas} id="shaneCanvas" width="48" height="48"></canvas>
				{$_('game.play-as')} Shane
			</div>
		</div>
		
		<div class="controls-panel">
			<div class="title">{$_('game.controls')}</div>
			<div class="control-row">
				<span class="key">A</span>
				<span class="key">{$_('game.left')}</span>
				<span class="action">{$_('game.move')} {$_('game.left')}</span>
			</div>
			<div class="control-row">
				<span class="key">D</span>
				<span class="key">{$_('game.right')}</span>
				<span class="action">{$_('game.move')} {$_('game.right')}</span>
			</div>
			<div class="control-row">
				<span class="key">{$_('game.up')}</span>
				<span class="key">W</span>
				<span class="action">{$_('game.jump')}</span>
			</div>
			<div class="control-row">
				<span class="key">{$_('game.space')}</span>
				<span class="key">s</span>
				<span class="key">{$_('game.down')}</span>
				<span class="action">{$_('game.ability')}</span>
			</div>
		</div>
		<div class="mobile-controls">

		</div>
	</div>
</div>

<style>
	.game-container {
		position: relative;
		background-color: #111;
		width: 100vw;
		padding: 40px;
		box-sizing: border-box;
		text-align: center;
	}

	.game-content {
		width: 640px;
		margin: 0 auto;
	}

	.hero-image {
		position: absolute;
		bottom: 0;
	}

	.hero-image.left {
		left: 0;
	}

	.hero-image.left-two {
		left: 340px;
	}

	.hero-image.right {
		right: 0;
	}

	.buttons {
		position: relative;
		height: 60px;
	}

	.retro-button {
		position: absolute;
		left: -4px;
		display: inline-block;
		padding: 20px 30px 20px 60px;
		font-family: 'Press Start 2P', cursive;
		font-size: 12px;
		color: #2c1810;
		background: linear-gradient(135deg, #fff5f5 0%, #ffe4e6 50%, #fecaca 100%);
		border: 4px solid #2c1810;
		border-radius: 0;
		cursor: pointer;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 2px;
		transition: all 0.1s ease;
		box-shadow: 
			6px 6px 0px #2c1810,
			inset 2px 2px 0px rgba(255,255,255,0.8),
			inset -2px -2px 0px rgba(0,0,0,0.2);
		user-select: none;
		overflow: hidden;
	}
	
	.retro-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
		transition: left 0.5s ease;
	}
	
	.retro-button:hover {
		background: linear-gradient(135deg, #fff1f2 0%, #fce7f3 50%, #f9a8d4 100%);
		transform: translate(2px, 2px);
		box-shadow: 
			4px 4px 0px #2c1810,
			inset 2px 2px 0px rgba(255,255,255,0.9),
			inset -2px -2px 0px rgba(0,0,0,0.3);
	}
	
	.retro-button:hover::before {
		left: 100%;
	}
	
	.retro-button:active {
		transform: translate(4px, 4px);
		box-shadow: 
			2px 2px 0px #2c1810,
			inset 1px 1px 0px rgba(255,255,255,0.7),
			inset -1px -1px 0px rgba(0,0,0,0.4);
	}
	
	.retro-button .icon {
		display: inline-block;
		margin-right: 10px;
		font-size: 14px;
	}

	.retro-button.secondary {
		left: initial;
		right: -4px;
		background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #c7d2fe 100%);
		color: #1e1b4b;
		border-color: #1e1b4b;
		box-shadow: 
			6px 6px 0px #1e1b4b,
			inset 2px 2px 0px rgba(255,255,255,0.8),
			inset -2px -2px 0px rgba(0,0,0,0.2);
		float: right;
	}
	
	.retro-button.secondary:hover {
		background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 50%, #a78bfa 100%);
		box-shadow: 
			4px 4px 0px #1e1b4b,
			inset 2px 2px 0px rgba(255,255,255,0.9),
			inset -2px -2px 0px rgba(0,0,0,0.3);
	}
	
	.retro-button.secondary:active {
		box-shadow: 
			2px 2px 0px #1e1b4b,
			inset 1px 1px 0px rgba(255,255,255,0.7),
			inset -1px -1px 0px rgba(0,0,0,0.4);
	}

	.retro-button canvas {
		top: -3px;
		left: 16px;
		position: absolute;
	}

	.controls-panel {
		position: relative;
		margin-top: 5px;
		padding: 20px;
		font-family: 'Press Start 2P', cursive;
		font-size: 10px;
		color: #2c1810;
		background: linear-gradient(135deg, #ffcfcf 0%, #929aa9 50%, #cad5fe 100%);
		border-radius: 0;
		text-transform: uppercase;
		letter-spacing: 1px;
		box-shadow: 
			inset 2px 2px 0px rgba(255,255,255,0.8),
			inset -2px -2px 0px rgba(0,0,0,0.2);
		text-align: center;
		line-height: 1.8;
	}

	.controls-panel .title {
		font-size: 12px;
		margin-bottom: 15px;
		color: #fecccc;
		text-shadow: 2px 2px 0px rgb(0 0 0 / 80%), -1px -1px 6px rgb(0 0 0 / 30%);
	}

	.controls-panel .control-row {
		margin: 8px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 15px;
	}

	.controls-panel .key {
		display: inline-block;
		padding: 4px 8px;
		background: linear-gradient(135deg, #fff 0%, #f1f5f9 100%);
		border: 2px solid #1e3a8a;
		box-shadow: 2px 2px 0px #1e3a8a;
		min-width: 20px;
		text-align: center;
	}

	.controls-panel .action {
		color: #1e3a8a;
	}

	@media (max-width: 1200px) {
		.controls-panel {
			display: none;
		}
	}

	@media (max-width: 800px) {
		.hero-image {
			display: none;
		}

		.game-container {
			width: 100vw;
			padding: 2rem 6vw;
		}

		.game-content {
			width: 100%;
		}

		.buttons {
			height: initial;
		}

		.retro-button {
			display: block;
    		position: relative;
			left: 0;
			right: 0;
		}

		.retro-button.secondary {
			left: 0;
			right: 0;
			float: none;
		}
	}
</style>
