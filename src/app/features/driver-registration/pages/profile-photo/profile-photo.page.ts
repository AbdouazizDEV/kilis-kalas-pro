import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { IonContent } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppBackButtonComponent } from '../../../../shared/ui-kit/app-back-button/app-back-button.component';
import { AppPillButtonComponent } from '../../../../shared/ui-kit/app-pill-button/app-pill-button.component';
import { AppRegistrationProgressComponent } from '../../../../shared/ui-kit/app-registration-progress/app-registration-progress.component';
import { DriverRegistrationStateService } from '../../services/driver-registration-state.service';

@Component({
  selector: 'app-profile-photo',
  standalone: true,
  imports: [
    IonContent,
    TranslatePipe,
    AppBackButtonComponent,
    AppPillButtonComponent,
    AppRegistrationProgressComponent,
  ],
  templateUrl: './profile-photo.page.html',
  styleUrls: ['./profile-photo.page.scss'],
})
export class ProfilePhotoPage {
  private readonly router = inject(Router);
  readonly registrationState = inject(DriverRegistrationStateService);

  @ViewChild('fileInput') fileInputRef?: ElementRef<HTMLInputElement>;

  readonly registrationStep = 1;
  readonly totalSteps = 5;

  get photoUrl(): string {
    return this.registrationState.draft$().profilePhoto?.dataUrl ?? '';
  }

  get hasPhoto(): boolean {
    return this.registrationState.isProfilePhotoComplete();
  }

  async takePhoto(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      try {
        const photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Prompt,
        });

        if (photo.dataUrl) {
          this.savePhoto(photo.dataUrl, 'profile-photo.jpg', 'image/jpeg');
        }
        return;
      } catch {
        // Fallback vers input fichier sur refus caméra
      }
    }

    this.fileInputRef?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.savePhoto(reader.result as string, file.name, file.type);
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  continue(): void {
    if (!this.hasPhoto) {
      return;
    }
    this.router.navigate(['/driver-registration/national-id-photo']);
  }

  private savePhoto(dataUrl: string, fileName: string, mimeType: string): void {
    this.registrationState.setDocument({
      type: 'profile_photo',
      fileName,
      mimeType,
      dataUrl,
      uploadedAt: new Date().toISOString(),
    });
  }
}
