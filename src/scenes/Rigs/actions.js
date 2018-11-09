import api from '~/api';
import { createAction } from 'redux-act';

import IResult from '~/interfaces/IResult';

export const rigsRequested = createAction('[RIGS] Requested');
export const rigsReceived = createAction('[RIGS] Received');
export const rigsFailed = createAction('[RIGS] Failed');
export const rigsSuccessed = createAction('[RIGS] Successed');
export const rigsClear = createAction('[RIGS] Clear');
export const rigsCharts = createAction('[RIGS] Charts');
export const rigsGConfig = createAction('[RIGS] GConfig');
export const rigsConfig = createAction('[RIGS] Config');

export const getRigs = (id) => async (dispatch) => {
    if (global.disableAutoRefresh!=true) {
    try
    {
        dispatch(rigsRequested());

        const { data }: { data: IResult } = await api.get(`/api/react/rigs/${id}`);

        if (data.ErrorCode < 0)
            dispatch(rigsFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
            dispatch(rigsSuccessed(data.Data));
    }
    catch (e)
    {
        dispatch(rigsFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(rigsReceived());
    }}
};

export const getCharts = (id, firstLaunch) => async (dispatch) => {
    if (global.disableAutoRefresh!=true) {
        try
    {
        dispatch(rigsRequested());

        const { data }: { data: IResult } = await api.get(`/api/react/infographs?s=${id}`);

        if (data.ErrorCode < 0)
            dispatch(rigsFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
            dispatch(rigsCharts(data.Data));
    }
    catch (e)
    {
        dispatch(rigsFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(rigsReceived());
    }
}
};

export const reboot = (ids) => async (dispatch) => {
    try
    {
        dispatch(rigsRequested());

        const { data }: { data: IResult } = await api.post(`/api/react/reboot`, { rigs: ids });

		if (data.ErrorCode < 0)
			dispatch(rigsConfig(data.ErrorString));
		else rigsConfig(true);
    }
    catch (e)
    {
		dispatch(rigsConfig(e));
    }
    finally
    {
        dispatch(rigsReceived());
    }
};

export const deleteH = (ids) => async (dispatch) => {
    try
    {
        dispatch(rigsRequested());

        const { data }: { data: IResult } = await api.post(`/api/react/delete`, { rigs: ids });

		if (data.ErrorCode < 0)
			dispatch(rigsConfig(data.ErrorString));
		else rigsConfig(true);
    }
    catch (e)
    {
		dispatch(rigsConfig(e));
    }
    finally
    {
        dispatch(rigsReceived());
    }
};

export const edit = (ids, result) => async (dispatch) => {
    try
    {
        dispatch(rigsRequested());

        const { data }: { data: IResult } = await api.post(`/api/react/config`, { rigs: ids, Configs: result });

        if (data.ErrorCode < 0)
            dispatch(rigsConfig(data.ErrorString));
        else rigsConfig(true);
    }
    catch (e)
    {
        dispatch(rigsConfig(e));
    }
    finally
    {
        dispatch(rigsReceived());
    }
};

export const getGConfig = (ids) => async (dispatch) => {
    try
    {
        dispatch(rigsRequested());

        const { data }: { data: IResult } = await api.post(`/api/react/gconfig`, { rigs: ids });

        if (data.ErrorCode < 0)
            dispatch(rigsConfig({ code: data.ErrorCode, message: data.ErrorString }));
        else
        	dispatch(rigsGConfig(data.Data));
    }
    catch (e)
    {
        dispatch(rigsFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(rigsReceived());
    }
};