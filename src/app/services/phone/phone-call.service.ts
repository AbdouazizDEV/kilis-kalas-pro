import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PhoneCallService {
  call(phoneNumber: string): void {
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    if (!cleaned) {
      return;
    }

    window.location.href = `tel:${cleaned}`;
  }
}
