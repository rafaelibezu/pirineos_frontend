import { Component } from '@angular/core';
import { IonButton, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/angular';

import { ImageUploaderComponent } from '../../../../shared/components/image-uploader/image-uploader.component';
import { MoneyInputComponent } from '../../../../shared/components/money-input/money-input.component';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [ImageUploaderComponent, IonButton, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, MoneyInputComponent],
  templateUrl: './add-payment.page.html',
  styleUrl: './add-payment.page.scss',
})
export class AddPaymentPage {
  receipt?: File;

  setReceipt(file: File): void {
    this.receipt = file;
  }
}
