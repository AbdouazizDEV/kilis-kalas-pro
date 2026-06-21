import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonLabel, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-driver-go-button',
  standalone: true,
  imports: [IonButton, IonLabel, IonText],
  templateUrl: './app-driver-go-button.component.html',
  styleUrls: ['./app-driver-go-button.component.scss'],
})
export class AppDriverGoButtonComponent {
  @Input() label = 'GO';
  @Input() disabled = false;

  @Output() goClick = new EventEmitter<void>();

  onClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this.goClick.emit();
    }
  }
}
