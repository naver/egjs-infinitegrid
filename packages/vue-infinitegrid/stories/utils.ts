export function makeVueApp(AppComponent: any): any {
  return (args: any, { argTypes }: any) => ({
    components: {
      App: AppComponent,
    },
    props: ["args", ...Object.keys(argTypes)],
    setup() {
      return { ...args, args };
    },
    template: '<App v-bind="args || $props" :key="Math.random()" />',
  });
}
