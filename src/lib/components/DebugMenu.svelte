<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let PositionX: number;
	export let PositionY: number;
	export let VelocityX: number;
	export let VelocityY: number;

    let debugMode: boolean = false;
</script>

{#if debugMode}
    <div class="debug">
        <div class="item">{$_('game.debug')}</div>
        <div class="item"><span>{$_('game.position')} x:</span> {PositionX}</div>
        <div class="item"><span>{$_('game.position')} y:</span> {PositionY}</div>
        <div class="item"><span>{$_('game.tile-num')} x:</span> {Math.floor(PositionX / 64)}</div>
        <div class="item"><span>{$_('game.tile-num')} y:</span> {Math.floor(PositionY / 64)}</div>
        <div class="item"><span>{$_('game.velocity')} x:</span> {VelocityX}</div>
        <div class="item"><span>{$_('game.velocity')} y:</span> {VelocityY}</div>
    </div>
{/if}

<style>
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
</style>