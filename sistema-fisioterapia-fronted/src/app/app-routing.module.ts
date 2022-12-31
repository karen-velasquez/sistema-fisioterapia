import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ViewAsignarEjerciciosComponent } from './pages/admin/view-asignar-ejercicios/view-asignar-ejercicios.component';
import { ViewCrearUsuarioComponent } from './pages/admin/view-crear-usuario/view-crear-usuario.component';
import { ViewLesionComponent } from './pages/admin/view-lesion/view-lesion.component';
import { ViewNotasComponent } from './pages/admin/view-notas/view-notas.component';
import { ViewPacientesComponent } from './pages/admin/view-pacientes/view-pacientes.component';
import { ViewSeguimientoNotasComponent } from './pages/admin/view-seguimiento-notas/view-seguimiento-notas.component';
import { ViewPlotsComponent } from './pages/admin/view-plots/view-plots.component';
import { ViewSeleccionTipoComponent } from './pages/admin/view-seleccion-tipo/view-seleccion-tipo.component';
import { ViewSesionesComponent } from './pages/admin/view-sesiones/view-sesiones.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ChangePasswordComponent } from './pages/changepassword/change-password/change-password.component';
import { SendEmailComponent } from './pages/changepassword/send-email/send-email.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ViewEjerciciosAsignadosComponent } from './pages/user/view-ejercicios-asignados/view-ejercicios-asignados.component';
import { ViewIndicacionesComponent } from './pages/user/view-indicaciones/view-indicaciones.component';
import { ViewInformacionComponent } from './pages/user/view-informacion/view-informacion.component';
import { ViewRealizarEjerciciosComponent } from './pages/user/view-realizar-ejercicios/view-realizar-ejercicios.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';


const routes: Routes = [
  {
    path : '',
    component : LoginComponent,
    pathMatch: 'full'

  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch: 'full'

  },
  {
    path : 'sendemail',
    component : SendEmailComponent,
  },
  {
    path : 'changePassword',
    component : ChangePasswordComponent,
  }
  ,
  {//admin/profile
    path : 'fisioterapeuta',
    component : DashboardComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: 'pacientes',
        component: ViewPacientesComponent
      },
      {
        path: 'notas',
        component: ViewNotasComponent
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
      },
      {
        path: 'seleccionar',
        component: ViewSeleccionTipoComponent
      },
      {
        path: 'seguimiento',
        component: ViewSeguimientoNotasComponent
      },

    ]
  },
  {
    path : 'admin',
    component : UserDashboardComponent,
    canActivate: [NormalGuard],
    children:[
      {
        path: '',
        component: ProfileComponent
      },
      {
        path:'crear',
        component: ViewIndicacionesComponent
      }
    ]
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
