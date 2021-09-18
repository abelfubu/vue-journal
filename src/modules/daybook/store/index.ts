import { createModule, mutation, action } from 'vuex-class-component';

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
});

export default class DaybookStore extends VuexModule {
  private loading = false;
  entries = [
    {
      id: 1,
      date: '2017-01-01',
      picture: 'https://placehold.it/150x150',
      text: 'This is the first day of the journal.',
    },
    {
      id: 2,
      date: '2017-01-02',
      picture: 'https://placehold.it/150x150',
      text: 'This is the second day of the journal.',
    },
    {
      id: 3,
      date: '2017-01-03',
      picture: 'https://placehold.it/150x150',
      text: 'This is the third day of the journal.',
    },
    {
      id: 4,
      date: '2017-01-04',
      picture: 'https://placehold.it/150x150',
      text: 'This is the fourth day of the journal.',
    },
  ];

  @mutation toggleIsLoading(): void {
    this.loading = !this.loading;
  }

  @action async doSomethingAsync(): Promise<number> {
    return 20;
  }

  // Explicitly define a vuex getter using class getters.
  get isLoading(): boolean {
    return this.loading;
  }

  // Define a mutation for the vuex getter.
  // NOTE: this only works for getters.
  set isLoading(loading: boolean) {
    this.loading = loading;
  }

  get bio(): string {
    return `Name: ${this.loading} Specialty: ${this.loading}`;
  }
}
