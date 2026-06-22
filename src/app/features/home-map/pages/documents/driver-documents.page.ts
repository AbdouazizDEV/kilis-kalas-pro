import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonCol, IonContent, IonGrid, IonList, IonRow } from '@ionic/angular/standalone';
import { DriverDocumentsService } from '../../../../services/driver/driver-documents.service';
import { AppDocumentListItemComponent } from '../../../../shared/ui-kit/app-document-list-item/app-document-list-item.component';
import { AppDriverSubpageHeaderComponent } from '../../../../shared/ui-kit/app-driver-subpage-header/app-driver-subpage-header.component';

@Component({
  selector: 'app-driver-documents',
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    AppDriverSubpageHeaderComponent,
    AppDocumentListItemComponent,
  ],
  templateUrl: './driver-documents.page.html',
  styleUrls: ['./driver-documents.page.scss'],
})
export class DriverDocumentsPage {
  private readonly router = inject(Router);
  private readonly documentsService = inject(DriverDocumentsService);

  readonly items = this.documentsService.getItems();

  onItemClick(route: string): void {
    void this.router.navigateByUrl(route);
  }
}
