<template>
  <div class="entrylist-container">
    <input type="text" placeholder="Search" />
    <ul>
      <Entry v-for="link in 100" @click.native="onEntryClicked(link)" :key="link">Entry</Entry>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      Entry: () => import('./Entry.vue'),
    },
  })
  export default class EntryList extends Vue {
    onEntryClicked(link: number): void {
      const params = { id: String(link) };
      this.$router.push({ name: 'EntryView', params });
    }
  }
</script>

<style scoped lang="scss">
  .entrylist-container {
    border: 1px solid #ccc;
  }

  input {
    border: unset;
    border-bottom: 1px solid #ccc;
    font-size: 1.1rem;
    outline: none;
    padding: 0.5rem;
    padding-left: 1rem;
    width: 100%;
  }

  ul {
    list-style: none;
    max-height: calc(100vh - 6.8rem);
    overflow-y: scroll;
  }
</style>
