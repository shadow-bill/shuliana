<script lang="ts">
	import { _, locale } from 'svelte-i18n';

	function changeLocale(language: string) {
		locale.set(language);
	}
</script>

<div class="flag-selector">
	<div class="flag-container" class:enabled={$locale === 'es'} onclick="{() => changeLocale("es")}">
		<svg class="flag-svg" viewBox="0 0 450 300" xmlns="http://www.w3.org/2000/svg">
			<rect width="450" height="150" fill="#FFCD00"/>
			<rect y="150" width="450" height="75" fill="#003893"/>
			<rect y="225" width="450" height="75" fill="#CE1126"/>
		</svg>
	</div>
	<div class="flag-container" class:enabled={$locale === 'en'} onclick="{() => changeLocale("en")}">
		<svg class="flag-svg" viewBox="0 0 450 300" xmlns="http://www.w3.org/2000/svg">
			<rect width="450" height="300" fill="#012169"/>
			<path d="M0,0 L450,300 M450,0 L0,300" stroke="white" stroke-width="50"/>
			<path d="M0,0 L450,300 M450,0 L0,300" stroke="#C8102E" stroke-width="30"/>                
			<rect x="200" y="0" width="50" height="300" fill="white"/>
			<rect x="0" y="125" width="450" height="50" fill="white"/>                
			<rect x="212.5" y="0" width="25" height="300" fill="#C8102E"/>
			<rect x="0" y="137.5" width="450" height="25" fill="#C8102E"/>
		</svg>
	</div>
</div>

<style>
	.flag-selector {
		position: fixed;
		top: 20px;
		right: 20px;
		display: flex;
		gap: 12px;
		z-index: 1000;
	}

	.flag-container {
		position: relative;
		cursor: pointer;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255, 255, 255, 0.2);
	}

	.flag-container:hover {
		transform: translateY(-5px) scale(1.05);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
		border-color: rgba(255, 255, 255, 0.4);
	}

	.flag-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transition: left 0.5s ease;
		z-index: 2;
	}

	.flag-container:hover::before {
		left: 100%;
	}

	.flag-svg {
		display: block;
		width: 45px;
		height: 30px;
		transition: filter 0.3s ease;
	}

	.flag-container:hover .flag-svg {
		filter: brightness(1.1) saturate(1.2);
	}

	.flag-container.active {
		transform: scale(1.1);
		border-color: #ffd700;
		box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
	}
</style>
