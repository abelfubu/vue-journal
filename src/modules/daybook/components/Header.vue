<template>
  <header :class="$style.nav">
    <img src="@/assets/logo.png" alt="Logo" />
    <ul>
      <li v-for="({ path, name }, index) in navigation" :key="index">
        <router-link :exact-active-class="$style.active" :to="path"> {{ name }}</router-link>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Header extends Vue {
    navigation = [
      { path: '/', name: 'Home' },
      { path: '/about', name: 'About' },
      { path: { name: 'NoEntry' }, name: 'Daybook' },
    ];
  }
</script>

<style module lang="scss">
  .nav {
    align-items: center;
    background-color: var(--secondary);
    display: flex;
    height: 4rem;
    justify-content: space-between;
    padding: 0 1rem;

    img {
      height: 2rem;
    }

    ul {
      display: flex;
      list-style: none;
      padding: 0;
    }

    li:not(:last-of-type)::after {
      color: #fff;
      content: ' | ';
    }

    a {
      color: #fff;
      font-weight: bold;
      padding: 0 0.5rem;

      &.active {
        color: var(--primary);
      }
    }
  }
</style>
