export interface Question {
  type: 'mcq' | 'boolean';
  question: string;
  question_en?: string;
  question_fr?: string;
  options?: string[]; // Only for MCQ
  options_en?: string[];
  options_fr?: string[];
  correctAnswer?: number | boolean; // index for MCQ, boolean for boolean
  answer?: number | boolean; // alternate field name used by some entries
}

export interface Story {
  id: number;
  category: string;
  title: string;
  title_en?: string;
  title_fr?: string;
  content: string;
  content_en?: string;
  content_fr?: string;
  hadith: {
    text: string;
    source: string;
    reference: string;
  };
  values: string[];
  values_en?: string[];
  values_fr?: string[];
  videos?: {
    ar?: {
      url: string;
      title: string;
      duration?: string;
    };
    en?: {
      url: string;
      title: string;
      duration?: string;
    };
    fr?: {
      url: string;
      title: string;
      duration?: string;
    };
  };
  questions: Question[];
  sources?: Array<{
    title: string;
    author?: string;
    volume?: string;
    page?: string;
    ref?: string;
  }>;
}

export interface AppData {
  app_info: {
    name: string;
    version: string;
    description: string;
    languages: string[];
  };
  stories: Story[];
}
