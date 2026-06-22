import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-document-list-item',
  standalone: true,
  imports: [IonItem, IonLabel, IonIcon, TranslatePipe],
  templateUrl: './app-document-list-item.component.html',
  styleUrls: ['./app-document-list-item.component.scss'],
})
export class AppDocumentListItemComponent {
  @Input() labelKey = '';
  @Input() showDivider = true;

  @Output() itemClick = new EventEmitter<void>();

  constructor() {
    addIcons({ chevronForwardOutline });
  }

  onClick(): void {
    this.itemClick.emit();
  }
}
