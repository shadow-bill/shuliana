<script lang="ts">
	import { _ } from 'svelte-i18n';
    import GoogleMap from './GoogleMap.svelte';
</script>

<div class="instructions">
    <div class="logo">
        <img src="/web/brickhouse.png" alt="A generated logo for the venue - brickhouse social" />
        <div class="items">
            <div class="item">
                <div class="title">{$_('instructions.schedule')}</div>
                <div class="value">{$_('instructions.schedule-info-start')}</div>
                <div class="value">{$_('instructions.schedule-info-end')}</div>
            </div>
            <div class="item">
                <div class="title">{$_('instructions.what-to-expect')}</div>
                <div class="value">{$_('instructions.what-to-expect-info-drinks')}</div>
                <div class="value">{$_('instructions.what-to-expect-info-food')}</div>
            </div>
            <div class="item">
                <div class="title">{$_('instructions.getting-there')}</div>
                <div class="value">{$_('instructions.getting-there-info-location')}</div>
                <div class="value">{$_('instructions.getting-there-info-finding-it')}</div>
            </div>
        </div>
        <div class="map">
            <GoogleMap />
        </div>
    </div>
</div>

<style>
    .instructions {
        padding: 2rem 6vw;
    }

    .logo {
        text-align: center;
    }

    .logo img {
        width: 100%;
        max-width: 300px;
    }

    .map {
        padding-top: 2rem;
    }

    .items {
        display: flex;
        gap: 2rem;
        margin: 0 auto;
        padding-top: 2rem;
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
</style>