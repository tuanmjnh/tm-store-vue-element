<script>
export default {
  // name: 'v-progress-circular',
  props: {
    button: Boolean,
    indeterminate: Boolean,
    rotate: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [Number, String],
      default: 32
    },
    width: {
      type: [Number, String],
      default: 4
    },
    value: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    calculatedSize() {
      return Number(this.size) + (this.button ? 8 : 0)
    },

    circumference() {
      return 2 * Math.PI * this.radius
    },

    classes() {
      return {
        'v-progress-circular--indeterminate': this.indeterminate,
        'v-progress-circular--button': this.button
      }
    },

    normalizedValue() {
      if (this.value < 0) {
        return 0
      }

      if (this.value > 100) {
        return 100
      }

      return parseFloat(this.value)
    },

    radius() {
      return 20
    },

    strokeDashArray() {
      return Math.round(this.circumference * 1000) / 1000
    },

    strokeDashOffset() {
      return ((100 - this.normalizedValue) / 100) * this.circumference + 'px'
    },

    strokeWidth() {
      return Number(this.width) / +this.size * this.viewBoxSize * 2
    },

    styles() {
      return {
        height: `${this.calculatedSize}px`,
        width: `${this.calculatedSize}px`
      }
    },

    svgStyles() {
      return {
        transform: `rotate(${Number(this.rotate)}deg)`
      }
    },

    viewBoxSize() {
      return this.radius / (1 - Number(this.width) / +this.size)
    }
  },

  methods: {
    genCircle(h, name, offset) {
      return h('circle', {
        class: `v-progress-circular__${name}`,
        attrs: {
          fill: 'transparent',
          cx: 2 * this.viewBoxSize,
          cy: 2 * this.viewBoxSize,
          r: this.radius,
          'stroke-width': this.strokeWidth,
          'stroke-dasharray': this.strokeDashArray,
          'stroke-dashoffset': offset
        }
      })
    },
    genSvg(h) {
      const children = [
        this.indeterminate || this.genCircle(h, 'underlay', 0),
        this.genCircle(h, 'overlay', this.strokeDashOffset)
      ]

      return h('svg', {
        style: this.svgStyles,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: `${this.viewBoxSize} ${this.viewBoxSize} ${2 * this.viewBoxSize} ${2 * this.viewBoxSize}`
        }
      }, children)
    },
    isCssColor(color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },
    setTextColor(color, data) {
      if (this.isCssColor(color)) {
        data.style = {
          ...data.style,
          'color': `${color}`,
          'caret-color': `${color}`
        }
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ', 2)
        data.class = {
          ...data.class,
          [colorName + '--text']: true
        }
        if (colorModifier) {
          data.class['text--' + colorModifier] = true
        }
      }
      return data
    }
  },

  render(h) {
    const info = h('div', { staticClass: 'v-progress-circular__info' }, this.$slots.default)
    const svg = this.genSvg(h)

    return h('div', this.setTextColor(this.color, {
      staticClass: 'v-progress-circular',
      attrs: {
        'role': 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
      },
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    }), [svg, info])
  }
}
</script>

<style lang="scss">
// Progress Circular
$progress-circular-rotate-animation: progress-circular-rotate 1.4s linear
  infinite;
$progress-circular-rotate-dash: progress-circular-dash 1.4s ease-in-out infinite;
$process-circular-intermediate-svg-transition: all 0.2s ease-in-out;
$progress-circular-underlay-stroke: rgba(#000000, 0.1);
$progress-circular-overlay-transition: all 0.6s ease-in-out;

.v-progress-circular {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

.v-progress-circular svg {
  width: 100%;
  height: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
}

.v-progress-circular--indeterminate svg {
  animation: $progress-circular-rotate-animation;
  transform-origin: center center;
  transition: $process-circular-intermediate-svg-transition;
}

.v-progress-circular--indeterminate .v-progress-circular__overlay {
  animation: $progress-circular-rotate-dash;
  stroke-linecap: round;
  stroke-dasharray: 80, 200;
  stroke-dashoffset: 0px;
}

.v-progress-circular__underlay {
  stroke: $progress-circular-underlay-stroke;
  z-index: 1;
}

.v-progress-circular__overlay {
  stroke: currentColor;
  z-index: 2;
  transition: $progress-circular-overlay-transition;
}

.v-progress-circular__info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@-moz-keyframes progress-circular-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125px;
  }
}

@-webkit-keyframes progress-circular-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125px;
  }
}

@-o-keyframes progress-circular-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125px;
  }
}

@keyframes progress-circular-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125px;
  }
}

@-moz-keyframes progress-circular-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes progress-circular-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@-o-keyframes progress-circular-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes progress-circular-rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
