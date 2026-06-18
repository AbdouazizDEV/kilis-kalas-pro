import { InjectionToken } from '@angular/core';
import { IDriverStatusService } from '../interfaces/i-driver-status.service';

export const DRIVER_STATUS_SERVICE = new InjectionToken<IDriverStatusService>('DRIVER_STATUS_SERVICE');
