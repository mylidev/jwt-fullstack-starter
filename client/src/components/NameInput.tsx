/**
 * NameInput.tsx
 */

import { FormGroup, InputGroup } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';

interface IPropTypes {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Styles = styled.div``;

const NameInput = ({
    label,
    placeholder,
    value,
    onChange
}: IPropTypes): JSX.Element => {
    return (
        <Styles>
            <FormGroup label={label}>
                <InputGroup
                    type='text'
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </FormGroup>
        </Styles>
    );
};

export default NameInput;
