import { Dispatch } from 'redux'

import { VOTING_POLL_ALL } from '../action-types';
import errorHandler from '../error-handler';
import { VotingPolls } from 'types';

export const storeVotingPolls = (data: VotingPolls) => (dispatch: Dispatch) => {
  try {
    dispatch({
      type: VOTING_POLL_ALL,
      payload: {
        data: data
      },
    });
  } catch (error: any) {

    errorHandler(error, VOTING_POLL_ALL)
  }
}
