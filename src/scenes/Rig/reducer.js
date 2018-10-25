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
    entities: {},
    charts: {},
    events: []
};

const reducer = createReducer({
    [actions.rigRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.rigReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.rigFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } }),
    [actions.rigSuccessed]: (state, payload) => ({ ...state, entities: payload }),
    [actions.rigCharts]: (state, payload) => ({ ...state, charts: payload }),
    [actions.rigEvents]: (state, payload) => ({ ...state, events: payload }),
    [actions.rigClear]: () => initialState,
}, initialState);

export default reducer;