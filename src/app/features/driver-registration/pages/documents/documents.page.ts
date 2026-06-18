import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonText } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppBackButtonComponent } from '../../../../shared/ui-kit/app-back-button/app-back-button.component';
import { AppButtonComponent } from '../../../../shared/ui-kit/app-button/app-button.component';
import { AppDocumentUploadComponent } from '../../../../shared/ui-kit/app-document-upload/app-document-upload.component';
import { DocumentType } from '../../../../models/document.model';
import { DriverRegistrationStateService } from '../../services/driver-registration-state.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    IonContent,
    IonText,
    TranslatePipe,
    AppBackButtonComponent,
    AppButtonComponent,
    AppDocumentUploadComponent,
  ],
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage {
  private readonly router = inject(Router);
  readonly registrationState = inject(DriverRegistrationStateService);

  onFileSelected(event: { type: DocumentType; file: File; dataUrl: string }): void {
    this.registrationState.setDocument({
      type: event.type,
      fileName: event.file.name,
      mimeType: event.file.type,
      dataUrl: event.dataUrl,
      uploadedAt: new Date().toISOString(),
    });
  }

  continue(): void {
    if (!this.registrationState.areDocumentsComplete()) {
      return;
    }
    this.router.navigate(['/driver-registration/vehicle-info']);
  }
}
