import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-circle-icon-button',
  standalone: true,
  imports: [IonButton, IonIcon, IonImg],
  templateUrl: './app-circle-icon-button.component.html',
  styleUrls: ['./app-circle-icon-button.component.scss'],
})
export class AppCircleIconButtonComponent {
  @Input() icon = 'menu-outline';
  @Input() imageSrc = '';
  @Input() ariaLabel = '';
  @Input() dark = false;
  @Input() outlined = false;
  @Input() variant: 'default' | 'green' = 'default';

  @Output() buttonClick = new EventEmitter<void>();

  onClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.buttonClick.emit();
  }
}
