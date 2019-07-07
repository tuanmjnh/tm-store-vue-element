  <template>
  <div class="loading-content">
    <section v-if="loader===1" class="loading-1">
      <svg :width="width" :height="height" viewBox="0 0 100 100">
        <polyline class="line-cornered stroke-still" points="0,0 100,0 100,100" stroke-width="10" fill="none">
        </polyline>
        <polyline class="line-cornered stroke-still" points="0,0 0,100 100,100" stroke-width="10" fill="none">
        </polyline>
        <polyline class="line-cornered stroke-animation" points="0,0 100,0 100,100" stroke-width="10" fill="none">
        </polyline>
        <polyline class="line-cornered stroke-animation" points="0,0 0,100 100,100" stroke-width="10" fill="none">
        </polyline>
      </svg>
    </section>
    <section v-if="loader===2" class="loading-2" :style="{width:`${width}px`, height:`${height}px`}">
      <div class="one" :style="{borderColor: color1}"></div>
      <div class="two" :style="{borderColor: color2, borderTopColor: 'transparent'}"></div>
      <div class="three" :style="{borderColor: color3, borderBottomColor: 'transparent'}"></div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    loader: { type: Number, default: 2 },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    color1: { type: String, default: '#1890FF' },
    color2: { type: String, default: '#6959CD' },
    color3: { type: String, default: '#11A983' }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.loading-content {
  position: fixed;
  top: 30%;
  left: 50%;
}
.loading-1 {
  svg {
    -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(1);
    transform: translate(-50%, -50%) rotate(45deg) scale(1);
  }

  .stroke-still {
    stroke: #232323;
  }

  .stroke-animation {
    -webkit-animation: stroke-spacing 1.2s ease-in, stroke-color 4.8s linear;
    animation: stroke-spacing 1.2s ease-in, stroke-color 4.8s linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-delay: 0;
    animation-delay: 0;
    -webkit-animation-direction: normal;
    animation-direction: normal;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-play-state: running;
    animation-play-state: running;
    -webkit-transform-origin: center center;
    transform-origin: center center;
  }

  @-webkit-keyframes stroke-spacing {
    0% {
      stroke-dasharray: 0 200;
    }
    45% {
      stroke-dashoffset: 0;
      stroke-dasharray: 200 200;
    }
    90% {
      stroke-dashoffset: -200;
      stroke-dasharray: 200 200;
    }
    100% {
      stroke-dashoffset: -200;
      stroke-dasharray: 200 200;
    }
  }

  @keyframes stroke-spacing {
    0% {
      stroke-dasharray: 0 200;
    }
    45% {
      stroke-dashoffset: 0;
      stroke-dasharray: 200 200;
    }
    90% {
      stroke-dashoffset: -200;
      stroke-dasharray: 200 200;
    }
    100% {
      stroke-dashoffset: -200;
      stroke-dasharray: 200 200;
    }
  }

  @-webkit-keyframes stroke-color {
    0% {
      stroke: #3498db;
    }
    24% {
      stroke: #643232;
    }
    25% {
      stroke: #327864;
    }
    49% {
      stroke: #327864;
    }
    50% {
      stroke: #32326e;
    }
    74% {
      stroke: #32326e;
    }
    75% {
      stroke: #78325a;
    }
    99% {
      stroke: #78325a;
    }
  }

  @keyframes stroke-color {
    0% {
      stroke: #3498db;
    }
    24% {
      stroke: #643232;
    }
    25% {
      stroke: #327864;
    }
    49% {
      stroke: #327864;
    }
    50% {
      stroke: #32326e;
    }
    74% {
      stroke: #32326e;
    }
    75% {
      stroke: #78325a;
    }
    99% {
      stroke: #78325a;
    }
  }
}
.loading-2 {
  position: relative;
  // width: 60px;
  // height: 60px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  .one {
    position: absolute;
    border: 4px solid #0455b3;
    border-left-color: transparent;
    border-bottom: 0;
    border-left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    -webkit-animation: loading-2-one 1s cubic-bezier(0.42, 0.61, 0.58, 0.41)
      infinite;
    animation: loading-2-one 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
  }

  .two {
    position: absolute;
    border: 4px solid #f50057;
    border-radius: 50%;
    width: 60%;
    height: 60%;
    left: calc(38% - 20px);
    top: calc(46% - 20px);
    border-right: 0;
    border-left: 0;
    border-top-color: transparent;
    -webkit-animation: loading-2-two 1s cubic-bezier(0.42, 0.61, 0.58, 0.41)
      infinite;
    animation: loading-2-two 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
  }
  .three {
    position: absolute;
    border: 4px solid #f50057;
    border-radius: 50%;
    width: 30%;
    height: 30%;
    left: calc(55% - 20px);
    top: calc(63% - 20px);
    border-right: 0;
    border-left: 0;
    border-top-color: transparent;
    -webkit-animation: loading-2-three 0.8s cubic-bezier(0.42, 0.61, 0.58, 0.41)
      infinite;
    animation: loading-2-three 0.8s cubic-bezier(0.42, 0.61, 0.58, 0.41)
      infinite;
  }
  @-webkit-keyframes loading-2-one {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes loading-2-one {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loading-2-two {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(-360deg);
      transform: rotate(-360deg);
    }
  }

  @keyframes loading-2-two {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(-360deg);
      transform: rotate(-360deg);
    }
  }
  @-webkit-keyframes loading-2-three {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(-360deg);
      transform: rotate(-360deg);
    }
  }

  @keyframes loading-2-three {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
