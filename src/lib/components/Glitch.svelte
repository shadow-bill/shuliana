<script>
  export let text = "Glitch";
    
  // Update width when component mounts or text changes
</script>

<div class="wrapper">
  <h1 class="glitch" data-text={text} style="--element-width: 1000px">{text}</h1>
</div>

<style>
  .wrapper {
    display: inline-block;
  }

  .glitch {
    color: #ff42c3;
    font-family: 'Press Start 2P', cursive;
    position: relative;
    font-size: 3.8rem;
    margin: 0;
    word-spacing: -1rem;
    text-align: left;
    padding: 30px 30px 0 30px;
  }

  .glitch::before,
  .glitch::after {
    padding: 30px;
    color: #ff709d;
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    overflow: hidden;
    top: 0;
  }

  .glitch::before {
    left: 3px;
    text-shadow: -2px 0 red;
    animation: glitch-animation-1 3s linear infinite;
  }

  .glitch::after {
    left: -3px;
    text-shadow: -2px 0 blue;
    animation: glitch-animation-2 3s linear infinite;
  }

  @keyframes glitch-animation-1 {
    0% { clip: rect(42px, var(--element-width), 44px, 30px); }
    5% { clip: rect(12px, var(--element-width), 59px, 30px); }
    10% { clip: rect(48px, var(--element-width), 29px, 30px); }
    15% { clip: rect(42px, var(--element-width), 73px, 30px); }
    20% { clip: rect(63px, var(--element-width), 27px, 30px); }
    25% { clip: rect(34px, var(--element-width), 55px, 30px); }
    30% { clip: rect(86px, var(--element-width), 73px, 30px); }
    35% { clip: rect(20px, var(--element-width), 20px, 30px); }
    40% { clip: rect(26px, var(--element-width), 60px, 30px); }
    45% { clip: rect(25px, var(--element-width), 42px, 30px); }
    50% { clip: rect(58px, var(--element-width), 46px, 30px); }
    55% { clip: rect(67px, var(--element-width), 11px, 30px); }
    60% { clip: rect(79px, var(--element-width), 89px, 30px); }
    65% { clip: rect(17px, var(--element-width), 47px, 30px); }
    70% { clip: rect(84px, var(--element-width), 97px, 30px); }
    75% { clip: rect(46px, var(--element-width), 92px, 30px); }
    80% { clip: rect(90px, var(--element-width), 74px, 30px); }
    85% { clip: rect(15px, var(--element-width), 75px, 30px); }
    90% { clip: rect(69px, var(--element-width), 66px, 30px); }
    95% { clip: rect(91px, var(--element-width), 91px, 30px); }
    100% { clip: rect(84px, var(--element-width), 52px, 30px); }
  }

  @keyframes glitch-animation-2 {
    0% { clip: rect(65px, var(--element-width), 119px, 30px); }
    5% { clip: rect(40px, var(--element-width), 105px, 30px); }
    10% { clip: rect(31px, var(--element-width), 149px, 30px); }
    15% { clip: rect(71px, var(--element-width), 148px, 30px); }
    20% { clip: rect(25px, var(--element-width), 45px, 30px); }
    25% { clip: rect(52px, var(--element-width), 96px, 30px); }
    30% { clip: rect(38px, var(--element-width), 53px, 30px); }
    35% { clip: rect(63px, var(--element-width), 121px, 30px); }
    40% { clip: rect(15px, var(--element-width), 75px, 30px); }
    45% { clip: rect(45px, var(--element-width), 26px, 30px); }
    50% { clip: rect(59px, var(--element-width), 103px, 30px); }
    55% { clip: rect(16px, var(--element-width), 83px, 30px); }
    60% { clip: rect(23px, var(--element-width), 15px, 30px); }
    65% { clip: rect(91px, var(--element-width), 111px, 30px); }
    70% { clip: rect(26px, var(--element-width), 115px, 30px); }
    75% { clip: rect(134px, var(--element-width), 43px, 30px); }
    80% { clip: rect(71px, var(--element-width), 133px, 30px); }
    85% { clip: rect(138px, var(--element-width), 36px, 30px); }
    90% { clip: rect(65px, var(--element-width), 53px, 30px); }
    95% { clip: rect(130px, var(--element-width), 103px, 30px); }
    100% { clip: rect(105px, var(--element-width), 24px, 30px); }
  }

  @media (max-width: 1200px) {
    .glitch {
      font-size: 2rem;
    }
  }

  @media (max-width: 800px) {
  }
</style>