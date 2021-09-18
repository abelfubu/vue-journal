<template>
  <div class="layout-daybook">
    <Header />
    <section>
      <EntryList />
      <router-view></router-view>
    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import vxm from '@/store/vxm';

  @Component({
    components: {
      Header: () => import('../components/Header.vue'),
      EntryList: () => import('../components/EntryList.vue'),
    },
  })
  export default class DaybookLayout extends Vue {
    mounted(): void {
      console.log(vxm.user);
    }
  }
</script>

<style scoped lang="scss">
  section {
    display: grid;
    grid-template-columns: 18rem auto;
  }
</style>
