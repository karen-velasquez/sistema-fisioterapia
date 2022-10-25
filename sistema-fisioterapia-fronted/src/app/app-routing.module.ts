import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ViewPacientesComponent } from './pages/admin/view-pacientes/view-pacientes.component';
import { ViewSeguimientoNotasComponent } from './pages/admin/view-seguimiento-notas/view-seguimiento-notas.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path : 'home',
    component : HomepageComponent,
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {//admin/profile
    path : 'admin',
    component : DashboardComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'pacientes',
        component: ViewPacientesComponent
      },
      {
        path: 'notas',
        component: ViewSeguimientoNotasComponent
      }

    ]
  },
  {
    path : 'user-dashboard',
    component : UserDashboardComponent,
    pathMatch : 'full',
    canActivate: [NormalGuard]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
