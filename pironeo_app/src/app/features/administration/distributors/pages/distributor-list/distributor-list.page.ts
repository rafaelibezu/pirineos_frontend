import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  computed,
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
  businessOutline,
  chevronForwardOutline,
  cubeOutline,
  refreshOutline,
  searchOutline,
  warningOutline
} from 'ionicons/icons';

import { Distributor } from '../../models/distributor.model';
import { DistributorService } from '../../services/distributor.service';

@Component({
  selector: 'app-distributor-list',
  standalone: true,
  templateUrl: './distributor-list.page.html',
  styleUrls: ['./distributor-list.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class DistributorListPage implements OnInit {

  private readonly router = inject(Router);
  private readonly distributorService = inject(DistributorService);

  readonly distributors = signal<Distributor[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly search = signal('');

  readonly filteredDistributors = computed(() => {

    const text =
      this.normalizeText(
        this.search()
      );

    if (!text) {
      return this.distributors();
    }

    return this.distributors().filter(distributor => {

      const searchableText =
        this.normalizeText(
          [
            distributor.name,
            distributor.description ?? '',
            distributor.active ? 'activo' : 'inactivo'
          ].join(' ')
        );

      return searchableText.includes(text);

    });

  });

  constructor() {

    addIcons({
      addOutline,
      arrowBackOutline,
      businessOutline,
      chevronForwardOutline,
      cubeOutline,
      refreshOutline,
      searchOutline,
      warningOutline
    });

  }

  ngOnInit(): void {
    this.loadDistributors();
  }

  ionViewWillEnter(): void {
    this.loadDistributors(false);
  }

  loadDistributors(
    showLoading = true
  ): void {

    if (showLoading) {
      this.loading.set(true);
    }

    this.error.set('');

    this.distributorService
      .getAll()
      .subscribe({

        next: response => {

          this.distributors.set(
            response.data ?? []
          );

          this.loading.set(false);

        },

        error: error => {

          console.error(
            'Error cargando distribuidores',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudieron cargar los distribuidores.'
          );

          this.loading.set(false);

        }

      });

  }

  onSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.search.set(
      input.value
    );

  }

  viewDistributor(
    distributor: Distributor
  ): void {

    this.router.navigate(
      [
        '/administration/distributors',
        distributor.id
      ]
    );

  }

  createDistributor(): void {

    this.router.navigateByUrl(
      '/administration/distributors/new'
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

  private normalizeText(value: string): string {

    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  }

}
