import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupFisioterapeutaComponent } from './pages/signup-fisioterapeuta/signup-fisioterapeuta.component';
import { LoginFisioterapeutaComponent } from './pages/login-fisioterapeuta/login-fisioterapeuta.component';

import {DropDownListModule, MultiSelectModule} from '@syncfusion/ej2-angular-dropdowns';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TextFieldModule} from '@angular/cdk/text-field';
import { ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { MatTableModule } from '@angular/material/table'  
import {MatSelectModule} from '@angular/material/select';

import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { HomepageComponent } from './pages/homepage/homepage.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewPacientesComponent } from './pages/admin/view-pacientes/view-pacientes.component';
import { ViewSeguimientoNotasComponent } from './pages/admin/view-seguimiento-notas/view-seguimiento-notas.component';
import { ViewCrearUsuarioComponent } from './pages/admin/view-crear-usuario/view-crear-usuario.component';
import { ViewLesionComponent } from './pages/admin/view-lesion/view-lesion.component';
import { ViewSesionesComponent } from './pages/admin/view-sesiones/view-sesiones.component';
import { ViewAsignarEjerciciosComponent } from './pages/admin/view-asignar-ejercicios/view-asignar-ejercicios.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { ViewRealizarEjerciciosComponent } from './pages/user/view-realizar-ejercicios/view-realizar-ejercicios.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupFisioterapeutaComponent,
    LoginFisioterapeutaComponent,
    HomepageComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewPacientesComponent,
    ViewSeguimientoNotasComponent,
    ViewCrearUsuarioComponent,
    ViewLesionComponent,
    ViewSesionesComponent,
    ViewAsignarEjerciciosComponent,
    UserSidebarComponent,
    ViewRealizarEjerciciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    DropDownListModule,
    MultiSelectModule,
    TextFieldModule,
    ScheduleModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [authInterceptorProviders, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
