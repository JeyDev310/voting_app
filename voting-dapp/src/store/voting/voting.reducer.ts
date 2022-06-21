import { Action, Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { VotingPolls } from 'types';
import { VOTING_POLL_ALL } from 'store/action-types';

export interface VotingPollState {
  data: VotingPolls
}

interface VotingPollAction extends Action {
  payload: {
    data: VotingPolls,
  }
}

const initialState: VotingPollState = {
  data: {
    addresses: [],
    titles: []
  },
}

export const votingPollReducer: Reducer<VotingPollState, VotingPollAction> = handleActions(
  {
    [VOTING_POLL_ALL]: (state: VotingPollState, { payload: { data }}: VotingPollAction) => ({
      ...state,
      data
    }),
  },
  initialState,
);
