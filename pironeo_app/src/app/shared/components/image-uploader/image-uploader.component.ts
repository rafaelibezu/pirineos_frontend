import { Component, output } from '@angular/core';
import { IonButton } from '@ionic/angular';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [IonButton],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
})
export class ImageUploaderComponent {
  readonly imageSelected = output<File>();

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.imageSelected.emit(file);
    }
  }
}
