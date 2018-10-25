/**
    @flow
 */

import api from '~/api';
import { createAction } from 'redux-act';
import IResult from '~/interfaces/IResult';

export const authRequested = createAction('[AUTH] Requested');
export const authRecieved = createAction('[AUTH] Received');
export const authSuccessed = createAction('[AUTH] Successed');
export const authFailed = createAction('[AUTH] Failed');
export const authLogouted = createAction('[AUTH] Logouted');

export const signin = ({ login, password }) => async (dispatch) => {
    try
    {
        dispatch(authRequested());

        const { data }: { data:IResult } = await api.post('/api/react/auth', { login, password });

        if (data.ErrorCode < 0) {
            dispatch(authFailed({ code: data.ErrorCode, message: data.ErrorString }));

        } else
        {
            localStorage.setItem('token', data.Data.XAuth);
            api.defaults.headers['XAuth'] = data.Data.XAuth;
            dispatch(authSuccessed(data.Data));
        }
    }
    catch (e)
    {
        dispatch(authFailed({ code: null, message: e }));
    }
    finally {
        dispatch(authRecieved());
    }
};

export const signup = ({ login, password, email }) => async (dispatch) => {
	try
	{
		dispatch(authRequested());

		const { data }: { data:IResult } = await api.post('/api/react/signup', { login, password, email });

		if (data.ErrorCode < 0)
			dispatch(authFailed({ code: data.ErrorCode, message: data.Data }));
		else
		{
            await signin({
                login,
                password
            })(dispatch);
		}
	}
	catch (e)
	{
		dispatch(authFailed({ code: null, message: e }));
	}
	finally {
		dispatch(authRecieved());
	}
};

export const checkAuth = () => async (dispatch) => {
    try
    {
        const { data }: { data:IResult } = await api.get('/api/react/auth');

        if (data.ErrorCode < 0) {
            dispatch(authFailed({ code: data.ErrorCode, message: data.ErrorString }));
        }
        else {
            dispatch(authSuccessed(data.Data));
        }
    }
    catch (e)
    {
        dispatch(authFailed({ code: null, message: e }));
    }
    finally {
        dispatch(authRecieved());
    }
};

export const logout = () => async (dispatch) => {
    await api.get('/api/react/logoff');
    dispatch(authLogouted());
};
