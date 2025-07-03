<script lang="ts">
	import { _, locale } from 'svelte-i18n';
</script>

<div class="footer">
    <div class="text">{$_('foot.made-with-love')}</div>
    <div class="heart">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 489.6 489.6" xml:space="preserve">
        <path style="fill:#ff709d;" d="M119.2,30.8c52,0,97.6,28.8,113.6,72.8c1.6,4,6.4,6.4,12,5.6c4.8,1.6,10.4-0.8,12-5.6c16-43.2,61.6-72.8,113.6-72.8c65.6,0,119.2,47.2,119.2,104.8c0,20.8-7.2,41.6-20.8,59.2c0,0,0,0,0,0.8l-0.8,0.8L244.8,459.6l-223.2-264l-0.8-0.8l0,0C7.2,177.2,0,157.2,0,135.6C0,78,53.6,30.8,119.2,30.8z"/>
        <path style="fill:#ff42c3;" d="M244.8,108.4c4.8,1.6,10.4-0.8,12-5.6c16-43.2,61.6-72.8,113.6-72.8c65.6,0,119.2,47.2,119.2,104.8c0,20.8-7.2,41.6-20.8,59.2c0,0,0,0,0,0.8l-0.8,0.8l-223.2,264"/>
        <path style="fill:#ffffff;" d="M37.6,157.2c-6.4,0-12-5.6-12-12c0-49.6,44.8-89.6,100-89.6c6.4,0,12,5.6,12,12s-5.6,12-12,12c-41.6,0-76,29.6-76,65.6C49.6,152.4,44,157.2,37.6,157.2z"/>
        </svg>
    </div>
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

    .footer .text {
        line-height: 1.2rem;
    }

    .heart {
        display: inline-block;
        margin-top: 1rem;
        width: 2rem;
        height: 2rem;
    }

    .heart svg {
        width: 100%;
    }
</style>
