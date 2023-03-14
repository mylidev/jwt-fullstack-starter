/**
 * PasswordInput.tsx
 */

import {
    Button,
    FormGroup,
    IconName,
    InputGroup,
    Position,
    Tooltip
} from '@blueprintjs/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import validator from 'validator';

interface IPropTypes {
    validate?: boolean;
    match?: boolean;
    disabled?: boolean;
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

const PasswordInput = ({
    validate,
    match,
    disabled,
    label,
    placeholder,
    value,
    valueToMatch,
    onChange
}: IPropTypes): JSX.Element => {
    const [isObscured, setIsObscured] = useState(true);

    const getTooltipText = (): string => {
        let prefix: string;
        if (isObscured) {
            prefix = 'Show';
        } else {
            prefix = 'Hide';
        }
        return `${prefix} Password`;
    };

    const getTooltipIcon = (): IconName => {
        if (isObscured) {
            return 'eye-open';
        }
        return 'eye-off';
    };

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
            !validator.isLength(value, { min: 8 })
        );
    };

    const getValidationTooltipLabel = (): string => {
        if (match) {
            return 'Password does not match!';
        }
        return 'Password too short!';
    };

    const getInputType = (): string => {
        if (isObscured) {
            return 'password';
        } else {
            return 'text';
        }
    };

    const handleIsObscuredToggle = (): void => {
        setIsObscured(!isObscured);
    };

    const isObscuredToggleButton = (
        <Tooltip content={getTooltipText()}>
            <Button
                minimal
                icon={getTooltipIcon()}
                onClick={handleIsObscuredToggle}
            />
        </Tooltip>
    );

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
                        type={getInputType()}
                        disabled={disabled}
                        placeholder={placeholder}
                        rightElement={isObscuredToggleButton}
                        value={value}
                        onChange={onChange}
                    />
                </Tooltip>
            </FormGroup>
        </Styles>
    );
};

export default PasswordInput;
