import { createSelector } from 'reselect';

import { AppState } from '..';
import { VotingPollState } from './voting.reducer';
import { VotingPolls } from 'types';

export const selectVotingPolls = createSelector<AppState, VotingPollState, VotingPolls>(
  (state) => state.votingModule,
  (votingModule) => votingModule.data,
);
