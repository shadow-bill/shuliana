<script lang="ts">
	import { _, locale } from 'svelte-i18n';
</script>

<div class="footer">
    <div class="text">{$_('foot.made-with-love')}</div>
</div>

<style>
	.footer {
		padding: 2rem 6vw 2rem 6vw;
        background-color: #222222;
        opacity: 1;
        background-image: radial-gradient(#3b1838 2px, transparent 2px), radial-gradient(#3b1838 2px, #222222 2px);
        background-size: 80px 80px;
        background-position: 0 0, 40px 40px;
        color: #fff;
        text-align: center;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.8rem;
	}
</style>
