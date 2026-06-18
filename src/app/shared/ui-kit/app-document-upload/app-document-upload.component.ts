import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, cloudUploadOutline } from 'ionicons/icons';
import { DocumentType } from '../../../models/document.model';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [IonIcon, IonText],
  templateUrl: './app-document-upload.component.html',
  styleUrls: ['./app-document-upload.component.scss'],
})
export class AppDocumentUploadComponent {
  @Input() label = '';
  @Input() hint = '';
  @Input() documentType: DocumentType = 'national_id_front';
  @Input() previewUrl = '';
  @Input() accept = 'image/*';

  @Output() fileSelected = new EventEmitter<{ type: DocumentType; file: File; dataUrl: string }>();

  constructor() {
    addIcons({ cameraOutline, cloudUploadOutline });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.fileSelected.emit({
        type: this.documentType,
        file,
        dataUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
    input.value = '';
  }
}
