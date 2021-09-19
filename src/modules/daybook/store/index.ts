import { EntriesApiResponse, Entry } from '@/models/entry';
import { createModule, mutation, action } from 'vuex-class-component';
import entriesApi from '../api/entriesApi';

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
});

export default class DaybookStore extends VuexModule {
  private loading = false;
  entries: Entry[] = [];

  @mutation toggleIsLoading(): void {
    this.loading = !this.loading;
  }

  @mutation setEntries(entriesResponse: EntriesApiResponse): void {
    const entriesArray = Object.entries(entriesResponse);
    const entries = entriesArray.map(([id, entry]) => ({ id, ...entry }));
    this.entries = entries;
  }

  @mutation updateEntry({ id, ...updatedEntry }: Entry): void {
    this.entries = this.entries.map(entry =>
      entry.id === id ? { ...entry, ...updatedEntry } : entry,
    );
  }

  @action async getEntries(): Promise<void> {
    this.toggleIsLoading();
    try {
      const response = await entriesApi.get<EntriesApiResponse>('/entries.json');
      this.setEntries(response.data);
    } catch (error) {
      throw new Error(String(error));
    } finally {
      this.toggleIsLoading();
    }
  }

  @action async saveEntry({ id, ...entry }: Entry): Promise<void> {
    this.toggleIsLoading();
    try {
      const response = await entriesApi.put(`/entries/${id}.json`, entry);
      this.updateEntry({ id, ...response.data });
    } catch (error) {
      throw new Error(String(error));
    } finally {
      this.toggleIsLoading();
    }
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

  get entriesByTerm(): (term: string) => Entry[] {
    return (term: string): Entry[] =>
      this.entries.filter(entry =>
        entry.text.toLowerCase().includes(term.trim().toLowerCase()),
      );
  }

  get entryById(): (id: string) => Entry {
    return (id: string): Entry => {
      const entry = this.entries.find(entry => entry.id === id);
      if (!entry) return {} as Entry;
      return { ...entry };
    };
  }

  get bio(): string {
    return `Name: ${this.loading} Specialty: ${this.loading}`;
  }
}
