import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonContent,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  peopleOutline,
  personOutline,
  walletOutline,
  timeOutline,
  cubeOutline,
  pricetagsOutline,
  settingsOutline,
  chevronForwardOutline,
  arrowBackOutline,
  documentTextOutline
} from 'ionicons/icons';

interface AdministrationOption {
  title: string;
  description: string;
  icon: string;
  route: string;
  accentClass: string;
}

@Component({
  selector: 'app-administration-home',
  standalone: true,
  templateUrl: './administration-home.page.html',
  styleUrls: ['./administration-home.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon
  ]
})
export class AdministrationHomePage {

  private readonly router = inject(Router);

  readonly options: AdministrationOption[] = [
    {
      title: 'Usuarios',
      description: 'Gestiona usuarios y permisos',
      icon: 'people-outline',
      route: '/administration/users',
      accentClass: 'green'
    },
    {
      title: 'Camareros',
      description: 'Gestiona la lista de camareros',
      icon: 'person-outline',
      route: '/administration/users?role=WAITER',
      accentClass: 'purple'
    },
    {
      title: 'Cajas',
      description: 'Gestiona las cajas del negocio',
      icon: 'wallet-outline',
      route: '/administration/cash-registers',
      accentClass: 'orange'
    },
    {
      title: 'Turnos',
      description: 'Gestiona los turnos de trabajo',
      icon: 'time-outline',
      route: '/administration/shifts',
      accentClass: 'yellow'
    },
    {
      title: 'Distribuidores',
      description: 'Gestiona los distribuidores',
      icon: 'cube-outline',
      route: '/administration/distributors',
      accentClass: 'cyan'
    },
    {
      title: 'Historial',
      description: 'Revisa movimientos de los camareros',
      icon: 'document-text-outline',
      route: '/administration/history',
      accentClass: 'blue'
    },
    // {
    //   title: 'Ajustes',
    //   description: 'Configuración general',
    //   icon: 'settings-outline',
    //   route: '/administration/settings',
    //   accentClass: 'blue'
    // }
  ];

  constructor() {
    addIcons({
      peopleOutline,
      personOutline,
      walletOutline,
      timeOutline,
      cubeOutline,
      pricetagsOutline,
      settingsOutline,
      chevronForwardOutline,
      arrowBackOutline,
      documentTextOutline
    });
  }

  goBack(): void {
    this.router.navigateByUrl(
      '/dashboard/admin',
      {
        replaceUrl: true
      }
    );
  }

  goTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
