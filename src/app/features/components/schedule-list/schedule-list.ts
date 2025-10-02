import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as SchedulesActions from '../../store/actions';
import { Observable } from 'rxjs';
import { Schedule } from '../../schedule.model';
import { scheduleState } from '../../store/reducer';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { selectAllSchedules, selectSchedulesLoading, selectSchedulesTotal } from '../../store/selectors';
@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.html',
  styleUrl: './schedule-list.scss',
  standalone:false
})
export class ScheduleListComponent implements OnInit {
  schedules$!: Observable<Schedule[]>;
  total$!: Observable<number>;
  loading$!: Observable<boolean>;

  page = 1;
  limit = 5;

  displayedColumns = ['title', 'description', 'date', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<scheduleState>) {}

  ngOnInit() {
    // Dispatch load action
    this.store.dispatch(SchedulesActions.loadSchedules({ page: this.page, limit: this.limit }));

    // Select data from store
    this.schedules$ = this.store.pipe(select(selectAllSchedules));
    this.total$ = this.store.pipe(select(selectSchedulesTotal));
    this.loading$ = this.store.pipe(select(selectSchedulesLoading));
  }

  // Handle pagination
  pageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.store.dispatch(SchedulesActions.loadSchedules({ page: this.page, limit: this.limit }));
  }

  // Handle delete
  delete(id: string) {
    if (confirm('Are you sure to delete this schedule?')) {
      this.store.dispatch(SchedulesActions.deleteSchedule({ id }));
    }
  }
}
