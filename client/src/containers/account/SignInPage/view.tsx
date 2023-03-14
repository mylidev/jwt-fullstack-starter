/**
 * SignInPage/view.tsx
 */

import {
    Callout,
    Card,
    Checkbox,
    Divider,
    H3,
    Intent
} from '@blueprintjs/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import validator from 'validator';
import EmailInput from '../../../components/EmailInput';
import PasswordInput from '../../../components/PasswordInput';
import SubmitButton from '../../../components/SubmitButton';

interface IPropTypes {
    disabled: boolean;
    error: string;
    email: string;
    password: string;
    rememberMe: boolean;
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRememberMeToggle: () => void;
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
`;

const View = ({
    disabled,
    error,
    email,
    password,
    rememberMe,
    onEmailChange,
    onPasswordChange,
    onRememberMeToggle,
    onFormSubmit
}: IPropTypes): JSX.Element => {
    const getCalloutElement = (): undefined | JSX.Element => {
        if (validator.isEmpty(error)) {
            return (
                <Callout className='callout-styles' intent={Intent.NONE}>
                    You can sign up using a fake E-mail to test this demo.
                </Callout>
            );
        }
        return (
            <Callout className='callout-styles' intent={Intent.DANGER}>
                {error}
            </Callout>
        );
    };

    return (
        <Styles>
            <Card className='card-styles'>
                <H3>Sign In</H3>
                {getCalloutElement()}
                <EmailInput
                    label='E-Mail'
                    value={email}
                    onChange={onEmailChange}
                />
                <PasswordInput
                    label='Password'
                    value={password}
                    onChange={onPasswordChange}
                />
                <Checkbox
                    label='Remember Me'
                    checked={rememberMe}
                    onClick={onRememberMeToggle}
                />
                <SubmitButton
                    useEnter
                    disabled={disabled}
                    icon='log-in'
                    text='Sign In'
                    onClick={onFormSubmit}
                />
                <Divider className='divider-styles' />
                <Link to='/forgot'>Forgot Password?</Link>
                <br />
                <Link to='/signup'>{`Don't have an account?`}</Link>
            </Card>
        </Styles>
    );
};

export default View;
