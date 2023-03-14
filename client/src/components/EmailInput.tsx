/**
 * EmailInput.tsx
 */

import { FormGroup, InputGroup, Position, Tooltip } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import validator from 'validator';

interface IPropTypes {
    validate?: boolean;
    match?: boolean;
    label: string;
    placeholder?: string;
    value: string;
    valueToMatch?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Styles = styled.div`
    .tooltip-styles {
        width: 100%;
    }
`;

const EmailInput = ({
    validate,
    match,
    label,
    placeholder,
    value,
    valueToMatch,
    onChange
}: IPropTypes): JSX.Element => {
    const getValidationTooltipStatus = (): boolean => {
        if (match) {
            return (
                validate === true &&
                !validator.isEmpty(value) &&
                value !== valueToMatch
            );
        }
        return (
            validate === true &&
            !validator.isEmpty(value) &&
            !validator.isEmail(value)
        );
    };

    const getValidationTooltipLabel = (): string => {
        if (match) {
            return 'E-Mail does not match!';
        }
        return 'Must be a valid E-Mail address!';
    };

    return (
        <Styles>
            <FormGroup label={label}>
                <Tooltip
                    targetClassName='tooltip-styles'
                    position={Position.RIGHT}
                    isOpen={getValidationTooltipStatus()}
                    content={getValidationTooltipLabel()}
                >
                    <InputGroup
                        type='text'
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                </Tooltip>
            </FormGroup>
        </Styles>
    );
};

export default EmailInput;
