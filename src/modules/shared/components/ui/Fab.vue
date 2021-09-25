<template>
  <button :style="{ ...position, backgroundColor: bgColor }">
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import { AbsolutePosition } from '@/models/absolute-position';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Fab extends Vue {
    @Prop({ default: () => ({}), type: Object })
    position!: Partial<AbsolutePosition>;

    @Prop({ default: 'var(--secondary)', type: String })
    bgColor?: string;
  }
</script>

<style lang="scss" scoped>
  button {
    background: var(--secondary);
    border: unset;
    border-radius: 20%;
    bottom: 2rem;
    box-shadow: 0 1px 6px 1px #0004;
    color: #fff;
    cursor: pointer;
    height: 2.5rem;
    padding: 0.5rem;
    position: fixed;
    right: 2rem;
    transition: filter 0.2s ease-out;
    width: 2.5rem;

    &:hover {
      filter: brightness(1.1);
    }
  }
</style>
