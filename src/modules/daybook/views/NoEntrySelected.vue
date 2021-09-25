<template>
  <div>
    <h1>No hay nada seleccionado</h1>
    <Fab @click.native="$router.push(entryViewRoute)">
      <AddIcon />
    </Fab>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      Fab: () => import('@/modules/shared/components/ui/Fab.vue'),
      AddIcon: () => import('@/modules/shared/components/icons/AddIcon.vue'),
    },
  })
  export default class NoEntrySelected extends Vue {
    entryViewRoute = { name: 'EntryView', params: { id: 'NEW' } };
  }
</script>

<style lang="scss" scoped>
  div {
    display: grid;
    place-items: center;
  }
</style>
