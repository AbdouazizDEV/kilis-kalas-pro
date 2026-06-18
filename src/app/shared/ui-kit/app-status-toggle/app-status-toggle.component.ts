import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonToggle } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-status-toggle',
  standalone: true,
  imports: [IonToggle, TranslatePipe],
  templateUrl: './app-status-toggle.component.html',
  styleUrls: ['./app-status-toggle.component.scss'],
})
export class AppStatusToggleComponent {
  @Input() available = false;
  @Input() disabled = false;

  @Output() availabilityChange = new EventEmitter<boolean>();

  onToggle(event: CustomEvent): void {
    this.availabilityChange.emit(!!event.detail.checked);
  }
}
