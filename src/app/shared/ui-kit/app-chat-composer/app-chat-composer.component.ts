import { Component, EventEmitter, Input, OnDestroy, Output, signal } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  attachOutline,
  closeOutline,
  happyOutline,
  imageOutline,
  micOutline,
  sendOutline,
  stopCircleOutline,
} from 'ionicons/icons';
import { CHAT_EMOJIS } from '../../../models/chat-message.model';

export interface ChatAudioPayload {
  audioUrl: string;
  durationSec: number;
}

@Component({
  selector: 'app-chat-composer',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonButton, IonIcon, IonInput, IonText, TranslatePipe],
  templateUrl: './app-chat-composer.component.html',
  styleUrls: ['./app-chat-composer.component.scss'],
})
export class AppChatComposerComponent implements OnDestroy {
  @Input() draft = '';
  @Output() draftChange = new EventEmitter<string>();
  @Output() sendText = new EventEmitter<string>();
  @Output() sendImage = new EventEmitter<string>();
  @Output() sendAudio = new EventEmitter<ChatAudioPayload>();

  readonly emojis = CHAT_EMOJIS;
  readonly showEmojiPanel = signal(false);
  readonly showAttachPanel = signal(false);
  readonly isRecording = signal(false);
  readonly recordingSeconds = signal(0);

  private mediaRecorder?: MediaRecorder;
  private recordingChunks: Blob[] = [];
  private recordingTimer?: ReturnType<typeof setInterval>;

  constructor() {
    addIcons({
      attachOutline,
      closeOutline,
      happyOutline,
      imageOutline,
      micOutline,
      sendOutline,
      stopCircleOutline,
    });
  }

  ngOnDestroy(): void {
    this.stopRecordingTimer();
    this.mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
  }

  get canSendText(): boolean {
    return this.draft.trim().length > 0;
  }

  onDraftInput(event: CustomEvent): void {
    const value = (event.detail.value as string | null) ?? '';
    this.draftChange.emit(value);
  }

  toggleEmojiPanel(): void {
    this.showAttachPanel.set(false);
    this.showEmojiPanel.update((value) => !value);
  }

  toggleAttachPanel(): void {
    this.showEmojiPanel.set(false);
    this.showAttachPanel.update((value) => !value);
  }

  appendEmoji(emoji: string): void {
    this.draftChange.emit(`${this.draft}${emoji}`);
  }

  submitText(): void {
    const text = this.draft.trim();
    if (!text) {
      return;
    }

    this.sendText.emit(text);
    this.draftChange.emit('');
    this.showEmojiPanel.set(false);
  }

  async pickPhotoFromCamera(): Promise<void> {
    this.showAttachPanel.set(false);

    try {
      const photo = await Camera.getPhoto({
        quality: 85,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });

      if (photo.dataUrl) {
        this.sendImage.emit(photo.dataUrl);
      }
    } catch {
      // L'utilisateur a annulé la sélection.
    }
  }

  async toggleRecording(): Promise<void> {
    if (this.isRecording()) {
      this.stopRecording(true);
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      this.sendMockAudio();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recordingChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordingChunks.push(event.data);
        }
      };
      this.mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        if (this.recordingChunks.length) {
          const blob = new Blob(this.recordingChunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(blob);
          this.sendAudio.emit({
            audioUrl,
            durationSec: Math.max(this.recordingSeconds(), 1),
          });
        }
        this.recordingChunks = [];
      };

      this.mediaRecorder.start();
      this.isRecording.set(true);
      this.recordingSeconds.set(0);
      this.showEmojiPanel.set(false);
      this.showAttachPanel.set(false);
      this.recordingTimer = setInterval(() => {
        this.recordingSeconds.update((value) => value + 1);
      }, 1000);
    } catch {
      this.sendMockAudio();
    }
  }

  cancelRecording(): void {
    this.stopRecording(false);
  }

  private stopRecording(shouldSend: boolean): void {
    this.stopRecordingTimer();
    if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
      this.isRecording.set(false);
      return;
    }

    if (!shouldSend) {
      this.recordingChunks = [];
      this.mediaRecorder.onstop = () => {
        this.mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
      };
    }

    this.mediaRecorder.stop();
    this.isRecording.set(false);
  }

  private stopRecordingTimer(): void {
    if (this.recordingTimer) {
      clearInterval(this.recordingTimer);
      this.recordingTimer = undefined;
    }
  }

  private sendMockAudio(): void {
    this.sendAudio.emit({
      audioUrl: '',
      durationSec: 8,
    });
  }
}
