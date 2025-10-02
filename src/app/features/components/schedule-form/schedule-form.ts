import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ScheduledActions from '../../store/actions';
import { ScheduleService } from '../../services/schedule.service';
import { Subject, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Alerts } from '../../services/alerts';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.html',
  styleUrl: './schedule-form.scss',
  standalone:false
})
export class ScheduleFormComponent implements OnInit,OnDestroy {
  form: any;
  id: string | null = null;

  private actions$ = inject(Actions);
  private destroy$ = new Subject<void>();
  private alerts = inject(Alerts);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required]
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.scheduleService.getSchedule(this.id).subscribe(res => {
        const item:any = res;
        if (item) {
          this.form.patchValue({ title: item.title, description: item.description, date: item.date });
        }
      });
    }
    this.listenForSuccess();
  }

  submit() {
    if (this.form.invalid) return;
    const payload = this.form.value;
    if (this.id) {
      this.store.dispatch(ScheduledActions.updateSchedule({ id: this.id, payload }));
    } else {
      this.store.dispatch(ScheduledActions.createSchedule({ payload }));
    }
  }

  cancel() {
    this.router.navigate(['/schedules']);
  }

  private listenForSuccess() {
    this.actions$.pipe(
      ofType(
        ScheduledActions.createScheduleSuccess,
        ScheduledActions.updateScheduleSuccess
      ),
      takeUntil(this.destroy$)
    ).subscribe((action) => {
      const message = action.type.includes('create') ? 'Schedule created successfully!' : 'Schedule updated successfully!';
      this.alerts.show(message);
      this.router.navigate(['/schedules']);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
