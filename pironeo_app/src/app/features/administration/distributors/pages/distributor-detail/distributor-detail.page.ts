import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  IonContent,
  IonIcon,
  IonSpinner
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  businessOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  createOutline,
  cubeOutline,
  documentTextOutline
} from 'ionicons/icons';

import { Distributor } from '../../models/distributor.model';
import { DistributorService } from '../../services/distributor.service';

@Component({
  selector: 'app-distributor-detail',
  standalone: true,
  templateUrl: './distributor-detail.page.html',
  styleUrls: ['./distributor-detail.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class DistributorDetailPage implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly distributorService = inject(DistributorService);

  readonly distributor = signal<Distributor | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor() {

    addIcons({
      arrowBackOutline,
      businessOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      createOutline,
      cubeOutline,
      documentTextOutline
    });

  }

  ngOnInit(): void {

    const updatedDistributor =
      this.router.getCurrentNavigation()?.extras.state?.['distributor'] as Distributor | undefined;

    if (updatedDistributor) {
      this.distributor.set(updatedDistributor);
      this.loading.set(false);
    }

    this.refreshDistributor(
      !updatedDistributor
    );

  }

  ionViewWillEnter(): void {
    this.refreshDistributor(false);
  }

  edit(): void {

    const currentDistributor =
      this.distributor();

    if (!currentDistributor) {
      return;
    }

    this.router.navigate(
      [
        '/administration/distributors',
        currentDistributor.id,
        'edit'
      ]
    );

  }

  goBack(): void {

    this.router.navigateByUrl(
      '/administration/distributors',
      {
        replaceUrl: true
      }
    );

  }

  private refreshDistributor(showLoading: boolean): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {

      this.error.set(
        'Distribuidor no valido.'
      );

      this.loading.set(false);

      return;
    }

    this.loadDistributor(
      id,
      showLoading
    );

  }

  private loadDistributor(
    id: number,
    showLoading = true
  ): void {

    if (showLoading) {
      this.loading.set(true);
    }

    this.error.set('');

    this.distributorService
      .getById(id)
      .subscribe({

        next: response => {

          this.distributor.set(
            response.data
          );

          this.loading.set(false);

        },

        error: error => {

          console.error(
            'Error cargando distribuidor',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudo cargar el distribuidor.'
          );

          this.loading.set(false);

        }

      });

  }

}
