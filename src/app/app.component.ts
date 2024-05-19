
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule, routes } from './app.routes';
import { AboutUsComponent } from './about-us/about-us.component';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
  imports: [
    HomeComponent, 
    AboutUsComponent,
    RegistrationComponent,
    LoginComponent,
    AppRoutingModule,
    HttpClientModule
  ]
})
export class AppComponent {
  title = 'angular-regipage';
}
