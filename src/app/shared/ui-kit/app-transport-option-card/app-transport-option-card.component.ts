import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { TransportMode } from '../../../models/vehicle.model';

@Component({
  selector: 'app-transport-option-card',
  standalone: true,
  imports: [IonButton, IonGrid, IonRow, IonCol, IonImg, IonText, TranslatePipe],
  templateUrl: './app-transport-option-card.component.html',
  styleUrls: ['./app-transport-option-card.component.scss'],
})
export class AppTransportOptionCardComponent {
  @Input({ required: true }) mode!: TransportMode;
  @Input({ required: true }) iconSrc!: string;
  @Input({ required: true }) labelKey!: string;
  @Input({ required: true }) brandLine1Key!: string;
  @Input({ required: true }) brandLine2Key!: string;
  @Input() flipIcon = false;
  @Input() selected = false;

  @Output() selectedChange = new EventEmitter<TransportMode>();

  onSelect(): void {
    this.selectedChange.emit(this.mode);
  }
}
