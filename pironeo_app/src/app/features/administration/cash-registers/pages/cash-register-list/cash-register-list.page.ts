import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import {
  IonContent,
  IonIcon,
  IonSpinner
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  addOutline,
  arrowBackOutline,
  chevronForwardOutline,
  refreshOutline,
  walletOutline,
  warningOutline
} from 'ionicons/icons';

import { CashRegisterService } from '../../services/cash-register.service';
import { CashRegister } from '../../models/cash-register.model';

@Component({
  selector: 'app-cash-register-list',
  standalone: true,
  templateUrl: './cash-register-list.page.html',
  styleUrls: ['./cash-register-list.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class CashRegisterListPage implements OnInit {

  private readonly router = inject(Router);
  private readonly cashRegisterService = inject(CashRegisterService);

  readonly cashRegisters = signal<CashRegister[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor() {

    addIcons({
      addOutline,
      arrowBackOutline,
      chevronForwardOutline,
      refreshOutline,
      walletOutline,
      warningOutline
    });

  }

  ngOnInit(): void {
    this.loadCashRegisters();
  }

  ionViewWillEnter(): void {
    this.loadCashRegisters(false);
  }

  loadCashRegisters(
    showLoading = true
  ): void {

    if (showLoading) {
      this.loading.set(true);
    }

    this.error.set('');

    this.cashRegisterService
      .getAll()
      .subscribe({

        next: response => {

          this.cashRegisters.set(
            response.data ?? []
          );

          this.loading.set(false);

        },

        error: error => {

          console.error(
            'Error cargando cajas',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudieron cargar las cajas.'
          );

          this.loading.set(false);

        }

      });

  }

  viewCashRegister(
    cashRegister: CashRegister
  ): void {

    this.router.navigate(
      [
        '/administration/cash-registers',
        cashRegister.id
      ]
    );

  }

  createCashRegister(): void {

    this.router.navigateByUrl(
      '/administration/cash-registers/new'
    );

  }

  goBack(): void {

    this.router.navigateByUrl(
      '/administration',
      {
        replaceUrl: true
      }
    );

  }

}
