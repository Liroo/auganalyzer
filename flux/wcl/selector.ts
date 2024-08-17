import { createSelector } from '@reduxjs/toolkit';
import { rosterCharacterToKey } from 'utils/roster';
import { RootState } from '../store';

const selectWCLState = (state: RootState) => state.wcl;

export const selectWCLRegion = createSelector(
  [selectWCLState],
  (wclState) => wclState.region,
);

export const selectWCLReportWithFights = createSelector(
  [selectWCLState, selectWCLRegion],
  (wclState, region) =>
    Object.values(wclState.reportWithFights).filter((r) => r.region === region),
);

export const selectWCLCharacterByCharacterKey = (characterKey: string) =>
  createSelector([selectWCLState], (wclState) =>
    Object.values(wclState.characters).find(
      (c) => rosterCharacterToKey(c) === characterKey,
    ),
  );
