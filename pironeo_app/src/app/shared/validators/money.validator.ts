import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function moneyValidator(min = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);

    if (Number.isNaN(value) || value < min) {
      return { money: { min } };
    }

    return null;
  };
}
