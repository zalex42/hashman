import { createReducer } from 'redux-act';
import * as actions from './actions';

type IinitialState = {
    error: {
        code: number,
        message: string
    },
    pending: {
        loading: boolean,
        ready: boolean
    },
    entities: {
        authorized: boolean,
        login: string,
        fullname: string
    }
}

const initialState: IinitialState = {
    error: {
        code: 0,
        message: null
    },
    pending: {
        loading: false
    },
    entities: {
        login: null,
        fullname: null,
        authorized: false
    }
};

const reducer = createReducer({
    [actions.authRequested]: (state) => ({ ...state, pending: { ...state.pending, loading: true } }),
    [actions.authRecieved]: (state) => ({ ...state, pending: { ...state.pending, loading: false } }),
    [actions.authFailed]: (state, payload) => ({ ...state, error: { ...state.error, code: payload.code, message: payload.message }, entities: { ...state.entities, authorized: false } }),
    [actions.authSuccessed]: (state, payload) => ({ ...state, entities: { ...state.entities, authorized: true, login: payload.login, fullname: payload.FullName } }),
    [actions.authLogouted]: () => initialState,
}, initialState);

export default reducer;