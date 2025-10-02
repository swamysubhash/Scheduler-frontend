import {createAction, props} from '@ngrx/store';
import { Schedule } from '../schedule.model';

// Load Schedules
export const loadSchedules = createAction('[Schedule] load schedules',props<{page:number;limit:number}>());
export const loadSchedulesSuccess = createAction('[Schedule] load schedules success', props<{schedules:Schedule[];total:number}>());
export const loadSchedulesFaiilure = createAction('[Schedule] load schedules failure',props<{error:any}>());

//Create Schedule

export const createSchedule = createAction('[Schedule] create schedule', props<{payload:Schedule}>());
export const createScheduleSuccess = createAction('[Schedule] create schedule success', props<{schedule:Schedule}>())
export const createScheduleFailure = createAction('[Schedule] create schedule failure', props<{error:any}>());

//Update Schedule
export const updateSchedule = createAction('[Schedule] update schedule', props<{id:string;payload:Schedule}>());
export const updateScheduleSuccess = createAction('[Schedule] update schedule success', props<{schedule:Schedule}>());
export const updateScheduleFailure = createAction('[Schedule] update schedule failure', props<{error:any}>());

//Delete Schedule
export const deleteSchedule = createAction('[Schedule] delete schedule', props<{id:string}>());
export const deleteScheduleSuccess = createAction('[Schedule] delete schedule success', props<{id:string}>());
export const deleteScheduleFailure = createAction('[Schedule] delete schedule failure', props<{error:any}>());