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
    events: [],
	lastIDEvents: '',
    EventsUpdate: []
};

const reducer = createReducer({
    [actions.rigRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.rigReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.rigFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message } }),
    [actions.rigSuccessed]: (state, payload) => ({ ...state, entities: payload }),
    [actions.rigCharts]: (state, payload) => ({ ...state, charts: payload , lastIDEvents: payload.Events['0'].EventID }),
    [actions.rigChartsWithoutEvents]: (state, payload) => ({ ...state, charts: payload , lastIDEvents: '' }),
    [actions.rigChartsUpdate]: (state, payload) => ({ ...state, charts: {...state.charts,  currentHashrate: payload.currentHashrate, currentTemperatures: payload.currentTemperatures }, lastIDEvents: payload.Events['0'].EventID, EventsUpdate: payload.Events}),
    [actions.rigChartsUpdateWithoutEvents]: (state, payload) => ({ ...state, charts: {...state.charts, currentHashrate: payload.currentHashrate, currentTemperatures: payload.currentTemperatures }, lastIDEvents: '', EventsUpdate : []}),
    [actions.rigEvents]: (state, payload) => ({ ...state, events: payload }),
    [actions.rigClear]: () => initialState,
}, initialState);
//}, 
//{[actions.rigCharts] (state, action) {return initialState},
//[actions.rigRequested] (state, action) {return initialState},
//[actions.rigFailed] (state, action) {return initialState},
//[actions.rigSuccessed] (state, action) {return initialState},
//[actions.rigCharts] (state, action) {return initialState},
//[actions.rigChartsUpdate] (state, action) {return initialState},
//[actions.rigChartsUpdateWithoutEvents] (state, action) {return initialState},
//[actions.rigEvents] (state, action) {return initialState},
//[actions.rigClear] (state, action) {return initialState},
//});

export default reducer;