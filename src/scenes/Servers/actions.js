import api from '~/api';
import { createAction } from 'redux-act';

import IResult from '~/interfaces/IResult';

export const serversRequested = createAction('[SERVERS] Requested');
export const serversReceived = createAction('[SERVERS] Received');
export const serversFailed = createAction('[SERVERS] Failed');
export const serversSuccessed = createAction('[SERVERS] Successed');
export const serversCharts = createAction('[SERVERS] Charts');
export const serversChartsUpdate = createAction('[SERVERS] ChartsUpdate');
export const CoolFanRequested = createAction('[SERVERS] CoolFanRequested');
export const CoolFanGConfig = createAction('[SERVERS] CoolFanGConfig');
export const CoolFanConfig = createAction('[SERVERS] CoolFanConfig');
export const CoolFanFailed = createAction('[SERVERS] CoolFanFailed');
export const CoolFanReceived = createAction('[SERVERS] CoolFanReceived');
export const PowerRequested = createAction('[SERVERS] PowerRequested');
export const PowerGConfig = createAction('[SERVERS] PowerGConfig');
export const PowerConfig = createAction('[SERVERS] PowerConfig');
export const PowerFailed = createAction('[SERVERS] PowerFailed');
export const PowerReceived = createAction('[SERVERS] PowerReceived');

export const getServers = () => async (dispatch) => {
    if (global.disableAutoRefresh!=true) {
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
}
};

export const getCharts = (firstLaunch) => async (dispatch) => {
    if (global.disableAutoRefresh!=true) {
        try
    {
        dispatch(serversRequested());
            const { data }: { data:IResult } = await api.get(`/api/react/infographs${firstLaunch == false ? '?u=1' : ''}`);


        if (data.ErrorCode < 0)
            dispatch(serversFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
        {firstLaunch == false ?
            dispatch(serversChartsUpdate(data.Data)):
            dispatch(serversCharts(data.Data))

        };
    }
    catch (e)
    {
        dispatch(serversFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(serversReceived());
    }
}
};

export const getCharts2 = (id, firstLaunch) => async (dispatch) => {
    if (global.disableAutoRefresh!=true) {
        try
    {
        dispatch(serversRequested());

        const { data }: { data:IResult } = await api.get(`/api/react/infographs?s=${id}${firstLaunch == false ? '&u=1' : ''}`);

        if (data.ErrorCode < 0)
            dispatch(serversFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
        {firstLaunch == false ?
            dispatch(serversChartsUpdate(data.Data)):
            dispatch(serversCharts(data.Data))

        };
    }
    catch (e)
    {
        dispatch(serversFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(serversReceived());
    }
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

export const getPowerConfig = (id) => async (dispatch) => {
    try
    {
        dispatch(PowerRequested());

        const { data }: { data: IResult } = await api.get(`/api/react/power/${id}`);

        if (data.ErrorCode < 0)
            dispatch(PowerConfig({ code: data.ErrorCode, message: data.ErrorString }));
        else
        	dispatch(PowerGConfig(data.Data));
    }
    catch (e)
    {
        dispatch(PowerFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(PowerReceived());
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

export const editPower = (id, result) => async (dispatch) => {
    try
    {
        dispatch(PowerRequested());

        const { data }: { data: IResult } = await api.post(`/api/react/power/${id}`, { servers: id, Configs: result });

        if (data.ErrorCode < 0)
            dispatch(PowerConfig(data.ErrorString));
        else PowerConfig(true);
    }
    catch (e)
    {
        dispatch(PowerConfig(e));
    }
    finally
    {
        dispatch(PowerReceived());
    }
};
