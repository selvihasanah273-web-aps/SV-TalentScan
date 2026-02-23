
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface CareerPlan {
  id: string;
  title: string;
  steps: string[];
  competencies: string[];
  timeline: string;
}

export interface AssessmentResult {
  strength: string[];
  weakness: string[];
  recommendation: string;
}

export enum AppView {
  CHAT = 'chat',
  ASSESSMENT = 'assessment',
  MBTI_TEST = 'mbti_test',
  LEARNING_BOOK = 'learning_book'
}
