import api from '~/api';
import { createAction } from 'redux-act';

import IResult from '~/interfaces/IResult';

export const settingsRequested = createAction('[SETTINGS] Requested');
export const settingsReceived = createAction('[SETTINGS] Received');
export const settingsFailed = createAction('[SETTINGS] Failed');
export const settingsSuccessed = createAction('[SETTINGS] Successed');
export const settingsEdit = createAction('[SETTINGS] Successed');

export const getSettings = () => async (dispatch) => {
    try {
        dispatch(settingsRequested());

        const { data } = await api.get('/api/react/settings');
        if (data.ErrorCode < 0) {
            dispatch(settingsFailed({ code: data.ErrorCode, message: data.ErrorString }));
        } else {
            dispatch(settingsSuccessed(data.Data));
        }
    } catch (e) {
        dispatch(settingsFailed({ code: null, message: e }));
    } finally {
        dispatch(settingsReceived());
    }
};

export const editSettings = editedItems => async dispatch => {
    try {
        dispatch(settingsRequested());

        const { data } = await api.post(`/api/react/settings`, editedItems);
        if (data.ErrorCode < 0) {
            dispatch(settingsFailed({
                ErrorString: data.ErrorString,
                ErrorCode: data.ErrorCode
            }));
        } else {
            settingsEdit(data.Data);
        }
    } catch (e) {
        dispatch(settingsFailed({
            ErrorString: e,
            ErrorCode: -10
        }));
    } finally {
        dispatch(settingsReceived());
    }
};
