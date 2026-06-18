import { Injectable, computed, signal } from '@angular/core';
import { DocumentUpload } from '../../../models/document.model';
import { TransportMode } from '../../../models/vehicle.model';

export interface DriverRegistrationDraft {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  transportMode: TransportMode | null;
  nationalIdFront: DocumentUpload | null;
  nationalIdBack: DocumentUpload | null;
  licenseFront: DocumentUpload | null;
  licenseBack: DocumentUpload | null;
  insuranceDocument: DocumentUpload | null;
  vehicleBrand: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleColor: string;
  vehicleYear: number | null;
  profilePhoto: DocumentUpload | null;
  driverId: string | null;
}

const INITIAL_DRAFT: DriverRegistrationDraft = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  transportMode: null,
  nationalIdFront: null,
  nationalIdBack: null,
  licenseFront: null,
  licenseBack: null,
  insuranceDocument: null,
  vehicleBrand: '',
  vehicleModel: '',
  vehiclePlate: '',
  vehicleColor: '',
  vehicleYear: null,
  profilePhoto: null,
  driverId: null,
};

@Injectable({ providedIn: 'root' })
export class DriverRegistrationStateService {
  private readonly draft = signal<DriverRegistrationDraft>({ ...INITIAL_DRAFT });

  readonly draft$ = this.draft.asReadonly();
  readonly isAccountComplete = computed(
    () =>
      !!this.draft().firstName &&
      !!this.draft().lastName &&
      !!this.draft().phone &&
      !!this.draft().password,
  );
  readonly isTransportSelected = computed(() => !!this.draft().transportMode);
  readonly areDocumentsComplete = computed(() => {
    const d = this.draft();
    return !!d.nationalIdFront && !!d.nationalIdBack && !!d.licenseFront && !!d.licenseBack;
  });
  readonly isVehicleComplete = computed(() => {
    const d = this.draft();
    return !!d.vehicleBrand && !!d.vehicleModel && !!d.vehiclePlate && !!d.vehicleColor;
  });
  readonly isProfilePhotoComplete = computed(() => !!this.draft().profilePhoto);

  updateAccount(data: Partial<DriverRegistrationDraft>): void {
    this.draft.update((current) => ({ ...current, ...data }));
  }

  setTransportMode(mode: TransportMode): void {
    this.draft.update((current) => ({ ...current, transportMode: mode }));
  }

  setDocument(doc: DocumentUpload): void {
    const keyMap: Record<string, keyof DriverRegistrationDraft> = {
      national_id_front: 'nationalIdFront',
      national_id_back: 'nationalIdBack',
      license_front: 'licenseFront',
      license_back: 'licenseBack',
      insurance: 'insuranceDocument',
      profile_photo: 'profilePhoto',
    };
    const key = keyMap[doc.type];
    if (key) {
      this.draft.update((current) => ({ ...current, [key]: doc }));
    }
  }

  setVehicleInfo(data: Partial<DriverRegistrationDraft>): void {
    this.draft.update((current) => ({ ...current, ...data }));
  }

  setDriverId(driverId: string): void {
    this.draft.update((current) => ({ ...current, driverId }));
  }

  reset(): void {
    this.draft.set({ ...INITIAL_DRAFT });
  }
}
