/**
 * SubmitButton.tsx
 */

import { Button, IconName, Intent } from '@blueprintjs/core';
import React, { useEffect } from 'react';

interface IPropTypes {
    useEnter?: boolean;
    disabled?: boolean;
    loading?: boolean;
    large?: boolean;
    minimal?: boolean;
    intent?: Intent;
    icon?: IconName;
    rightIcon?: IconName;
    text?: string;
    onClick: (event?: React.MouseEvent<HTMLElement>) => void;
}

const SubmitButton = ({
    useEnter,
    disabled,
    loading,
    large,
    minimal,
    intent,
    icon,
    rightIcon,
    text,
    onClick
}: IPropTypes): JSX.Element => {
    useEffect(() => {
        const listener = (event: KeyboardEvent): void => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                if (!disabled && useEnter && onClick) {
                    onClick();
                }
            }
        };
        document.addEventListener('keydown', listener);
        return (): void => {
            document.removeEventListener('keydown', listener);
        };
    });

    return (
        <Button
            disabled={disabled}
            loading={loading}
            large={large}
            minimal={minimal}
            intent={intent}
            icon={icon}
            rightIcon={rightIcon}
            text={text}
            onClick={onClick}
        />
    );
};

export default SubmitButton;
