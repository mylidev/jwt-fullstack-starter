/**
 * ApplicationPage/index.tsx
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountSelector } from '../../../selectors/account.selectors';
import { setCurrentWorkspace } from '../../../slices/workspace.slice';
import { getWorkspacesThunk } from '../../../thunks/workspace.thunks';
import { IAccount } from '../../../types/account.types';
import View from './view';

const ApplicationPage = (): JSX.Element => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const account = useSelector(accountSelector);

    useEffect(() => {
        const asyncEffect = async (): Promise<void> => {
            // eslint-disable-next-line @typescript-eslint/await-thenable
            await dispatch(getWorkspacesThunk());
            // eslint-disable-next-line @typescript-eslint/await-thenable
            await dispatch(
                setCurrentWorkspace({
                    workspaceId: (account as IAccount).lastUsedWorkspace
                })
            );
            setLoading(false);
        };
        void asyncEffect();
        // eslint-disable-next-line
    }, []);

    return <View loading={loading} />;
};

export default ApplicationPage;
