/**
 * ForgotPasswordPage/view.tsx
 */

import { Callout, Card, Divider, H3, Intent } from '@blueprintjs/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import validator from 'validator';
import EmailInput from '../../../components/EmailInput';
import SubmitButton from '../../../components/SubmitButton';

interface IPropTypes {
    submitted: boolean;
    disabled: boolean;
    error: string;
    email: string;
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    submitted,
    disabled,
    error,
    email,
    onEmailChange,
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
        if (submitted) {
            return (
                <Callout className='callout-styles' intent={Intent.SUCCESS}>
                    Success. A password reset E-mail would be sent under
                    normal circumstances.
                    <br />
                    <Link to='/signin'>Back To Sign In</Link>
                </Callout>
            );
        }
        return (
            <Callout className='callout-styles' intent={Intent.NONE}>
                The nodemailer service is not linked up to an actual mail service
                for this demo, so you won't actually receive a password reset email.
            </Callout>
        );
    };

    const getFormContent = (): React.ReactNode => {
        return (
            <div>
                {getCalloutElement()}
                <EmailInput
                    label='E-Mail'
                    value={email}
                    onChange={onEmailChange}
                />
                <SubmitButton
                    useEnter
                    disabled={disabled}
                    icon='log-in'
                    text='Send Reset E-Mail'
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
                <H3>Forgot Password</H3>
                {getFormContent()}
            </Card>
        </Styles>
    );
};

export default View;
