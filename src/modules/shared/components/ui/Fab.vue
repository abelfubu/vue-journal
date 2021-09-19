<template>
  <button :style="{ ...position, backgroundColor: bgColor }">
    <AddIcon v-if="type === fabType.ADD" />
    <EditIcon v-else-if="type === fabType.EDIT" />
    <UploadIcon v-else-if="type === fabType.UPLOAD" />
    <DeleteIcon v-else-if="type === fabType.DELETE" />
  </button>
</template>

<script lang="ts">
  import { AbsolutePosition } from '@/models/absolute-position';
  import { FabType } from '@/models/fabtype';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      AddIcon: () => import('../icons/AddIcon.vue'),
      EditIcon: () => import('../icons/EditIcon.vue'),
      UploadIcon: () => import('../icons/UploadIcon.vue'),
      DeleteIcon: () => import('../icons/DeleteIcon.vue'),
    },
  })
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
