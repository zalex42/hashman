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
	config: true,
	lastIDEvents: '',
    EventsUpdate: []
};

const reducer = createReducer({
    [actions.serversRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.serversReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.serversFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } }),
    [actions.serversSuccessed]: (state, payload) => ({ ...state, entities: payload }),
    [actions.serversCharts]: (state, payload) => ({ ...state, charts: payload,lastIDEvents: payload.Events['0'].EventID }),
    [actions.serversChartsWithoutEvents]: (state, payload) => ({ ...state, charts: payload,lastIDEvents: '' }),
    [actions.serversChartsUpdate]: (state, payload) => ({ ...state, charts: {...state.charts, currentHashrate: payload.currentHashrate, currentTemperatures: payload.currentTemperatures }, lastIDEvents: payload.Events['0'].EventID, EventsUpdate: payload.Events}),
    [actions.serversChartsUpdateWithoutEvents]: (state, payload) => ({ ...state, charts: {...state.charts, currentHashrate: payload.currentHashrate, currentTemperatures: payload.currentTemperatures }, EventsUpdate : []}),
    [actions.CoolFanRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.CoolFanReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.CoolFanGConfig]: (state, payload) => ({ ...state, gconfig: payload }),
    [actions.CoolFanConfig]: (state, payload) => ({ ...state, config: payload }),
    [actions.PowerRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.PowerReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.PowerGConfig]: (state, payload) => ({ ...state, gconfig: payload }),
    [actions.PowerConfig]: (state, payload) => ({ ...state, config: payload }),
}, initialState);

export default reducer;