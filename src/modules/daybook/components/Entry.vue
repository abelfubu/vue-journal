<template>
  <li class="entry-container">
    <div>
      <span class="day">{{ day }}</span>
      <span class="month">{{ monthCapitalized }}</span>
      <span class="year">{{ year }}</span>
    </div>
    <p>{{ text }}</p>
  </li>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { Entry as IEntry } from '@/models/entry';

  @Component
  export default class Entry extends Vue {
    @Prop({ required: true })
    entry!: IEntry;

    get day(): string {
      return new Date(this.entry.date).toLocaleString('es-ES', { day: 'numeric' });
    }

    get month(): string {
      return new Date(this.entry.date).toLocaleString('es-ES', { month: 'long' });
    }

    get year(): string {
      const date = new Date(this.entry.date);
      const year = date.getFullYear();
      const day = date.toLocaleString('es-ES', { weekday: 'long' });
      const dayOfWeek = this.capitalize(day);
      return `${year}, ${dayOfWeek}`;
    }

    get text(): string {
      return this.entry.text.length > 100
        ? this.entry.text.substring(0, 100) + '...'
        : this.entry.text;
    }

    get monthCapitalized(): string {
      return this.month[0].toUpperCase() + this.month.substr(1);
    }

    private capitalize([first, ...rest]: string): string {
      return first.toUpperCase() + rest.join('');
    }
  }
</script>

<style lang="scss" scoped>
  .entry-container {
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    padding: 1rem;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  span:not(:last-child) {
    margin-right: 0.3rem;
  }

  .day {
    font-size: 1.3rem;
    font-weight: bold;
  }

  .month {
    color: var(--primary);
    font-size: 1.2rem;
    font-weight: bold;
  }

  .year {
    color: var(--secondary);
    font-size: 0.9rem;
    font-weight: bold;
  }

  p {
    color: var(--secondary);
    margin-top: 0.4rem;
    opacity: 0.7;
  }
</style>
