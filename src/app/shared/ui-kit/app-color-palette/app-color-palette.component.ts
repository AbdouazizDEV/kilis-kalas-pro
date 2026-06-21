import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ColorPaletteOption {
  id: string;
  hex: string;
  label: string;
}

@Component({
  selector: 'app-color-palette',
  standalone: true,
  templateUrl: './app-color-palette.component.html',
  styleUrls: ['./app-color-palette.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppColorPaletteComponent),
      multi: true,
    },
  ],
})
export class AppColorPaletteComponent implements ControlValueAccessor {
  @Input() colors: ColorPaletteOption[] = [];
  @Input() label = '';

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
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

  selectColor(colorId: string): void {
    if (this.disabled) {
      return;
    }
    this.value = colorId;
    this.onChange(colorId);
    this.onTouched();
  }

  isSelected(colorId: string): boolean {
    return this.value === colorId;
  }

  isLight(hex: string): boolean {
    const normalized = hex.replace('#', '');
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 186;
  }
}
