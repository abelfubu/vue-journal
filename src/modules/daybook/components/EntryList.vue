<template>
  <div class="entrylist-container">
    <input type="text" placeholder="Search" v-model="term" />
    <ul>
      <Entry
        v-for="entry in entries"
        @click.native="onEntryClicked(entry.id)"
        :key="entry.id"
        :entry="entry"
      />
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import vxm from '@/store/vxm';
  import { Entry } from '@/models/entry';

  @Component({
    components: {
      Entry: () => import('./Entry.vue'),
    },
  })
  export default class EntryList extends Vue {
    entries: Entry[] = [];
    term = '';
    debounceTimeout?: number;

    @Watch('term') onTermChanged(): void {
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.entries = vxm.journal.entriesByTerm(this.term);
      }, 400);
    }

    onEntryClicked(entryId: string): void {
      const params = { id: String(entryId) };
      this.$router.push({ name: 'EntryView', params });
    }

    mounted(): void {
      this.entries = vxm.journal.entriesByTerm(this.term);
    }
  }
</script>

<style scoped lang="scss">
  .entrylist-container {
    border: 1px solid #ccc;
    min-height: calc(100vh - 4rem);
  }

  input {
    border: unset;
    border-bottom: 1px solid #ccc;
    font-size: 1.1rem;
    outline: none;
    padding: 0.95rem 0.5rem;
    padding-left: 1rem;
    width: 100%;
  }

  ul {
    list-style: none;
    max-height: calc(100vh - 6.8rem);
    overflow-y: scroll;
  }
</style>
