import {createReducer,on} from '@ngrx/store';
import { Schedule } from '../schedule.model';
import * as ScheduleActions from './actions';
import {EntityState,createEntityAdapter} from '@ngrx/entity';

export interface scheduleState extends EntityState<Schedule>{
    loading:boolean;
    total:number;
}

export const adaptor = createEntityAdapter<Schedule>({
     selectId: (schedule) => schedule._id as string
});

export const initialState = adaptor.getInitialState({loading:false,total:0});

export const scheduleRecucer = createReducer(
    initialState,
    on(ScheduleActions.loadSchedules,(state)=>({...state,loading:true})),
    on(ScheduleActions.loadSchedulesSuccess, (state, action:any) => adaptor.setAll(action.schedules, { ...state, loading: false, total: action.total })),
    on(ScheduleActions.loadSchedulesFaiilure,(state,action)=>({...state,loading:false})),

    on(ScheduleActions.createSchedule,(state)=>({...state,loading:true})),
    on(ScheduleActions.createScheduleSuccess,(state,action)=>adaptor.addOne(action.schedule,{...state,loading:false})),
    on(ScheduleActions.createScheduleFailure,(state,action)=>({...state,loading:false})),

    on(ScheduleActions.updateSchedule,(state)=>({...state,loading:true})),
    on(ScheduleActions.updateScheduleSuccess,(state,action:any)=>adaptor.updateOne({id:action.schedule.id,changes:action.schedule},{...state,loading:false})),
    on(ScheduleActions.updateScheduleFailure,(state,action)=>({...state,loading:false})),

    on(ScheduleActions.deleteSchedule,(state)=>({...state,loading:true})),
    on(ScheduleActions.deleteScheduleSuccess,(state,action)=>adaptor.removeOne(action.id,{...state,loading:false})),
    on(ScheduleActions.deleteScheduleFailure,(state,action)=>({...state,loading:false})),
)

export const {selectAll, selectEntities} = adaptor.getSelectors();