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
  checkmarkCircleOutline,
  closeCircleOutline,
  createOutline,
  keyOutline,
  walletOutline
} from 'ionicons/icons';

import { CashRegister } from '../../models/cash-register.model';
import { CashRegisterService } from '../../services/cash-register.service';

@Component({
  selector: 'app-cash-register-detail',
  standalone: true,
  templateUrl: './cash-register-detail.page.html',
  styleUrls: ['./cash-register-detail.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class CashRegisterDetailPage implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cashRegisterService = inject(CashRegisterService);

  readonly cashRegister = signal<CashRegister | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor() {

    addIcons({
      arrowBackOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      createOutline,
      keyOutline,
      walletOutline
    });

  }

  ngOnInit(): void {

    const updatedCashRegister =
      this.router.getCurrentNavigation()?.extras.state?.['cashRegister'] as CashRegister | undefined;

    if (updatedCashRegister) {
      this.cashRegister.set(updatedCashRegister);
      this.loading.set(false);
    }

    this.refreshCashRegister(
      !updatedCashRegister
    );

  }

  ionViewWillEnter(): void {
    this.refreshCashRegister(false);
  }

  edit(): void {

    const currentCashRegister =
      this.cashRegister();

    if (!currentCashRegister) {
      return;
    }

    this.router.navigate(
      [
        '/administration/cash-registers',
        currentCashRegister.id,
        'edit'
      ]
    );

  }

  goBack(): void {

    this.router.navigateByUrl(
      '/administration/cash-registers',
      {
        replaceUrl: true
      }
    );

  }

  private refreshCashRegister(showLoading: boolean): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {

      this.error.set(
        'Caja no valida.'
      );

      this.loading.set(false);

      return;
    }

    this.loadCashRegister(
      id,
      showLoading
    );

  }

  private loadCashRegister(
    id: number,
    showLoading = true
  ): void {

    if (showLoading) {
      this.loading.set(true);
    }

    this.error.set('');

    this.cashRegisterService
      .getById(id)
      .subscribe({

        next: response => {

          this.cashRegister.set(
            response.data
          );

          this.loading.set(false);

        },

        error: error => {

          console.error(
            'Error cargando caja',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudo cargar la caja.'
          );

          this.loading.set(false);

        }

      });

  }

}
