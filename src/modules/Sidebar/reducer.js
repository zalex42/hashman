/**
    @flow
 */

import { createReducer } from 'redux-act';
import * as actions from './actions';

type State = {
    hidden: boolean,
    hovered: boolean
}

const initialState: State = {
    hidden: window.innerWidth < 480,
    hovered: false
};

const reducer = createReducer({
    [actions.toggleSidebar]: (state) => ({ ...state, hidden: !state.hidden, hovered: false }),
    [actions.hoverSidebar]: (state) => ({ ...state, hovered: true }),
    [actions.leaveSidebar]: (state) => ({ ...state, hovered: false }),
}, initialState);

export default reducer;