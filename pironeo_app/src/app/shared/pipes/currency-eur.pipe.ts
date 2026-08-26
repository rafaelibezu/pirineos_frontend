import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyEur',
  standalone: true,
})
export class CurrencyEurPipe implements PipeTransform {
  private readonly currencyPipe = new CurrencyPipe('es-ES');

  transform(value: number | string | null | undefined): string {
    return this.currencyPipe.transform(value ?? 0, 'EUR', 'symbol', '1.2-2') ?? '0,00 EUR';
  }
}
