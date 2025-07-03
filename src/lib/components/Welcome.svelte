<script lang="ts">
	import { _ } from 'svelte-i18n';
    import SynthWave from '$lib/components/SynthWave.svelte';
    import Glitch from '$lib/components/Glitch.svelte';
    import GlitchButton from '$lib/components/GlitchButton.svelte';
    import Neon from '$lib/components/Neon.svelte';
</script>

<div class="welcome">
    <SynthWave />
    <div class="contents">
        <div class="introduction">
            <div class="item">
                <Neon text={$_('welcome.were-getting-married')} />
            </div>
            <div class="item">
                <Neon text={$_('welcome.and-youre-invited')} />
            </div>
            <div class="glitch">
                <Glitch text="Shane & Juliana" />
            </div>
        </div>
        <div class="details-container">
            <div class="details">
                {$_('welcome.dancing-shoes')}
            </div>
        </div>
        <div class="specifics">
            <div class="specific">
                <div class="title">31 {$_('welcome.january')} 2026</div>
                <div class="context">{$_('welcome.doors-open')} 18:00</div>
            </div>
            <div class="specific">
                <div class="title">Brickhouse social</div>
                <div class="context">11 New Wakefield St, M1 5NP</div>
            </div>
        </div>
        <div class="cta">
            <GlitchButton text={$_('welcome.cta-text')} href={$_('welcome.cta-link')} padding={$_('welcome.cta-padding')} />
        </div>
    </div>
</div>

<style>
    .welcome {
        position: relative;
        margin: 0;
        padding: 0;
        height: 100%;
        background: linear-gradient(180deg, #0a0a0a 0%, #1a0033 50%, #330066 100%);
        overflow: hidden;
        perspective: 1000px;
    }

    .contents {
        position: absolute;
        top: 0;
        left: 25vw;
        width: 100vw;
        height: 100vh;
        width: 50vw;
        padding: 13vh 2rem 0;
        padding-top: 16vh;
        text-align: left;
    }

    .introduction {
        position: relative;
        padding-bottom: 2rem;
    }

    .introduction .item {
        text-align: left;
        line-height: 3rem;
    }

    .introduction .glitch {
        position: relative;
        left: -30px;
        padding-top: 1rem;
    }
    
    .details-container {
        margin-top: 1rem;
        color: #fff;
        font-family: 'Press Start 2P', cursive;
        font-size: 1.5rem;
        line-height: 2rem;
    }

    .specifics {
        padding-top: 2.8rem;
    }

    .specific {
        display: inline-block;
        padding-right: 2.4rem;
        margin-bottom: 2.4rem;
        font-family: 'Press Start 2P', cursive;
    }

    .specific .title {
        color: #ff709d;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .specific .context {
        position: relative;
        padding: 0.5rem 0 1.1rem;
        color: #70ffdf;
        font-size: 1.2rem;
    }

    .specific .context:after {
        position: absolute;
        display: block;
        content: '';
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background: linear-gradient(90deg, #ff709d 0%, #ff709d 30%, cyan 100%);
    }

    .cta {
        padding-top: 1rem;
    }

    @media (max-width: 2000px) {
        .contents {
            left: 20vw;
            width: 60vw;
        }
    }

    @media (max-width: 1700px) {
        .contents {
            left: 13vw;
            width: 74vw;
        }
    }

    @media (max-width: 1400px) {
        .contents {
            left: 11vw;
            width: 78vw;
        }
    }

    @media (max-width: 1200px) {
        .contents {
            padding-top: 10vh;
            left: 3vw;
            width: 94vw;
        }

        .introduction .glitch {
            padding-top: 0;
        }

        .details-container {
            margin-top: 0rem;
            font-size: 1.2rem;
            line-height: 1.6rem;
        }

        .specifics {
            padding-top: 2rem;
        }

        .specific {
            display: block;
            margin-bottom: 2.4rem;
            padding-right: 0;
        }

        .specific .title {
            font-size: 1.2rem;
            line-height: 1.6rem;
        }

        .specific .context {
            padding: 0.2rem 0 0.8rem;
            font-size: 1.2rem;
            line-height: 1.6rem;
        }
    }

    @media (max-width: 800px) {
        .contents {
            padding: 9vh 1.5rem 0;
            left: 1vw;
            width: 94vw;
        }

        .introduction .item {
            display: inline;
            line-height: 2rem;
        }

        .introduction .item:nth-child(2) {
            padding-left: 5px;
        }

        .details-container {
            font-size: 1rem;
            line-height: 1.4rem;
        }

        .specific .title {
            font-size: 1rem;
            line-height: 1.4rem;
        }

        .specific .context {
            padding: 0.2rem 0 0.8rem;
            font-size: 0.8rem;
            line-height: 1.4rem;
        }
    }
</style>
