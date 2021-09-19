<template>
  <div>
    <h1>No hay nada seleccionado</h1>
    <Fab
      @click.native="$router.push({ name: 'EntryView', params: { id: 'NEW' } })"
      :type="fabType.ADD"
    />
  </div>
</template>

<script lang="ts">
  import { FabType } from '@/models/fabtype';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      Fab: () => import('../../shared/components/ui/Fab.vue'),
    },
  })
  export default class NoEntrySelected extends Vue {
    fabType = FabType;
  }
</script>

<style lang="scss" scoped>
  div {
    display: grid;
    place-items: center;
  }
</style>
