<template>
  <div
    class="infinite-line"
    :class="{ '_reverse': reverse }"
  >
    <div
      ref="track"
      class="infinite-line__track"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import dispatcher from '~/js/modules/dispatcher';

export default {
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      timeline: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.update();
      this.handleLoad();
      this.handleResize();
    });
  },
  beforeDestroy() {
    this.timeline.kill();
  },
  methods: {
    update() {
      setTimeout(() => {
        const { $el: line, $refs: { track }, duration } = this;
        const lineWidth = line.offsetWidth;
        const items = track.querySelectorAll('.infinite-line__track > *:not(._clone)');
        const clones = track.querySelectorAll('._clone');
        const direction = this.reverse ? '' : '-';
        this.timeline = gsap.timeline();

        let trackWidth = 0;
        Array.prototype.forEach.call(items, (el) => {
          trackWidth += el.offsetWidth;
        });

        const ratio = Math.ceil(lineWidth / trackWidth) * 2 - 1;

        Array.prototype.forEach.call(clones, (el) => {
          el.remove();
        });
        gsap.killTweensOf(track);

        for (let i = 0; i < ratio; i += 1) {
          Array.prototype.forEach.call(items, (el) => {
            const clone = el.cloneNode(true);

            clone.classList.add('_clone');
            track.appendChild(clone);
          });
        }

        this.timeline
          .set(track, { clearProps: 'all' })
          .to(track, {
            x: `${direction}${trackWidth}px`, ease: 'none', repeat: -1, duration: duration * items.length,
          });
      });
    },
    handleLoad() {
      dispatcher.subscribe(({ type }) => {
        if (type === 'document:loaded') {
          this.update();
        }
      });
    },
    handleResize() {
      dispatcher.subscribe(({ type }) => {
        if (type === 'resize:width') {
          this.update();
        }
      });
    },
  },
};
</script>

<style lang="scss">
$b: '.infinite-line';

#{$b} {
  display: block;
  width: 100%;
  overflow: hidden;

  &__track {
    @include decor();
    display: flex;
    width: 100%;

    > * {
      flex-shrink: 0;
      min-width: rem(1px);

      #{$b}._reverse & {
        transform: translate(-100%, 0);
      }
    }
  }
}
</style>
