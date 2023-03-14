/**
 * error.ts
 */

import { Intent } from '@blueprintjs/core';
import { AxiosError } from 'axios';
import { ErrorType, IErrorResponse } from '../types/protocols/error.protocols';
import toast from './toast';

export default (error: AxiosError): IErrorResponse => {
    if (!error.response) {
        toast('warning-sign', Intent.DANGER, error.message);
        return {
            error: true,
            type: ErrorType.Ephemeral,
            message: error.message
        };
    }

    const apiError = error.response.data as IErrorResponse;

    if (apiError.error) {
        if (apiError.type === ErrorType.Ephemeral) {
            toast('warning-sign', Intent.DANGER, apiError.message);
        }
        return apiError;
    }

    throw new Error('API call resulted in an unexpected error.');
};
