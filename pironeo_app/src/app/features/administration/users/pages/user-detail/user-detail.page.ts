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
  createOutline,
  personOutline,
  shieldCheckmarkOutline,
  atOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  keyOutline
} from 'ionicons/icons';

import { UserService } from '../../services/user.service';
import {
  User,
  UserRole
} from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class UserDetailPage implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  readonly user = signal<User | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor() {

    addIcons({
      arrowBackOutline,
      createOutline,
      personOutline,
      shieldCheckmarkOutline,
      atOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      keyOutline
    });

  }

  ngOnInit(): void {

    const updatedUser =
      this.router.getCurrentNavigation()?.extras.state?.['user'] as User | undefined;

    if (updatedUser) {
      this.user.set(updatedUser);
      this.loading.set(false);
    }

    this.refreshUser(
      !updatedUser
    );

  }

  ionViewWillEnter(): void {

    this.refreshUser(false);

  }

  private refreshUser(showLoading: boolean): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {

      this.error.set(
        'Usuario no valido.'
      );

      this.loading.set(false);

      return;
    }

    this.loadUser(
      id,
      showLoading
    );

  }

  loadUser(
    id: number,
    showLoading = true
  ): void {

    if (showLoading) {
      this.loading.set(true);
    }

    this.error.set('');

    this.userService
      .getById(id)
      .subscribe({

        next: response => {

          this.user.set(
            response.data
          );

          this.loading.set(false);

        },

        error: error => {

          console.error(
            'Error cargando usuario',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudo cargar el usuario.'
          );

          this.loading.set(false);

        }

      });

  }

  getRole(user: User): UserRole {

    return user.roleCode
      ?? user.role
      ?? 'WAITER';
  }

  getRoleName(user: User): string {

    return user.roleName
      ?? (
        this.getRole(user) === 'ADMIN'
          ? 'Administrador'
          : 'Camarero'
      );
  }

  edit(): void {

    const currentUser =
      this.user();

    if (!currentUser) {
      return;
    }

    this.router.navigate(
      [
        '/administration/users',
        currentUser.id,
        'edit'
      ]
    );

  }

  goBack(): void {

    this.router.navigateByUrl(
      '/administration/users',
      {
        replaceUrl: true
      }
    );

  }

}
