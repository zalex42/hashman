import api from '~/api';
import { createAction } from 'redux-act';

import IResult from '~/interfaces/IResult';

export const serversRequested = createAction('[SERVERS] Requested');
export const serversReceived = createAction('[SERVERS] Received');
export const serversFailed = createAction('[SERVERS] Failed');
export const serversSuccessed = createAction('[SERVERS] Successed');
export const serversCharts = createAction('[SERVERS] Charts');
export const CoolFanRequested = createAction('[SERVERS] CoolFanRequested');
export const CoolFanGConfig = createAction('[SERVERS] CoolFanGConfig');
export const CoolFanConfig = createAction('[SERVERS] CoolFanConfig');
export const CoolFanFailed = createAction('[SERVERS] CoolFanFailed');
export const CoolFanReceived = createAction('[SERVERS] CoolFanReceived');

export const getServers = () => async (dispatch) => {
    try
    {
        dispatch(serversRequested());

        const { data }: { data: IResult } = await api.get('/api/react/servers');

        if (data.ErrorCode < 0)
            dispatch(serversFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
            dispatch(serversSuccessed(data.Data));
    }
    catch (e)
    {
        dispatch(serversFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(serversReceived());
    }
};

export const getCharts = () => async (dispatch) => {
    try
    {
        dispatch(serversRequested());

        const { data }: { data:IResult } = await api.get('/api/react/infographs');

        if (data.ErrorCode < 0)
            dispatch(serversFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
            dispatch(serversCharts(data.Data));
    }
    catch (e)
    {
        dispatch(serversFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(serversReceived());
    }
};

export const getCoolFanConfig = (id) => async (dispatch) => {
    try
    {
        dispatch(CoolFanRequested());

        const { data }: { data: IResult } = await api.get(`/api/react/fan/${id}`);

        if (data.ErrorCode < 0)
            dispatch(CoolFanConfig({ code: data.ErrorCode, message: data.ErrorString }));
        else
        	dispatch(CoolFanGConfig(data.Data));
    }
    catch (e)
    {
        dispatch(CoolFanFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(CoolFanReceived());
    }
};

export const edit = (id, result) => async (dispatch) => {
    try
    {
        dispatch(CoolFanRequested());

        const { data }: { data: IResult } = await api.post(`/api/react/fan/${id}`, { servers: id, Configs: result });

        if (data.ErrorCode < 0)
            dispatch(CoolFanConfig(data.ErrorString));
        else CoolFanConfig(true);
    }
    catch (e)
    {
        dispatch(CoolFanConfig(e));
    }
    finally
    {
        dispatch(CoolFanReceived());
    }
};
