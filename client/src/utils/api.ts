/**
 * api.ts
 */

import axios from 'axios';
import { REQUEST_TIMEOUT_DURATION } from '../configs/numbers';
import { API_BASE_URL, REQUEST_TIMEOUT_MESSAGE } from '../configs/strings';
import { updateJwtsFailure } from '../slices/account.slice';
import { store } from '../store';
import { IAxiosError, isAxiosError } from '../types/axios.types';
import { ErrorStatus } from '../types/protocols/error.protocols';

const config = {
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT_DURATION,
    timeoutErrorMessage: REQUEST_TIMEOUT_MESSAGE,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
};

const restoreClient = axios.create(config);
const refreshClient = axios.create(config);
const requestClient = axios.create(config);

refreshClient.interceptors.response.use(undefined, async (err: IAxiosError) => {
    if (
        err.response &&
        err.response.status === ErrorStatus.InvalidJwt &&
        err.config &&
        !err.config._retrying
    ) {
        try {
            await restoreClient.get('/account/restore');
            err.config._retrying = true;
            return true;
        } catch (err) {
            if (
                isAxiosError(err) &&
                err.response &&
                err.response.status === ErrorStatus.InvalidJwt
            ) {
                store.dispatch(updateJwtsFailure());
            }
            return Promise.reject(err);
        }
    }
    return Promise.reject(err);
});

requestClient.interceptors.response.use(undefined, async (err: IAxiosError) => {
    if (
        err.response &&
        err.response.status === ErrorStatus.InvalidJwt &&
        err.config &&
        !err.config._retrying
    ) {
        const refreshConfig = err.config;
        refreshConfig.initialConfig = err.config;
        try {
            await refreshClient.get('/account/refresh', refreshConfig);
            err.config._retrying = true;
            return requestClient(err.config);
        } catch (err) {
            return Promise.reject(err);
        }
    }
    return Promise.reject(err);
});

export default requestClient;
export const publicClient = axios.create(config);
