import { createReducer } from 'redux-act';
import * as actions from './actions';

type State = {
    error: {
        code: number,
        message: string
    },
    pending: {
        loading: boolean
    },
    entities: Array<any>
};

const initialState = {
    error: {
        code: 0,
        message: ''
    },
    pending: {
        loading: false
    },
    entities: []
};

const reducer = createReducer({
    [actions.eventsRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.eventsReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.eventsFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } }),
    [actions.eventsSuccessed]: (state, payload) => ({ ...state, entities: payload }),
    [actions.eventsClear]: () => initialState
}, initialState);

export default reducer;