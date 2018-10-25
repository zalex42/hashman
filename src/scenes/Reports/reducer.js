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

const initialState: State = {
    error: {
        code: 0,
        message: ''
    },
    pending: {
        loading: false
    },
    entities: [],
};

const reducer = createReducer({
    [actions.reportsRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.reportsReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.reportsFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } }),
    [actions.reportsSuccessed]: (state, payload) => ({ ...state, entities: payload }),
}, initialState);

export default reducer;