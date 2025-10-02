import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleListComponent } from './features/components/schedule-list/schedule-list';
import { ScheduleFormComponent } from './features/components/schedule-form/schedule-form';

const routes: Routes = [
  //{ path: 'login', component: LoginComponent },
  { path: 'schedules', component: ScheduleListComponent },
  { path: 'schedules/new', component: ScheduleFormComponent },
  { path: 'schedules/edit/:id', component: ScheduleFormComponent },
  { path: '', redirectTo: 'schedules', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
