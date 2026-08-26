import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [IonButton, IonContent, RouterLink],
  templateUrl: './dashboard-home.page.html',
  styleUrl: './dashboard-home.page.scss',
})
export class DashboardHomePage {}
