/**
 * ResetPasswordPage/view.tsx
 */

import { Callout, Card, Divider, H3, Intent, Spinner } from '@blueprintjs/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import validator from 'validator';
import PasswordInput from '../../../components/PasswordInput';
import SubmitButton from '../../../components/SubmitButton';

interface IPropTypes {
    verified: undefined | boolean;
    submitted: boolean;
    disabled: boolean;
    error: string;
    newPassword: string;
    confirmNewPassword: string;
    onNewPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirmNewPasswordChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    onFormSubmit: (event?: React.MouseEvent<HTMLElement>) => void;
}

const Styles = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .card-styles {
        min-height: 35rem;
        width: 25rem;
    }

    .callout-styles {
        margin: 0.5rem 0rem;
    }

    .divider-styles {
        margin: 1rem 0rem;
    }

    .spinner-styles {
        margin: 3rem;
    }
`;

const View = ({
    verified,
    submitted,
    disabled,
    error,
    newPassword,
    confirmNewPassword,
    onNewPasswordChange,
    onConfirmNewPasswordChange,
    onFormSubmit
}: IPropTypes): JSX.Element => {
    const getCalloutElement = (): undefined | JSX.Element => {
        if (!validator.isEmpty(error)) {
            return (
                <Callout className='callout-styles' intent={Intent.DANGER}>
                    {error}
                </Callout>
            );
        }
        if (!verified) {
            return (
                <Callout className='callout-styles' intent={Intent.DANGER}>
                    Recovery link is invalid, please request another link.
                    <br />
                    <Link to='/forgot'>Request Another Link</Link>
                </Callout>
            );
        }
        if (submitted) {
            return (
                <Callout className='callout-styles' intent={Intent.SUCCESS}>
                    Successfully reset password!
                    <br />
                    <Link to='/signin'>Back To Sign In</Link>
                </Callout>
            );
        }
        return undefined;
    };

    const getFormContent = (): React.ReactNode => {
        if (verified === undefined) {
            return <Spinner className='spinner-styles' size={64} />;
        }

        return (
            <div>
                {getCalloutElement()}
                <PasswordInput
                    validate
                    disabled={(!verified || submitted || error) as boolean}
                    label='New Password'
                    value={newPassword}
                    onChange={onNewPasswordChange}
                />
                <PasswordInput
                    validate
                    match
                    disabled={(!verified || submitted || error) as boolean}
                    label='Confirm New Password'
                    value={confirmNewPassword}
                    valueToMatch={newPassword}
                    onChange={onConfirmNewPasswordChange}
                />
                <SubmitButton
                    useEnter
                    disabled={disabled}
                    icon='log-in'
                    text='Reset Password'
                    onClick={onFormSubmit}
                />
                <Divider className='divider-styles' />
                <Link to='/signin'>Remembered your password?</Link>
                <br />
                <Link to='/signup'>{`Don't have an account?`}</Link>
            </div>
        );
    };

    return (
        <Styles>
            <Card className='card-styles'>
                <H3>Reset Password</H3>
                {getFormContent()}
            </Card>
        </Styles>
    );
};

export default View;
