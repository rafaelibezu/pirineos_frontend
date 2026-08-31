import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  computed,
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
  addOutline,
  arrowBackOutline,
  chevronForwardOutline,
  peopleOutline,
  personOutline,
  refreshOutline,
  searchOutline,
  shieldCheckmarkOutline,
  warningOutline
} from 'ionicons/icons';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class UserListPage implements OnInit {

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly users = signal<User[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  readonly search = signal('');

  readonly onlyWaiters = signal(false);

  readonly title = computed(() =>
    this.onlyWaiters()
      ? 'Camareros'
      : 'Usuarios'
  );

  readonly subtitle = computed(() =>
    this.onlyWaiters()
      ? 'Gestiona los camareros del negocio'
      : 'Gestiona usuarios y permisos'
  );

  readonly filteredUsers = computed(() => {

    const text =
      this.normalizeText(
        this.search()
      );

    if (!text) {
      return this.users();
    }

    return this.users().filter(user => {

      const fullName =
        `${user.firstName ?? ''} ${user.lastName ?? ''}`;

      const searchableText =
        this.normalizeText(
          [
            user.username,
            fullName,
            user.role,
            user.role === 'ADMIN' ? 'administrador admin' : 'camarero waiter',
            user.active ? 'activo' : 'inactivo'
          ].join(' ')
        );

      return searchableText.includes(text);

    });

  });

  constructor() {

    addIcons({
      addOutline,
      arrowBackOutline,
      chevronForwardOutline,
      peopleOutline,
      personOutline,
      refreshOutline,
      searchOutline,
      shieldCheckmarkOutline,
      warningOutline
    });

  }

  ngOnInit(): void {

    const role =
      this.activatedRoute.snapshot.queryParamMap.get('role');

    this.onlyWaiters.set(
      role === 'WAITER'
    );

    this.loadUsers();
  }

  loadUsers(): void {

    this.loading.set(true);
    this.error.set('');

    const request$ =
      this.onlyWaiters()
        ? this.userService.getWaiters()
        : this.userService.getAll();

    request$.subscribe({

      next: response => {

        this.users.set(
          response.data ?? []
        );

        this.loading.set(false);
      },

      error: error => {

        console.error(
          'Error cargando usuarios',
          error
        );

        this.error.set(
          'No se pudieron cargar los usuarios.'
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

  createUser(): void {

    this.router.navigateByUrl(
      '/administration/users/new'
    );
  }

  editUser(user: User): void {

    this.router.navigate(
      [
        '/administration/users',
        user.id,
        'edit'
      ]
    );
  }

  goBack(): void {

    this.router.navigateByUrl(
      '/administration'
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
