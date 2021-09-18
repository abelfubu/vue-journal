<template>
  <li class="entry-container">
    <div>
      <span class="day">{{ day }}</span>
      <span class="month">{{ monthCapitalized }}</span>
      <span>{{ year }}</span>
    </div>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, voluptatem dolores?</p>
  </li>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Entry extends Vue {
    date = new Date();
    day = this.date.toLocaleString('es-ES', { day: 'numeric' });
    month = this.date.toLocaleString('es-ES', { month: 'long' });
    year = this.date.toLocaleString('es-ES', { year: 'numeric', weekday: 'long' });

    get monthCapitalized(): string {
      return this.month[0].toUpperCase() + this.month.substr(1);
    }
  }
</script>

<style lang="scss" scoped>
  .entry-container {
    cursor: pointer;
    padding: 1rem;
    transition: background-color 0.2s ease-in-out;
    border-bottom: 1px solid #ddd;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  span:not(:last-child) {
    margin-right: 0.5rem;
  }

  .day {
    font-weight: bold;
    font-size: 1.2rem;
  }

  .month {
    font-weight: bold;
    font-size: 1rem;
    color: var(--primary);
  }
</style>
