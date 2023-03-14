/**
 * DeleteAccountModal/view.tsx
 */

import {
    Alert,
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
import PasswordInput from '../../../components/PasswordInput';
import SubmitButton from '../../../components/SubmitButton';

interface IPropTypes {
    isModalOpened: boolean;
    isAlertOpened: boolean;
    disabled: boolean;
    error: string;
    password: string;
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFormSubmit: () => void;
    onModalClose: () => void;
    onAlertConfirm: () => void;
    onAlertCancel: () => void;
}

const Styles = styled.div`
    padding: 2rem;
    position: relative;

    .close-button {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
    }

    .callout-styles {
        margin: 0.5rem 0rem;
    }

    .divider-styles {
        margin: 1rem 0rem;
    }

    .red {
        color: red;
    }
`;

const View = ({
    isModalOpened,
    isAlertOpened,
    disabled,
    error,
    password,
    onPasswordChange,
    onFormSubmit,
    onModalClose,
    onAlertConfirm,
    onAlertCancel
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
                <H3>Delete Account</H3>
                <p className='red'>You cannot undo this action!</p>
                <Divider className='divider-styles' />
                {getCalloutElement()}
                <PasswordInput
                    label='Password'
                    value={password}
                    onChange={onPasswordChange}
                />
                <SubmitButton
                    useEnter
                    disabled={disabled}
                    intent={Intent.PRIMARY}
                    text='Delete'
                    onClick={onFormSubmit}
                />
                <Alert
                    isOpen={isAlertOpened}
                    intent={Intent.DANGER}
                    icon='delete'
                    confirmButtonText='Confirm'
                    cancelButtonText='Cancel'
                    onConfirm={onAlertConfirm}
                    onCancel={onAlertCancel}
                >
                    You are about to permanently delete your account!
                </Alert>
            </Styles>
        </Dialog>
    );
};

export default View;
