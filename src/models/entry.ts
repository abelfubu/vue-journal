export interface Entry {
  id: string;
  date: string;
  picture: string;
  text: string;
}

export interface EntriesApiResponse {
  [key: string]: Omit<Entry, 'id'>;
}
