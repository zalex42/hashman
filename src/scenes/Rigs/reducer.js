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
    charts: {},
	gconfig: {},
	config: true,
	lastIDEvents: ''
};

const reducer = createReducer({
    [actions.rigsRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.rigsReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.rigsFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } }),
    [actions.rigsSuccessed]: (state, payload) => ({ ...state, entities: payload }),
    [actions.rigsCharts]: (state, payload) => ({ ...state, charts: payload ,lastIDEvents: payload.Events['0'].EventID }),
    [actions.rigsChartsWithoutEvents]: (state, payload) => ({ ...state, charts: payload ,lastIDEvents: '' }),
    [actions.rigsChartsUpdate]: (state, payload) => ({ ...state, charts: {...state.charts, Events: payload.Events, currentHashrate: payload.currentHashrate, currentTemperatures: payload.currentTemperatures }, lastIDEvents: payload.Events['0'].EventID}),
    [actions.rigsChartsUpdateWithoutEvents]: (state, payload) => ({ ...state, charts: {...state.charts, currentHashrate: payload.currentHashrate, currentTemperatures: payload.currentTemperatures }}),
    [actions.rigsGConfig]: (state, payload) => ({ ...state, gconfig: payload }),
    [actions.rigsConfig]: (state, payload) => ({ ...state, config: payload }),
    [actions.rigsClear]: () => initialState,
}, initialState);

export default reducer;