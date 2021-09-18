<template>
  <div class="entryview-container">
    <h1>{{ new Date() }}</h1>
    <textarea placeholder="Que pasó hoy?"></textarea>
    <Fab :type="fabType.DELETE" :position="{ bottom: '8rem' }" bgColor="var(--warn)" />
    <Fab :type="fabType.UPLOAD" :position="{ bottom: '5rem' }" bgColor="var(--primary)" />
    <Fab :type="fabType.EDIT" />
  </div>
</template>

<script lang="ts">
  import { FabType } from '@/models';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      Fab: () => import('../components/Fab.vue'),
    },
  })
  export default class EntryView extends Vue {
    fabType = FabType;
  }
</script>

<style lang="scss" scoped>
  .entryview-container {
    padding: 1rem 1rem 0;
  }

  textarea {
    border: 0.5px solid #ddd;
    font-size: 1rem;
    height: calc(100vh - 9.3rem);
    margin: 1rem 0;
    outline: unset;
    padding: 1rem;
    resize: none;
    width: 100%;
  }
</style>
