import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonFooter, IonGrid, IonLabel, IonRow, IonText, IonToast, IonToolbar } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppDriverProfileHeroComponent } from '../../../../shared/ui-kit/app-driver-profile-hero/app-driver-profile-hero.component';
import { AppInputComponent } from '../../../../shared/ui-kit/app-input/app-input.component';
import { AppPhoneInputComponent } from '../../../../shared/ui-kit/app-phone-input/app-phone-input.component';
import { AppPillButtonComponent } from '../../../../shared/ui-kit/app-pill-button/app-pill-button.component';
import { DriverProfileService } from '../../../../services/driver/driver-profile.service';

@Component({
  selector: 'app-driver-profile',
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonLabel,
    IonFooter,
    IonToolbar,
    IonToast,
    ReactiveFormsModule,
    TranslatePipe,
    AppDriverProfileHeroComponent,
    AppInputComponent,
    AppPhoneInputComponent,
    AppPillButtonComponent,
  ],
  templateUrl: './driver-profile.page.html',
  styleUrls: ['./driver-profile.page.scss'],
})
export class DriverProfilePage {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly profileService = inject(DriverProfileService);

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(9)]],
  });

  savedToastOpen = false;

  readonly photoUrl = computed(
    () => this.profileService.draft$().profilePhoto?.dataUrl ?? '',
  );

  constructor() {
    this.loadProfile();
  }

  get fullName(): string {
    const { firstName, lastName } = this.form.getRawValue();
    return [firstName, lastName].filter(Boolean).join(' ') || this.profileService.fullName;
  }

  goBack(): void {
    void this.router.navigateByUrl('/driver/home');
  }

  async editPhoto(): Promise<void> {
    await this.profileService.pickProfilePhoto();
  }

  saveProfile(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, phone } = this.form.getRawValue();
    this.profileService.updateProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: this.profileService.buildFullPhone(phone),
    });
    this.savedToastOpen = true;
  }

  private loadProfile(): void {
    const draft = this.profileService.draft$();
    this.form.patchValue({
      firstName: draft.firstName,
      lastName: draft.lastName,
      email: draft.email,
      phone: this.profileService.parseNationalPhone(draft.phone),
    });
  }
}
