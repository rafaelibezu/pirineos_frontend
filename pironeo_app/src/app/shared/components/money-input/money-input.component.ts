import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonItem, IonLabel } from '@ionic/angular';

@Component({
  selector: 'app-money-input',
  standalone: true,
  imports: [IonInput, IonItem, IonLabel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoneyInputComponent),
      multi: true,
    },
  ],
  templateUrl: './money-input.component.html',
  styleUrl: './money-input.component.scss',
})
export class MoneyInputComponent implements ControlValueAccessor {
  readonly label = input('Importe');
  readonly placeholder = input('0.00');

  value = '';
  disabled = false;

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.value = value === null || value === undefined ? '' : String(value);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const nextValue = (event as CustomEvent).detail.value ?? '';
    this.value = nextValue;
    this.onChange(nextValue === '' ? null : Number(String(nextValue).replace(',', '.')));
  }

  handleBlur(): void {
    this.onTouched();
  }
}
