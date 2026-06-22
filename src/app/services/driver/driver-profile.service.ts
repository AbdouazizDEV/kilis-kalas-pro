import { Injectable, inject } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { DocumentUpload } from '../../models/document.model';
import { DriverRegistrationStateService } from '../../features/driver-registration/services/driver-registration-state.service';

@Injectable({ providedIn: 'root' })
export class DriverProfileService {
  private readonly registrationState = inject(DriverRegistrationStateService);

  readonly draft$ = this.registrationState.draft$;

  get fullName(): string {
    const draft = this.registrationState.draft$();
    return [draft.firstName, draft.lastName].filter(Boolean).join(' ') || 'Chauffeur';
  }

  get photoUrl(): string {
    return this.registrationState.draft$().profilePhoto?.dataUrl ?? '';
  }

  updateProfile(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): void {
    this.registrationState.updateAccount(data);
  }

  async pickProfilePhoto(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      try {
        const photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Prompt,
        });

        if (photo.dataUrl) {
          this.savePhoto(photo.dataUrl);
        }
        return;
      } catch {
        return;
      }
    }

    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });

      if (photo.dataUrl) {
        this.savePhoto(photo.dataUrl);
      }
    } catch {
      // Annulé par l'utilisateur
    }
  }

  parseNationalPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('221')) {
      return this.formatNationalPhone(digits.slice(3));
    }
    return this.formatNationalPhone(digits);
  }

  buildFullPhone(nationalPhone: string): string {
    const digits = nationalPhone.replace(/\D/g, '');
    return `+221 ${this.formatNationalPhone(digits)}`;
  }

  private formatNationalPhone(digits: string): string {
    const trimmed = digits.slice(0, 9);
    if (trimmed.length <= 2) {
      return trimmed;
    }
    if (trimmed.length <= 5) {
      return `${trimmed.slice(0, 2)} ${trimmed.slice(2)}`;
    }
    if (trimmed.length <= 7) {
      return `${trimmed.slice(0, 2)} ${trimmed.slice(2, 5)} ${trimmed.slice(5)}`;
    }
    return `${trimmed.slice(0, 2)} ${trimmed.slice(2, 5)} ${trimmed.slice(5, 7)} ${trimmed.slice(7)}`;
  }

  private savePhoto(dataUrl: string): void {
    const doc: DocumentUpload = {
      type: 'profile_photo',
      fileName: 'profile-photo.jpg',
      mimeType: 'image/jpeg',
      dataUrl,
      uploadedAt: new Date().toISOString(),
    };
    this.registrationState.setDocument(doc);
  }
}
