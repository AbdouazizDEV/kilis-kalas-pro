import { Component, inject, signal } from '@angular/core';
import { IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonRow } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { HelpTab } from '../../../../models/driver-help.model';
import { DriverHelpService } from '../../../../services/driver/driver-help.service';
import { AppDriverSubpageHeaderComponent } from '../../../../shared/ui-kit/app-driver-subpage-header/app-driver-subpage-header.component';
import { AppFaqAccordionItemComponent } from '../../../../shared/ui-kit/app-faq-accordion-item/app-faq-accordion-item.component';
import { AppHelpTabsComponent, HelpTabOption } from '../../../../shared/ui-kit/app-help-tabs/app-help-tabs.component';

@Component({
  selector: 'app-driver-help',
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    TranslatePipe,
    AppDriverSubpageHeaderComponent,
    AppHelpTabsComponent,
    AppFaqAccordionItemComponent,
  ],
  templateUrl: './driver-help.page.html',
  styleUrls: ['./driver-help.page.scss'],
})
export class DriverHelpPage {
  private readonly helpService = inject(DriverHelpService);

  readonly tabOptions: HelpTabOption[] = [
    { id: 'faq', labelKey: 'DRIVER.HELP.TAB_FAQ' },
    { id: 'contact', labelKey: 'DRIVER.HELP.TAB_CONTACT' },
  ];

  readonly selectedTab = signal<HelpTab>('faq');
  readonly faqItems = this.helpService.getFaqItems();
  readonly contactItems = this.helpService.getContactItems();

  onTabChange(tabId: string): void {
    this.selectedTab.set(tabId as HelpTab);
  }

  openContact(action: 'tel' | 'mailto', value: string): void {
    const href = action === 'tel' ? `tel:${value.replace(/\s/g, '')}` : `mailto:${value}`;
    window.open(href, '_system');
  }
}
