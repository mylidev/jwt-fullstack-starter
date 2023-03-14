/**
 * Router.tsx
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ForgotPasswordPage from '../containers/account/ForgotPasswordPage';
import ResetPasswordPage from '../containers/account/ResetPasswordPage';
import SignInPage from '../containers/account/SignInPage';
import SignUpPage from '../containers/account/SignUpPage';
import ApplicationPage from '../containers/system/ApplicationPage';
import { accountStatusSelector } from '../selectors/account.selectors';
import { getAccountDetailsThunk } from '../thunks/account.thunks';
import LoadingPage from './system/LoadingPage';

const Router = (): JSX.Element => {
    const dispatch = useDispatch();

    const accountStatus = useSelector(accountStatusSelector);

    useEffect(() => {
        if (accountStatus === undefined) {
            dispatch(getAccountDetailsThunk());
        }
        // eslint-disable-next-line
    }, []);

    if (accountStatus === undefined) {
        return <LoadingPage />;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/app'>
                    {accountStatus ? (
                        <ApplicationPage />
                    ) : (
                        <Redirect to='/signup' />
                    )}
                </Route>
                <Route path='/signup'>
                    {accountStatus ? <Redirect to='/app' /> : <SignUpPage />}
                </Route>
                <Route path='/signin'>
                    {accountStatus ? <Redirect to='/app' /> : <SignInPage />}
                </Route>
                <Route path='/forgot'>
                    {accountStatus ? (
                        <Redirect to='/app' />
                    ) : (
                        <ForgotPasswordPage />
                    )}
                </Route>
                <Route path='/reset/:_id/:token'>
                    {accountStatus ? (
                        <Redirect to='/app' />
                    ) : (
                        <ResetPasswordPage />
                    )}
                </Route>
                <Redirect to='/signup' />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
