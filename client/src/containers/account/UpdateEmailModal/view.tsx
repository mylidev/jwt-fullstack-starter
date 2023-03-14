/**
 * UpdateEmailModal/view.tsx
 */

import {
    Button,
    Callout,
    Classes,
    Dialog,
    Divider,
    H3,
    Icon,
    Intent
} from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import validator from 'validator';
import EmailInput from '../../../components/EmailInput';
import PasswordInput from '../../../components/PasswordInput';
import SubmitButton from '../../../components/SubmitButton';

interface IPropTypes {
    isModalOpened: boolean;
    disabled: boolean;
    error: string;
    newEmail: string;
    confirmEmail: string;
    password: string;
    onNewEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirmEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFormSubmit: () => void;
    onModalClose: () => void;
}

const Styles = styled.div`
    padding: 1.5rem 2rem;
    position: relative;

    .close-button {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
    }

    .divider-styles {
        margin: 1rem 0rem;
    }

    .callout-styles {
        margin: 0.5rem 0rem;
    }
`;

const View = ({
    isModalOpened,
    disabled,
    error,
    newEmail,
    confirmEmail,
    password,
    onNewEmailChange,
    onConfirmEmailChange,
    onPasswordChange,
    onFormSubmit,
    onModalClose
}: IPropTypes): JSX.Element => {
    const getCalloutElement = (): undefined | JSX.Element => {
        if (validator.isEmpty(error)) {
            return undefined;
        }
        return (
            <Callout className='callout-styles' intent={Intent.DANGER}>
                {error}
            </Callout>
        );
    };

    return (
        <Dialog
            style={{ paddingBottom: '0rem' }}
            isOpen={isModalOpened}
            onClose={onModalClose}
        >
            <Styles>
                <Button
                    className={`close-button ${Classes.DIALOG_CLOSE_BUTTON}`}
                    minimal
                    icon={<Icon iconSize={20} icon='small-cross' />}
                    onClick={onModalClose}
                />
                <H3>Update E-Mail</H3>
                <Divider className='divider-styles' />
                {getCalloutElement()}
                <EmailInput
                    validate
                    label='New E-Mail'
                    value={newEmail}
                    onChange={onNewEmailChange}
                />
                <EmailInput
                    validate
                    match
                    label='Confirm New E-Mail'
                    value={confirmEmail}
                    valueToMatch={newEmail}
                    onChange={onConfirmEmailChange}
                />
                <PasswordInput
                    label='Password'
                    value={password}
                    onChange={onPasswordChange}
                />
                <SubmitButton
                    useEnter
                    disabled={disabled}
                    intent={Intent.PRIMARY}
                    text='Update'
                    onClick={onFormSubmit}
                />
            </Styles>
        </Dialog>
    );
};

export default View;
