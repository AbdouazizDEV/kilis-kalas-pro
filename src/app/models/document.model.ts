export type DocumentType =
  | 'national_id_front'
  | 'national_id_back'
  | 'license_front'
  | 'license_back'
  | 'insurance'
  | 'profile_photo';

export interface DocumentUpload {
  type: DocumentType;
  fileName: string;
  mimeType: string;
  dataUrl: string;
  uploadedAt: string;
}
