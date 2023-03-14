/**
 * UpdateAndDeleteWorkspaceForm/view.tsx
 */

import {
    Button,
    EditableText,
    Intent,
    Divider,
    H5,
    Alert
} from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';

interface IPropTypes {
    isAlertOpened: boolean;
    disabled: boolean;
    name: string;
    namePlaceholder: string;
    onNameChange: (value: string) => void;
    onNameConfirm: (value: string) => void;
    onNameCancel: (value: string) => void;
    onUpdateButtonClick: () => void;
    onDeleteButtonClick: () => void;
    onAlertConfirm: () => void;
    onAlertCancel: () => void;
}

const Styles = styled.div`
    padding: 1rem;

    .editable-text-styles {
        height: 40px;
        font-size: x-large;
        font-weight: bold;
    }

    .button-styles {
        margin: 1rem 0rem;
    }

    .divider-styles {
        margin: 1rem 0rem;
    }
`;

const View = ({
    isAlertOpened,
    disabled,
    name,
    namePlaceholder,
    onNameChange,
    onNameConfirm,
    onNameCancel,
    onUpdateButtonClick,
    onDeleteButtonClick,
    onAlertConfirm,
    onAlertCancel
}: IPropTypes): JSX.Element => {
    return (
        <Styles>
            <EditableText
                className='editable-text-styles'
                confirmOnEnterKey
                maxLength={38}
                minWidth={900}
                value={name}
                placeholder={namePlaceholder}
                onChange={onNameChange}
                onConfirm={onNameConfirm}
                onCancel={onNameCancel}
            />
            <Button
                className='button-styles'
                disabled={disabled}
                intent={Intent.PRIMARY}
                icon='upload'
                text='Update'
                onClick={onUpdateButtonClick}
            />
            <Divider className='divider-styles' />
            <H5>DANGER ZONE</H5>
            <Button
                className='button-styles'
                intent={Intent.DANGER}
                icon='delete'
                text='Delete'
                onClick={onDeleteButtonClick}
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
                You are about to permanently this workspace!
            </Alert>
        </Styles>
    );
};

export default View;
