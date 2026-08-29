import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [
    IonContent
  ]
})
export class SplashPage implements OnInit {

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.router.navigateByUrl(
        '/auth/login',
        {
          replaceUrl: true
        }
      );
    }, 2000);

  }
}
