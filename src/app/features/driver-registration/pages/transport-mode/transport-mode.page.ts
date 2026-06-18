import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonText } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { bicycleOutline, carOutline, busOutline } from 'ionicons/icons';
import { AppBackButtonComponent } from '../../../../shared/ui-kit/app-back-button/app-back-button.component';
import { AppButtonComponent } from '../../../../shared/ui-kit/app-button/app-button.component';
import { TransportMode } from '../../../../models/vehicle.model';
import { DriverRegistrationStateService } from '../../services/driver-registration-state.service';

interface TransportOption {
  mode: TransportMode;
  icon: string;
  labelKey: string;
  descriptionKey: string;
}

@Component({
  selector: 'app-transport-mode',
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonText,
    TranslatePipe,
    AppBackButtonComponent,
    AppButtonComponent,
  ],
  templateUrl: './transport-mode.page.html',
  styleUrls: ['./transport-mode.page.scss'],
})
export class TransportModePage {
  private readonly router = inject(Router);
  private readonly registrationState = inject(DriverRegistrationStateService);

  readonly options: TransportOption[] = [
    { mode: 'moto', icon: 'bicycle-outline', labelKey: 'DRIVER.TRANSPORT.MOTO', descriptionKey: 'DRIVER.TRANSPORT.MOTO_DESC' },
    { mode: 'taxi', icon: 'car-outline', labelKey: 'DRIVER.TRANSPORT.TAXI', descriptionKey: 'DRIVER.TRANSPORT.TAXI_DESC' },
    { mode: 'clando', icon: 'bus-outline', labelKey: 'DRIVER.TRANSPORT.CLANDO', descriptionKey: 'DRIVER.TRANSPORT.CLANDO_DESC' },
  ];

  selectedMode: TransportMode | null = this.registrationState.draft$().transportMode;

  constructor() {
    addIcons({ bicycleOutline, carOutline, busOutline });
  }

  selectMode(mode: TransportMode): void {
    this.selectedMode = mode;
    this.registrationState.setTransportMode(mode);
  }

  continue(): void {
    if (!this.selectedMode) {
      return;
    }
    this.router.navigate(['/driver-registration/documents']);
  }
}
