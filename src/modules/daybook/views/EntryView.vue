<template>
  <div class="entryview-container">
    <h1>
      <span
        v-for="(section, index) in date.split(' ')"
        :key="index"
        :class="index === 3 && 'green'"
        >{{ section }}
      </span>
    </h1>
    <textarea placeholder="Que pasó hoy?" v-model="entry.text"></textarea>
    <img :src="entry.picture" :alt="entry.date" />
    <Fab :type="fabType.DELETE" :position="{ bottom: '8rem' }" bgColor="var(--warn)" />
    <Fab :type="fabType.UPLOAD" :position="{ bottom: '5rem' }" bgColor="var(--primary)" />
    <Fab @click.native="saveEntry" :type="fabType.EDIT" />
  </div>
</template>

<script lang="ts">
  import { LONG_DATE } from '@/constants/date.format';
  import { FabType } from '@/models';
  import { Entry } from '@/models/entry';
  import vxm from '@/store/vxm';
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component({
    components: {
      Fab: () => import('../../shared/components/ui/Fab.vue'),
    },
  })
  export default class EntryView extends Vue {
    fabType = FabType;
    entry!: Entry;
    date = '';

    @Prop({ type: String, required: true })
    id!: string;

    @Watch('id') onIdChange(): void {
      this.loadEntry();
    }

    onEntryChange(): string {
      return new Date(this.entry.date).toLocaleString('es-ES', LONG_DATE);
    }

    loadEntry(): void {
      this.entry = this.getEntry(this.id);
      if (!this.entry?.id) this.$router.push({ name: 'NoEntry' });
      this.date = this.onEntryChange();
    }

    getEntry(id: string): Entry {
      return vxm.journal.entryById(id);
    }

    saveEntry(): void {
      vxm.journal.saveEntry(this.entry);
    }

    created(): void {
      this.loadEntry();
    }
  }
</script>

<style lang="scss" scoped>
  .entryview-container {
    display: grid;
    grid-template-columns: auto 11rem;
    padding: 1rem 1rem 0;
  }

  h1 {
    grid-column: span 2;

    span:first-of-type {
      text-transform: capitalize;
    }
  }

  textarea {
    border: 0.5px solid #ddd;
    font-size: 1rem;
    height: calc(100vh - 8.5rem);
    margin: 0.5rem 0;
    outline: unset;
    padding: 1rem;
    resize: none;
  }

  img {
    justify-self: end;
    margin-right: 0.6rem;
    margin-top: 0.5rem;
  }

  .green {
    color: var(--primary);
    text-transform: capitalize;
  }
</style>
