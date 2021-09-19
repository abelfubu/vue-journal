declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'element-ui/lib/locale/lang/es' {}
declare module 'element-ui/lib/locale' {
  export default { use: (a: unknown): unknown => ({ a }) };
}
