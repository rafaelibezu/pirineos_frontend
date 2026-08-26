import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime',
  standalone: true,
})
export class DateTimePipe implements PipeTransform {
  private readonly datePipe = new DatePipe('es-ES');

  transform(value: Date | string | number | null | undefined): string {
    return this.datePipe.transform(value, 'dd/MM/yyyy HH:mm') ?? '';
  }
}
