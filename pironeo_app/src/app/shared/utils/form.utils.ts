import { AbstractControl, FormGroup } from '@angular/forms';

export function markFormGroupTouched(form: FormGroup): void {
  Object.values(form.controls).forEach((control: AbstractControl) => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      markFormGroupTouched(control);
    }
  });
}
