import { Component, Input, signal } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-faq-accordion-item',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonText, IonButton, IonIcon, TranslatePipe],
  templateUrl: './app-faq-accordion-item.component.html',
  styleUrls: ['./app-faq-accordion-item.component.scss'],
})
export class AppFaqAccordionItemComponent {
  @Input() questionKey = '';
  @Input() answerKey = '';

  readonly expanded = signal(false);

  constructor() {
    addIcons({ chevronDownOutline });
  }

  toggle(): void {
    this.expanded.update((value) => !value);
  }
}
