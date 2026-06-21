import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-collapsible-bottom-sheet',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonText],
  templateUrl: './app-collapsible-bottom-sheet.component.html',
  styleUrls: ['./app-collapsible-bottom-sheet.component.scss'],
})
export class AppCollapsibleBottomSheetComponent {
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  toggle(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
}
