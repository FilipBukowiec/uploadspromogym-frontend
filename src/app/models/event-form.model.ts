export interface EventForm {
  type: string;
  city: string;
  date: string | null;
  clubCity: string;
  files: File[] | null;
  terms: boolean;
}
