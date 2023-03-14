/**
 * axios.types.ts
 */

import { AxiosError, AxiosRequestConfig } from 'axios';

export interface IAxiosRequestConfig extends AxiosRequestConfig {
    _retrying?: boolean;
    initialConfig?: IAxiosRequestConfig;
}

export interface IAxiosError extends AxiosError {
    config: IAxiosRequestConfig;
}

export const isAxiosError = (object: any): object is IAxiosError => {
    return (object as IAxiosError).response?.status !== undefined;
};
