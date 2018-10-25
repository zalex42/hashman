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
    [actions.settingsRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.settingsReceived]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.settingsFailed]: (state, {ErrorCode, ErrorString}) => ({ ...state, error: { ...state.error, code: ErrorCode, message: ErrorString } }),
    [actions.settingsSuccessed]: (state, payload) => ({ ...state, entities: payload, error: initialState.error }),
    [actions.settingsEdit]: (state, payload) => ({ ...state, entities: payload, error: initialState.error })
}, initialState);

export default reducer;
