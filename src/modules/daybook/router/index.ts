import { RouteConfig } from 'vue-router';

const childrenRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'NoEntry',
    component: () =>
      import(/* webpackChunkName: "daybook-no-entry" */ '../views/NoEntrySelected.vue'),
  },
  {
    path: ':id',
    name: 'EntryView',
    component: () =>
      import(/* webpackChunkName: "daybook-no-entry" */ '../views/EntryView.vue'),
    props: route => ({ id: route.params.id }),
  },
];

export const daybookRouter: Partial<RouteConfig> = {
  component: () =>
    import(/* webpackChunkName: "daybook" */ '../layouts/DaybookLayout.vue'),
  children: childrenRoutes,
};
