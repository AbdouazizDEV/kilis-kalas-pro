import { Component, Input } from '@angular/core';
import { IonAvatar, IonIcon, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [IonAvatar, IonImg, IonIcon],
  templateUrl: './app-avatar.component.html',
  styleUrls: ['./app-avatar.component.scss'],
})
export class AppAvatarComponent {
  @Input() src = '';
  @Input() alt = 'Avatar';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  constructor() {
    addIcons({ personOutline });
  }
}
