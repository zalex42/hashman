import api from '~/api';
import { createAction } from 'redux-act';

import IResult from '~/interfaces/IResult';


export const rigRequested = createAction('[RIG] Requested');
export const rigReceived = createAction('[RIG] Received');
export const rigFailed = createAction('[RIG] Failed');
export const rigSuccessed = createAction('[RIG] Successed');
export const rigClear = createAction('[RIG] Clear');
export const rigCharts = createAction('[RIG] Charts');
export const rigEvents = createAction('[RIG] Events');

export const getRig = (id) => async (dispatch) => {
    try
    {
        dispatch(rigRequested());

        const { data }: { data: IResult } = await api.get(`/api/react/rig/${id}`);

        if (data.ErrorCode < 0)
            dispatch(rigFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
            dispatch(rigSuccessed(data.Data));
    }
    catch (e)
    {
        dispatch(rigFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(rigReceived());
    }
};

export const getChartsRig = (id) => async (dispatch) => {
    try
    {
        dispatch(rigRequested());

        const { data }: { data: IResult } = await api.get(`/api/react/infographs?r=${id}`);

        if (data.ErrorCode < 0)
            dispatch(rigFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
            dispatch(rigCharts(data.Data));
    }
    catch (e)
    {
        dispatch(rigFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(rigReceived());
    }
};


export const getEvents = (id) => async (dispatch) => {
    try
    {
        dispatch(rigRequested());

        const { data }: { data: IResult } = await api.get(`/api/react/events?r=${id}`);

        if (data.ErrorCode < 0)
            dispatch(rigFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
            dispatch(rigEvents(data.Data));
    }
    catch (e)
    {
        dispatch(rigFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(rigReceived());
    }
};