<script lang="ts">
	import { _ } from 'svelte-i18n';
    import GoogleMap from './GoogleMap.svelte';
    import Neon from './Neon.svelte';
</script>

<div class="instructions">
    <div class="logo">
        <div class="top"><Neon text={$_('instructions.logo.the')} /></div>
        <div class="bottom"><Neon text={$_('instructions.logo.ceremony')} /></div>
    </div>
    <div class="items">
        <div class="item">
            <div class="title">{$_('instructions.ceremony.schedule')}</div>
            <div class="value">{$_('instructions.ceremony.schedule-info-location')}</div>
            <div class="value">{$_('instructions.ceremony.schedule-info-start')}</div>
            <div class="value">{$_('instructions.ceremony.schedule-info-end')}</div>
        </div>
        <div class="item">
            <div class="title">{$_('instructions.ceremony.what-to-expect')}</div>
            <div class="value">{$_('instructions.ceremony.what-to-expect-info-room')}</div>
            <div class="value">{$_('instructions.ceremony.what-to-expect-info-dress')}</div>
            <div class="value">{$_('instructions.ceremony.what-to-expect-info-gifts')}</div>
        </div>
        <div class="item">
            <div class="title">{$_('instructions.ceremony.after-the-ceremony')}</div>
            <div class="value">{$_('instructions.ceremony.after-the-ceremony-info-location')}</div>
            <div class="value">{$_('instructions.ceremony.after-the-ceremony-info-finding-it')}</div>
        </div>
    </div>
    <div class="map">
        <GoogleMap centerLat={53.4791626} centerLng={-2.2465828} markers={[{ lat: 53.4791626, lng: -2.2465828, title: 'Manchester Registry Office' }]} />
    </div>
    <div class="logo">
        <div class="top"><Neon text={$_('instructions.logo.the')} /></div>
        <div class="bottom"><Neon text={$_('instructions.logo.party')} /></div>
    </div>
    <div class="items">
        <div class="item">
            <div class="title">{$_('instructions.party.schedule')}</div>
            <div class="value">{$_('instructions.party.schedule-info-start')}</div>
            <div class="value">{$_('instructions.party.schedule-info-end')}</div>
        </div>
        <div class="item">
            <div class="title">{$_('instructions.party.what-to-expect')}</div>
            <div class="value">{$_('instructions.party.what-to-expect-info-drinks')}</div>
            <div class="value">{$_('instructions.party.what-to-expect-info-food')}</div>
            <div class="value">{$_('instructions.party.what-to-expect-info-vibe')}</div>
        </div>
        <div class="item">
            <div class="title">{$_('instructions.party.getting-there')}</div>
            <div class="value">{$_('instructions.party.getting-there-info-location')}</div>
            <div class="value">{$_('instructions.party.getting-there-info-finding-it')}</div>
        </div>
    </div>
    <div class="map">
        <GoogleMap />
    </div>
</div>

<style>
    .instructions {
        padding: 0 6vw 2rem 6vw;
        background-color: #222222;
        opacity: 1;
        background-image: radial-gradient(#3b1838 2px, transparent 2px), radial-gradient(#3b1838 2px, #222222 2px);
        background-size: 80px 80px;
        background-position: 0 0,40px 40px;
    }

    .logo {
        padding-top: 3rem;
        text-align: center;
    }

    .logo:first-child {
        padding-top: 2rem;
    }

    .logo .top, .logo .bottom {
        transform: rotate(-10deg);
    }

    .logo .bottom {
        position: relative;
        top: -3.5rem;
    }

    .map {
        padding-top: 2rem;
    }

    .items {
        display: flex;
        gap: 2rem;
        margin: 0 auto;
        padding-top: 1rem;
        font-family: 'Press Start 2P', cursive;
    }

    .items .item {
        flex: 3;
    }

    .items .title {
        position: relative;
        padding: 0.2rem 0 0.8rem;
        color: #ff709d;
        font-size: 1.2rem;
        text-align: left;
        line-height: 1.4rem;
    }

    .items .title:after {
        position: absolute;
        display: block;
        content: '';
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background: linear-gradient(90deg, #ff709d 0%, #ff709d 30%, cyan 100%);
    }

    .items .value {
        padding-top: 0.8rem;
        color: #fff;
        font-size: 1rem;
        text-align: left;
        line-height: 1.4rem;
    }

    @media (max-width: 2000px) {
        .items {
            max-width: 60vw;
        }
    }

    @media (max-width: 1700px) {
        .items {
            max-width: 74vw;
        }
    }

    @media (max-width: 1400px) {
        .items {
            max-width: 78vw;
        }
    }

    @media (max-width: 1200px) {
        .logo .bottom {
            top: -3rem;
        }

        .items {
            display: block;
            max-width: 94vw;
        }

        .items .item {
            display: block;
            flex: none;
            padding-bottom: 2rem;
        }

        .map {
            padding-top: 0;
        }

        .items .title {
            font-size: 1rem;
        }

        .items .value {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 800px) {
        .logo .bottom {
            top: -2rem;
        }
    }
</style>