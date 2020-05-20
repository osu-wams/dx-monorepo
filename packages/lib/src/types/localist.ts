export interface LocalistEvent {
  action: {
    link: string;
    title?: string;
  };
  bg_image: string;
  body?: string;
  date: string;
  id: number;
  title: string;
  type: string;
  campus_id?: number;
  city?: string;
  campus_code?: string;
}

export interface AcademicEvent {
  content: string;
  contentSnippet: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
}
