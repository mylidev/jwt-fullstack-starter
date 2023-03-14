/**
 * AccountSettingsForm/view.tsx
 */

import { Button, Divider, H3, H5, Intent } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import NameInput from '../../../components/NameInput';
import SubmitButton from '../../../components/SubmitButton';
import ChangePasswordModal from '../ChangePasswordModal';
import DeleteAccountModal from '../DeleteAccountModal';
import UpdateEmailModal from '../UpdateEmailModal';

interface IPropTypes {
    disabled: boolean;
    name: string;
    namePlaceholder: string;
    email: string;
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFormSubmit: () => void;
    onUpdateEmailButtonClick: () => void;
    onChangePasswordButtonClick: () => void;
    onDeleteAccountButtonClick: () => void;
}

const Styles = styled.div`
    height: 100%;
    width: 100%;
    padding: calc(1rem - 5px);

    .email-button-styles {
        margin: 0rem 0.5rem;
    }

    .divider-styles {
        margin: 1rem 0rem;
    }
`;

const View = ({
    disabled,
    name,
    namePlaceholder,
    email,
    onNameChange,
    onFormSubmit,
    onUpdateEmailButtonClick,
    onChangePasswordButtonClick,
    onDeleteAccountButtonClick
}: IPropTypes): JSX.Element => {
    return (
        <Styles>
            <H3>Account</H3>
            <NameInput
                label='Name'
                placeholder={namePlaceholder}
                value={name}
                onChange={onNameChange}
            />
            <SubmitButton
                disabled={disabled}
                text='Update'
                onClick={onFormSubmit}
            />
            <Divider className='divider-styles' />
            <H5>Update E-Mail</H5>
            {email}
            <Button
                className='email-button-styles'
                minimal
                intent={Intent.PRIMARY}
                text='Update'
                onClick={onUpdateEmailButtonClick}
            />
            <Divider className='divider-styles' />
            <H5>Change Password</H5>
            ••••••••
            <Button
                className='email-button-styles'
                minimal
                intent={Intent.PRIMARY}
                text='Change'
                onClick={onChangePasswordButtonClick}
            />
            <Divider className='divider-styles' />
            <H5>Delete Account</H5>
            <Button
                intent={Intent.DANGER}
                text='Delete'
                onClick={onDeleteAccountButtonClick}
            />
            <UpdateEmailModal />
            <ChangePasswordModal />
            <DeleteAccountModal />
        </Styles>
    );
};

export default View;
