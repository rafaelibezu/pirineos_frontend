import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon, IonSpinner } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  checkmarkCircleOutline,
  personOutline,
  saveOutline
} from 'ionicons/icons';

import { UserRole } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonIcon,
    IonSpinner
  ],
  templateUrl: './user-form.page.html',
  styleUrl: './user-form.page.scss'
})
export class UserFormPage implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly isEditMode = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: [''],
    role: this.formBuilder.nonNullable.control<UserRole>('WAITER', Validators.required),
    active: [true]
  });

  constructor() {
    addIcons({
      arrowBackOutline,
      checkmarkCircleOutline,
      personOutline,
      saveOutline
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      return;
    }

    this.isEditMode.set(true);
    this.loading.set(true);

    this.userService.getById(id).subscribe({
      next: response => {
        this.form.patchValue(response.data);
        this.loading.set(false);
      },
      error: error => {
        this.errorMessage.set(
          error?.error?.message ?? 'No se pudo cargar el usuario'
        );
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    void this.router.navigateByUrl('/administration/users');
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    void this.router.navigateByUrl('/administration/users');
  }
}
