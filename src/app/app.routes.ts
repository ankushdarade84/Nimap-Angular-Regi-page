
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about' , component: AboutUsComponent },
    { path: 'signup', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'user-interface', component: UserInterfaceComponent },
    { path: 'user-interface', loadComponent: () => import('./user-interface/user-interface.component').then(m => m.UserInterfaceComponent) }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class AppRoutingModule {}