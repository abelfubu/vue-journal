<template>
  <div class="entryview-container">
    <div class="flex">
      <h1 @click="toggleDatePicker()">
        <span
          v-for="(section, index) in date.split(' ')"
          :key="index"
          :class="index === 3 && 'green'"
          >{{ section }}
        </span>
      </h1>
      <el-date-picker
        lang="spanish"
        ref="datepicker"
        v-model="entry.date"
        format="dd - MM - yyyy"
      ></el-date-picker>
    </div>
    <textarea placeholder="Que pasó hoy?" v-model="entry.text"></textarea>
    <img :src="entry.picture" :alt="entry.date" />
    <input @change="onFilePicked" type="file" ref="fileInput" hidden />
    <Fab
      @click.native="onFileInputClick()"
      :type="fabType.UPLOAD"
      :position="{ bottom: '5rem' }"
      bgColor="var(--primary)"
    />
    <Fab v-if="id === 'NEW'" @click.native="createEntry" :type="fabType.EDIT" />
    <template v-else>
      <Fab @click.native="saveEntry" :type="fabType.EDIT" />
      <Fab
        @click.native="deleteEntry"
        :type="fabType.DELETE"
        :position="{ bottom: '8rem' }"
        bgColor="var(--warn)"
      />
    </template>
  </div>
</template>

<script lang="ts">
  import { LONG_DATE } from '@/constants/date.format';
  import { DEFAULT_ENTRY } from '@/constants/entry.default';
  import { FabType } from '@/models';
  import { Entry } from '@/models/entry';
  import vxm from '@/store/vxm';
  import { DatePicker } from 'element-ui';
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component({
    components: {
      Fab: () => import('../../shared/components/ui/Fab.vue'),
    },
  })
  export default class EntryView extends Vue {
    fabType = FabType;
    date = '';
    entry: Entry = { ...DEFAULT_ENTRY };

    @Prop({ type: String, required: true })
    id!: string;

    @Watch('id') onIdChange(): void {
      this.loadEntry();
    }

    @Watch('entry.date') onDateChange(): void {
      this.date = this.onEntryChange();
    }

    onEntryChange(): string {
      return new Date(this.entry.date).toLocaleString('es-ES', LONG_DATE);
    }

    onFileInputClick(): void {
      const fileInput = this.$refs.fileInput as HTMLInputElement;
      fileInput?.click();
    }

    onFilePicked(event: InputEvent): void {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (!file) return;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.entry.picture = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
    }

    loadEntry(): void {
      if (this.id === 'NEW') {
        // this.entry = { ...DEFAULT_ENTRY };
        this.date = this.onEntryChange();
        return;
      }

      this.entry = this.getEntry(this.id);
      if (!this.entry?.id) this.$router.push({ name: 'NoEntry' });
      this.date = this.onEntryChange();
    }

    getEntry(id: string): Entry {
      return vxm.journal.entryById(id);
    }

    async createEntry(): Promise<void> {
      const id = await vxm.journal.createEntry(this.entry);
      this.$router.push({ name: 'EntryView', params: { id } });
      this.$message.success('Entrada creada!');
    }

    async saveEntry(): Promise<void> {
      await vxm.journal.saveEntry(this.entry);
      this.$message.success('Entrada guardada!');
    }

    async deleteEntry(): Promise<void> {
      const message = '¿Está seguro que desea eliminar este registro?';
      const title = 'Alerta';
      const options = {
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'Cancelar',
        showClose: false,
      };
      try {
        await this.$confirm(message, title, options);
        await vxm.journal.deleteEntry(this.id);
        this.$message.success('Entrada Eliminada');
      } catch (error) {
        return;
      }
    }

    toggleDatePicker(): void {
      (this.$refs.datepicker as DatePicker).focus();
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
    margin-bottom: 1rem;

    span:first-of-type {
      text-transform: capitalize;
    }
  }

  textarea {
    border: 0.5px solid #ddd;
    display: block;
    font-size: 1rem;
    height: calc(100vh - 8.5rem);
    margin: 0.5rem 0;
    outline: unset;
    padding: 1rem;
    resize: none;
  }

  img {
    height: 150px;
    justify-self: end;
    margin-right: 0.6rem;
    margin-top: 0.5rem;
    object-fit: cover;
    width: 150px;
  }

  .green {
    color: var(--primary);
    text-transform: capitalize;
  }

  .flex {
    grid-column: span 2;
  }
</style>
