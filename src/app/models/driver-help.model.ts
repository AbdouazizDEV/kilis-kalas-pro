export type HelpTab = 'faq' | 'contact';

export interface HelpFaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export interface HelpContactItem {
  id: string;
  labelKey: string;
  value: string;
  action: 'tel' | 'mailto';
}
