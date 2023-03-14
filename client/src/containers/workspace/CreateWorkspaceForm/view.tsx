/**
 * CreateWorkspaceForm/view.tsx
 */

import { Button, EditableText, Intent } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';

interface IPropTypes {
    disabled: boolean;
    name: string;
    onNameChange: (value: string) => void;
    onNameConfirm: (value: string) => void;
    onNameCancel: (value: string) => void;
    onFormSubmit: () => void;
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
    disabled,
    name,
    onNameChange,
    onNameConfirm,
    onNameCancel,
    onFormSubmit
}: IPropTypes): JSX.Element => {
    return (
        <Styles>
            <EditableText
                className='editable-text-styles'
                confirmOnEnterKey
                maxLength={38}
                minWidth={900}
                value={name}
                placeholder='Enter new workspace name...'
                onChange={onNameChange}
                onConfirm={onNameConfirm}
                onCancel={onNameCancel}
            />
            <Button
                className='button-styles'
                disabled={disabled}
                intent={Intent.SUCCESS}
                icon='add'
                text='Create'
                onClick={onFormSubmit}
            />
        </Styles>
    );
};

export default View;
