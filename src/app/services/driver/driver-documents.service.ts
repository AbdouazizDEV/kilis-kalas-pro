import { Injectable } from '@angular/core';
import { DriverDocumentItem } from '../../models/driver-document.model';

const DOCUMENT_ITEMS: DriverDocumentItem[] = [
  {
    id: 'transport',
    labelKey: 'DRIVER.DOCUMENTS.TRANSPORT',
    route: '/driver-registration/transport-mode',
  },
  {
    id: 'national_id',
    labelKey: 'DRIVER.DOCUMENTS.NATIONAL_ID',
    route: '/driver-registration/national-id-photo',
  },
  {
    id: 'license',
    labelKey: 'DRIVER.DOCUMENTS.LICENSE',
    route: '/driver-registration/license-photo',
  },
  {
    id: 'vehicle',
    labelKey: 'DRIVER.DOCUMENTS.VEHICLE',
    route: '/driver-registration/vehicle-info',
  },
  {
    id: 'insurance',
    labelKey: 'DRIVER.DOCUMENTS.INSURANCE',
    route: '/driver-registration/insurance-photo',
  },
];

@Injectable({ providedIn: 'root' })
export class DriverDocumentsService {
  getItems(): DriverDocumentItem[] {
    return DOCUMENT_ITEMS;
  }
}
