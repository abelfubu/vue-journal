interface DateFormat {
  weekday: 'long' | 'short' | 'narrow' | undefined;
  day: 'numeric' | '2-digit' | undefined;
  month: 'long' | 'numeric' | undefined;
  year: 'numeric' | '2-digit' | undefined;
}

export const LONG_DATE: DateFormat = {
  day: 'numeric',
  year: 'numeric',
  month: 'long',
  weekday: 'long',
};
