import { createAction } from 'redux-act';

export const toggleSidebar = createAction('[SIDEBAR] Toggle');
export const hoverSidebar = createAction('[SIDEBAR] Hover');
export const leaveSidebar = createAction('[SIDEBAR] Leave');