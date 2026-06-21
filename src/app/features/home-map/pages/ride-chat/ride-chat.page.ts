import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { arrowBackOutline, callOutline } from 'ionicons/icons';
import { AppChatComposerComponent, ChatAudioPayload } from '../../../../shared/ui-kit/app-chat-composer/app-chat-composer.component';
import { AppChatMessageItemComponent } from '../../../../shared/ui-kit/app-chat-message-item/app-chat-message-item.component';
import { AppCircleIconButtonComponent } from '../../../../shared/ui-kit/app-circle-icon-button/app-circle-icon-button.component';
import { PhoneCallService } from '../../../../services/phone/phone-call.service';
import { ChatMessage } from '../../../../models/chat-message.model';

@Component({
  selector: 'app-ride-chat',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonText,
    TranslatePipe,
    AppCircleIconButtonComponent,
    AppChatMessageItemComponent,
    AppChatComposerComponent,
  ],
  templateUrl: './ride-chat.page.html',
  styleUrls: ['./ride-chat.page.scss'],
})
export class RideChatPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly phoneCallService = inject(PhoneCallService);

  @ViewChild(IonContent) content?: IonContent;

  readonly contactName = signal('Client');
  readonly contactPhone = signal('');
  readonly draft = signal('');
  readonly messages = signal<ChatMessage[]>([]);

  constructor() {
    addIcons({ arrowBackOutline, callOutline });
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    this.contactName.set(params.get('name') ?? 'Client');
    this.contactPhone.set(params.get('phone') ?? '');
    this.messages.set(this.buildInitialMessages());
  }

  goBack(): void {
    void this.router.navigateByUrl('/driver/home');
  }

  callContact(): void {
    const phone = this.contactPhone();
    if (phone) {
      this.phoneCallService.call(phone);
    }
  }

  onDraftChange(value: string): void {
    this.draft.set(value);
  }

  onSendText(text: string): void {
    this.appendMessage({
      type: 'text',
      text,
    });
  }

  onSendImage(imageUrl: string): void {
    this.appendMessage({
      type: 'image',
      imageUrl,
      text: 'Photo',
    });
  }

  onSendAudio(payload: ChatAudioPayload): void {
    this.appendMessage({
      type: 'audio',
      audioUrl: payload.audioUrl,
      audioDurationSec: payload.durationSec,
    });
  }

  private appendMessage(partial: Omit<ChatMessage, 'id' | 'sent' | 'time'>): void {
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    this.messages.update((current) => [
      ...current,
      {
        id: `msg-${Date.now()}`,
        sent: true,
        time,
        ...partial,
      },
    ]);
    void this.scrollToBottom();
  }

  private async scrollToBottom(): Promise<void> {
    await this.content?.scrollToBottom(250);
  }

  private buildInitialMessages(): ChatMessage[] {
    const name = this.contactName().split(' ')[0] ?? 'Client';
    return [
      { id: '1', type: 'text', text: `Bonjour ${name}`, sent: true, time: '11:05' },
      { id: '2', type: 'text', text: 'Je suis en route vers vous.', sent: true, time: '11:05' },
      { id: '3', type: 'text', text: 'D\'accord, merci.', sent: false, time: '11:05' },
      { id: '4', type: 'audio', sent: false, time: '11:06', audioUrl: '', audioDurationSec: 12 },
    ];
  }
}
