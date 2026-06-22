import { Injectable } from '@angular/core';
import { HelpContactItem, HelpFaqItem } from '../../models/driver-help.model';

const FAQ_ITEMS: HelpFaqItem[] = [
  {
    id: 'order',
    questionKey: 'DRIVER.HELP.FAQ_ORDER_QUESTION',
    answerKey: 'DRIVER.HELP.FAQ_ORDER_ANSWER',
  },
  {
    id: 'payment',
    questionKey: 'DRIVER.HELP.FAQ_PAYMENT_QUESTION',
    answerKey: 'DRIVER.HELP.FAQ_PAYMENT_ANSWER',
  },
  {
    id: 'documents',
    questionKey: 'DRIVER.HELP.FAQ_DOCUMENTS_QUESTION',
    answerKey: 'DRIVER.HELP.FAQ_DOCUMENTS_ANSWER',
  },
];

const CONTACT_ITEMS: HelpContactItem[] = [
  {
    id: 'phone',
    labelKey: 'DRIVER.HELP.CONTACT_PHONE',
    value: '+221 33 000 00 00',
    action: 'tel',
  },
  {
    id: 'email',
    labelKey: 'DRIVER.HELP.CONTACT_EMAIL',
    value: 'support@kiliskalas.sn',
    action: 'mailto',
  },
];

@Injectable({ providedIn: 'root' })
export class DriverHelpService {
  getFaqItems(): HelpFaqItem[] {
    return FAQ_ITEMS;
  }

  getContactItems(): HelpContactItem[] {
    return CONTACT_ITEMS;
  }
}
