<template>
  <div class="layout-daybook">
    <Header />
    <section v-if="!isLoading">
      <EntryList />
      <router-view></router-view>
    </section>
    <Loader v-else />
  </div>
</template>

<script lang="ts">
  import vxm from '@/store/vxm';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      Header: () => import('../components/Header.vue'),
      EntryList: () => import('../components/EntryList.vue'),
      Loader: () => import('@/modules/shared/components/ui/Loader.vue'),
    },
  })
  export default class DaybookLayout extends Vue {
    get isLoading(): boolean {
      return vxm.journal.isLoading;
    }

    created(): void {
      vxm.journal.getEntries();
    }
  }
</script>

<style scoped lang="scss">
  section {
    display: grid;
    grid-template-columns: 18rem auto;
  }
</style>
