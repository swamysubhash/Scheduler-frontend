import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleListComponent } from './features/components/schedule-list/schedule-list';
import { ScheduleFormComponent } from './features/components/schedule-form/schedule-form';
import { Login } from './pages/login/login';
import { AuthGuard } from './features/services/auth-guard';
import { Register } from './pages/register/register';

const routes: Routes = [
  { path: 'schedules', component: ScheduleListComponent, canActivate: [AuthGuard] },
  { path: 'schedules/new', component: ScheduleFormComponent, canActivate: [AuthGuard] },
  { path: 'schedules/edit/:id', component: ScheduleFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'schedules', pathMatch: 'full' },
  {path:'login', component: Login},
  {path:'register', component: Register}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
