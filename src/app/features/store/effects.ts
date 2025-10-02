import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ScheduleService } from "../services/schedule.service";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import * as SchedulesActions from './actions';

@Injectable()

export class ScheduleEffects {

  private actions$ = inject(Actions);
  private scheduleService = inject(ScheduleService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchedulesActions.loadSchedules),
      mergeMap(action =>
        this.scheduleService.getSchedules(action.page, action.limit).pipe(
          map(res => SchedulesActions.loadSchedulesSuccess({ schedules: res.schedules, total: res.total })),
          catchError(err => of(SchedulesActions.loadSchedulesFaiilure({ error: err })))
        )
      )
    )
  );


  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchedulesActions.createSchedule),
      mergeMap(action =>
        this.scheduleService.create(action.payload).pipe(
          map(schedule => SchedulesActions.createScheduleSuccess({ schedule })),
          catchError(err => of(SchedulesActions.createScheduleFailure({ error: err })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchedulesActions.updateSchedule),
      mergeMap(action =>
        this.scheduleService.update(action.id, action.payload).pipe(
          map(schedule => SchedulesActions.updateScheduleSuccess({ schedule })),
          catchError(err => of(SchedulesActions.updateScheduleFailure({ error: err })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchedulesActions.deleteSchedule),
      mergeMap(action =>
        this.scheduleService.delete(action.id).pipe(
          map(() => SchedulesActions.deleteScheduleSuccess({ id: action.id })),
          catchError(err => of(SchedulesActions.deleteScheduleFailure({ error: err })))
        )
      )
    )
  );
  
}
