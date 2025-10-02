import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSchedules from './reducer';

// 1️⃣ Select the feature slice
export const selectScheduleState = createFeatureSelector<fromSchedules.scheduleState>('schedules');

// 2️⃣ Select all schedules (entity adapter gives us this)
export const selectAllSchedules = createSelector(
  selectScheduleState,
  fromSchedules.selectAll
);

// 3️⃣ Select schedules as dictionary
export const selectSchedulesEntities = createSelector(
  selectScheduleState,
  fromSchedules.selectEntities
);

// 4️⃣ Select loading state
export const selectSchedulesLoading = createSelector(
  selectScheduleState,
  state => state.loading
);

// 5️⃣ Select total count
export const selectSchedulesTotal = createSelector(
  selectScheduleState,
  state => state.total
);

// 6️⃣ Select schedule by id
export const selectScheduleById = (id: string) =>
  createSelector(
    selectSchedulesEntities,
    entities => entities[id]
  );
