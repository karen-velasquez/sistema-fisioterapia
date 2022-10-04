import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginFisioterapeutaComponent } from './pages/login-fisioterapeuta/login-fisioterapeuta.component';
import { SignupFisioterapeutaComponent } from './pages/signup-fisioterapeuta/signup-fisioterapeuta.component';

const routes: Routes = [
  {
    path : 'home',
    component : HomepageComponent,
    pathMatch : 'full'
  },

  {
    path : 'signup',
    component : SignupFisioterapeutaComponent,
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginFisioterapeutaComponent,
    pathMatch : 'full'
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
