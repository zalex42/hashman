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
    entities: [],
    gconfig: {},
    charts: {},
	config: true
};

const reducer = createReducer({
    [actions.serversRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.serversReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.serversFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } }),
    [actions.serversSuccessed]: (state, payload) => ({ ...state, entities: payload }),
    [actions.serversCharts]: (state, payload) => ({ ...state, charts: payload }),
    [actions.serversChartsUpdate]: (state, payload) => ({ ...state, charts: {...state.charts, Events: payload.Events, currentHashrate: payload.currentHashrate, currentTemperatures: payload.currentTemperatures }}),
    [actions.CoolFanRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.CoolFanReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.CoolFanGConfig]: (state, payload) => ({ ...state, gconfig: payload }),
    [actions.CoolFanConfig]: (state, payload) => ({ ...state, config: payload }),
}, initialState);

export default reducer;