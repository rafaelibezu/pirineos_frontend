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
  arrowBackOutline,
  calendarOutline,
  cardOutline,
  cashOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  documentTextOutline,
  filterOutline,
  refreshOutline,
  scaleOutline,
  searchOutline,
  swapHorizontalOutline,
  timeOutline,
  warningOutline
} from 'ionicons/icons';

import { User } from '../../../users/models/user.model';
import { UserService } from '../../../users/services/user.service';
import {
  History,
  HistoryItem,
  HistoryItemType
} from '../../models/history.model';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history-list',
  standalone: true,
  templateUrl: './history-list.page.html',
  styleUrls: ['./history-list.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class HistoryListPage implements OnInit {

  private readonly router = inject(Router);
  private readonly historyService = inject(HistoryService);
  private readonly userService = inject(UserService);

  readonly history = signal<History | null>(null);
  readonly users = signal<User[]>([]);
  readonly loading = signal(true);
  readonly loadingUsers = signal(false);
  readonly error = signal('');

  readonly from = signal(this.getDateDaysAgo(30));
  readonly to = signal(this.getToday());
  readonly userId = signal<number | null>(null);
  readonly type = signal<HistoryItemType | 'ALL'>('ALL');
  readonly search = signal('');

  readonly items = computed(() =>
    this.history()?.items ?? []
  );

  readonly filteredItems = computed(() => {

    const selectedType =
      this.type();

    const text =
      this.normalizeText(
        this.search()
      );

    return this.items().filter(item => {

      const itemDate =
        item.date.slice(0, 10);

      const matchesDate =
        itemDate >= this.from()
        && itemDate <= this.to();

      if (!matchesDate) {
        return false;
      }

      const selectedUserId =
        this.userId();

      const matchesUser =
        selectedUserId === null
        || item.userId === selectedUserId;

      if (!matchesUser) {
        return false;
      }

      const matchesType =
        selectedType === 'ALL'
        || item.type === selectedType;

      if (!matchesType) {
        return false;
      }

      if (!text) {
        return true;
      }

      return this.normalizeText(
        [
          item.title,
          item.description,
          item.userName,
          item.type
        ].join(' ')
      ).includes(text);

    });

  });

  readonly totalAmount = computed(() =>
    this.filteredItems().reduce(
      (total, item) => total + (item.amount ?? 0),
      0
    )
  );

  readonly totalDifference = computed(() =>
    this.filteredItems().reduce(
      (total, item) => total + (item.difference ?? 0),
      0
    )
  );

  readonly movementCount = computed(() =>
    this.filteredItems().filter(
      item => item.type === 'MOVEMENT'
    ).length
  );

  readonly closingCount = computed(() =>
    this.filteredItems().filter(
      item => item.type === 'CLOSING'
    ).length
  );

  constructor() {

    addIcons({
      arrowBackOutline,
      calendarOutline,
      cardOutline,
      cashOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      documentTextOutline,
      filterOutline,
      refreshOutline,
      scaleOutline,
      searchOutline,
      swapHorizontalOutline,
      timeOutline,
      warningOutline
    });

  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadHistory();
  }

  ionViewWillEnter(): void {
    this.loadHistory(false);
  }

  loadHistory(
    showLoading = true
  ): void {

    if (showLoading) {
      this.loading.set(true);
    }

    this.error.set('');

    this.historyService
      .getHistory(
        this.from(),
        this.to(),
        this.userId()
      )
      .subscribe({

        next: response => {

          this.history.set(
            response.data
          );

          this.loading.set(false);

        },

        error: error => {

          console.error(
            'Error cargando historial',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudo cargar el historial.'
          );

          this.loading.set(false);

        }

      });

  }

  loadUsers(): void {

    this.loadingUsers.set(true);

    this.userService
      .getAll()
      .subscribe({

        next: response => {

          this.users.set(
            response.data ?? []
          );

          this.loadingUsers.set(false);

        },

        error: error => {

          console.error(
            'Error cargando usuarios para historial',
            error
          );

          this.loadingUsers.set(false);

        }

      });

  }

  onFromChange(event: Event): void {

    this.from.set(
      (event.target as HTMLInputElement).value
    );

    this.loadHistory();

  }

  onToChange(event: Event): void {

    this.to.set(
      (event.target as HTMLInputElement).value
    );

    this.loadHistory();

  }

  onUserChange(event: Event): void {

    const value =
      (event.target as HTMLSelectElement).value;

    this.userId.set(
      value
        ? Number(value)
        : null
    );

    this.loadHistory();

  }

  onSearch(event: Event): void {

    this.search.set(
      (event.target as HTMLInputElement).value
    );

  }

  selectType(
    type: HistoryItemType | 'ALL'
  ): void {
    this.type.set(type);
  }

  getTypeIcon(
    item: HistoryItem
  ): string {

    if (item.type === 'CLOSING') {
      return item.difference && item.difference !== 0
        ? 'scale-outline'
        : 'checkmark-circle-outline';
    }

    if (item.type === 'TRANSFER') {
      return 'swap-horizontal-outline';
    }

    return item.title.toLowerCase().includes('pago')
      ? 'card-outline'
      : 'cash-outline';

  }

  getTypeLabel(
    type: HistoryItemType
  ): string {

    if (type === 'CLOSING') {
      return 'Cierre';
    }

    if (type === 'TRANSFER') {
      return 'Traspaso';
    }

    return 'Movimiento';

  }

  getDifferenceLabel(
    difference: number | null
  ): string {

    if (difference === null) {
      return 'Sin diferencia';
    }

    if (difference === 0) {
      return 'Cuadrado';
    }

    return difference > 0
      ? 'Sobrante'
      : 'Faltante';

  }

  goBack(): void {

    this.router.navigateByUrl(
      '/administration',
      {
        replaceUrl: true
      }
    );

  }

  private getToday(): string {
    return this.toDateInputValue(new Date());
  }

  private getDateDaysAgo(days: number): string {

    const date =
      new Date();

    date.setDate(
      date.getDate() - days
    );

    return this.toDateInputValue(date);

  }

  private toDateInputValue(date: Date): string {

    const year =
      date.getFullYear();

    const month =
      String(date.getMonth() + 1).padStart(2, '0');

    const day =
      String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;

  }

  private normalizeText(value: string): string {

    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  }

}
