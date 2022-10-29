import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ViewAsignarEjerciciosComponent } from './pages/admin/view-asignar-ejercicios/view-asignar-ejercicios.component';
import { ViewCrearUsuarioComponent } from './pages/admin/view-crear-usuario/view-crear-usuario.component';
import { ViewLesionComponent } from './pages/admin/view-lesion/view-lesion.component';
import { ViewPacientesComponent } from './pages/admin/view-pacientes/view-pacientes.component';
import { ViewSeguimientoNotasComponent } from './pages/admin/view-seguimiento-notas/view-seguimiento-notas.component';
import { ViewSesionesComponent } from './pages/admin/view-sesiones/view-sesiones.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ViewRealizarEjerciciosComponent } from './pages/user/view-realizar-ejercicios/view-realizar-ejercicios.component';
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
      },
      {
        path: 'crear',
        component: ViewCrearUsuarioComponent
      },
      {
        path: 'lesion',
        component: ViewLesionComponent
      },
      {
        path: 'sesiones',
        component: ViewSesionesComponent
      },
      {
        path: 'asignar',
        component: ViewAsignarEjerciciosComponent
      }

    ]
  },
  {
    path : 'user',
    component : UserDashboardComponent,
    canActivate: [NormalGuard],
    children:[
      {
        path:'ejercicios',
        component: ViewRealizarEjerciciosComponent
      }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
