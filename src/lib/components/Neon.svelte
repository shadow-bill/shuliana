<script>
  export let text = "Neon Text";
  export let level = 1;
  export let animate = true;
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap" rel="stylesheet">
</svelte:head>

<div class="neon-container">
  {#if level === 1}
    <h1 class="neon-text" class:animate>{text}</h1>
  {:else}
    <h2 class="neon-text">{text}</h2>
  {/if}
</div>

<style>
  .neon-container {
    display: inline-block;
    font-family: "Yellowtail", sans-serif;
  }

  .neon-text {
    color: #fff;
    text-shadow:
        0 0 7px #fff,
        0 0 10px #fff,
        0 0 21px #fff,
        0 0 42px #ff52e8,
        0 0 82px #ff52e8,
        0 0 92px #ff52e8,
        0 0 102px #ff52e8,
        0 0 151px #ff52e8;
    text-align: left;
    font-weight: 400;
    margin: 0;
  }
  
  h1.neon-text {
    font-size: 5.2rem;
  }
  
  h1.neon-text.animate {
    animation: pulsate 1.1s ease-in-out infinite alternate;
  }
  
  h2.neon-text {
    font-size: 3.8rem;
  }

  @keyframes pulsate {
    100% {
      text-shadow:
        0 0 4px #fff,
        0 0 11px #fff,
        0 0 19px #fff,
        0 0 40px #ff5261,
        0 0 80px #ff52e8,
        0 0 90px #ff5261,
        0 0 100px #ff52e8,
        0 0 150px #ff52e8;
    }
    
    0% {
      text-shadow:
        0 0 4px #fff,
        0 0 10px #fff,
        0 0 18px #fff,
        0 0 38px #ff52e8,
        0 0 73px #ff52e8,
        0 0 80px #ff52e8,
        0 0 94px #ff52e8,
        0 0 140px #ff5261;
    }
  }

  /* Responsive design */
  @media (max-width: 800px) {
    .neon-container, .neon-text, h1, h2 {
      display: inline;
    }

    h1.neon-text {
      font-size: 3rem;
    }
    
    h2.neon-text {
      font-size: 1.4rem;
    }
  }
</style>