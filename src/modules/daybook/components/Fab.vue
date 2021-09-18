<template>
  <button :style="{ ...position, backgroundColor: bgColor }">
    <svg
      v-if="type === fabType.ADD"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    <svg
      v-else-if="type === fabType.EDIT"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
      />
    </svg>

    <svg
      v-else-if="type === fabType.UPLOAD"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
        clip-rule="evenodd"
      />
    </svg>

    <svg
      v-else-if="type === fabType.DELETE"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </button>
</template>

<script lang="ts">
  import { AbsolutePosition } from '@/models/absolute-position';
  import { FabType } from '@/models/fabtype';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Fab extends Vue {
    @Prop({ default: 'add', type: Number })
    type!: FabType;

    @Prop({ default: () => ({}), type: Object })
    position!: Partial<AbsolutePosition>;

    @Prop({ default: 'var(--secondary)', type: String })
    bgColor?: string;

    fabType = FabType;
  }
</script>

<style lang="scss">
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
