/**
 * ChangePasswordModal/view.tsx
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
import PasswordInput from '../../../components/PasswordInput';
import SubmitButton from '../../../components/SubmitButton';

interface IPropTypes {
    isModalOpened: boolean;
    disabled: boolean;
    error: string;
    newPassword: string;
    confirmNewPassword: string;
    currentPassword: string;
    onNewPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirmNewPasswordChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    onCurrentPasswordChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    onFormSubmit: () => void;
    onModalClose: () => void;
}

const Styles = styled.div`
    padding: 2rem;
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
    newPassword,
    confirmNewPassword,
    currentPassword,
    onNewPasswordChange,
    onConfirmNewPasswordChange,
    onCurrentPasswordChange,
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
                <H3>Change Password</H3>
                <Divider className='divider-styles' />
                {getCalloutElement()}
                <PasswordInput
                    validate
                    label='New Password'
                    value={newPassword}
                    onChange={onNewPasswordChange}
                />
                <PasswordInput
                    validate
                    match
                    label='Confirm New Password'
                    value={confirmNewPassword}
                    valueToMatch={newPassword}
                    onChange={onConfirmNewPasswordChange}
                />
                <PasswordInput
                    label='Current Password'
                    value={currentPassword}
                    onChange={onCurrentPasswordChange}
                />
                <SubmitButton
                    useEnter
                    disabled={disabled}
                    intent={Intent.PRIMARY}
                    text='Change'
                    onClick={onFormSubmit}
                />
            </Styles>
        </Dialog>
    );
};

export default View;
