import api from '~/api';
import { createAction } from 'redux-act';

import IResult from '~/interfaces/IResult';

export const reportsRequested = createAction('[RIGS] Requested');
export const reportsReceived = createAction('[RIGS] Received');
export const reportsFailed = createAction('[RIGS] Failed');
export const reportsSuccessed = createAction('[RIGS] Successed');

export const getReports = (from, to) => async (dispatch) => {
    try
    {
        dispatch(reportsRequested());

        const { data }: { data: IResult } = await api.post(`/api/react/report`, { fromDate: from, toDate: to });

        if (data.ErrorCode < 0)
            dispatch(reportsFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
            dispatch(reportsSuccessed(data.Data));
    }
    catch (e)
    {
        dispatch(reportsFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(reportsReceived());
    }
};