import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pause, play } from 'ionicons/icons';
import { ChatMessage } from '../../../models/chat-message.model';

@Component({
  selector: 'app-chat-message-item',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonText, IonButton, IonIcon, IonImg],
  templateUrl: './app-chat-message-item.component.html',
  styleUrls: ['./app-chat-message-item.component.scss'],
})
export class AppChatMessageItemComponent {
  @Input({ required: true }) message!: ChatMessage;

  readonly isPlaying = signal(false);

  private audio?: HTMLAudioElement;

  constructor() {
    addIcons({ play, pause });
  }

  get waveformBars(): number[] {
    const seed = this.message.id.length;
    return Array.from({ length: 18 }, (_, index) => 30 + ((seed + index * 7) % 55));
  }

  get formattedDuration(): string {
    const total = this.message.audioDurationSec ?? 0;
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  toggleAudio(): void {
    if (!this.message.audioUrl) {
      return;
    }

    if (!this.audio) {
      this.audio = new Audio(this.message.audioUrl);
      this.audio.onended = () => this.isPlaying.set(false);
    }

    if (this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
      return;
    }

    void this.audio.play();
    this.isPlaying.set(true);
  }
}
