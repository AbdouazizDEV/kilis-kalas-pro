import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  IonCol,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonItem, IonInput, IonText, IonImg, IonLabel, IonNote],
  templateUrl: './app-phone-input.component.html',
  styleUrls: ['./app-phone-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppPhoneInputComponent),
      multi: true,
    },
  ],
})
export class AppPhoneInputComponent implements ControlValueAccessor {
  @Input() countryCode = '+221';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() errorMessage = '';
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  value = '';

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  onInput(event: CustomEvent): void {
    const newValue = (event.detail.value as string) ?? '';
    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
