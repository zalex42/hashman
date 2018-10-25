import api from '~/api';
import { createAction } from 'redux-act';
import IResult from '~/interfaces/IResult';
import { LS_KEY } from './index';

export const eventsRequested = createAction('[EVENTS] Requested');
export const eventsReceived = createAction('[EVENTS] Received');
export const eventsFailed = createAction('[EVENTS] Failed');
export const eventsSuccessed = createAction('[EVENTS] Successed');
export const eventsClear = createAction('[EVENTS] Clear');

export const getEvents = () => {
    return async (dispatch) => {
        try
        {
			dispatch(eventsRequested());
            const response = await api.get('/api/react/events');
            const result: IResult = response.data;

            if (result.ErrorCode < 0) {
                dispatch(eventsFailed({ code: result.ErrorCode, message: result.ErrorString }));
            }
            else {
                const arrEvents = result.Data;
                const arrIdOld = JSON.parse(localStorage.getItem(LS_KEY));
                if (!arrIdOld || arrIdOld === '' || !arrIdOld.length) {
                    arrEvents.forEach(ev => {
                        ev.IsRead = false;
                    });
                    dispatch(eventsSuccessed(arrEvents));
                } else {
                    arrEvents.forEach(ev => {
                        ev.IsRead = arrIdOld.includes(ev.EventID);
                    });
                    dispatch(eventsSuccessed(arrEvents));
                }
            }
			dispatch(eventsReceived());
        }
        catch (e)
        {
            dispatch(eventsFailed({ code: null, message: e }));
			dispatch(eventsReceived());
        }
    }
};