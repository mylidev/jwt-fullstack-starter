/**
 * workspace.controller.ts
 */

import { NextFunction, Request, Response } from 'express';
import errorsConfig from '../configs/errors';
import { IAccountModel } from '../models/Account';
import Workspace, { IWorkspaceModel } from '../models/Workspace';
import {
    ICreateWorkspaceRequest,
    ICreateWorkspaceResponse,
    IDeleteWorkspaceResponse,
    IGetWorkspaceDetailsResponse,
    IGetWorkspacesResponse,
    ISwitchWorkspaceResponse,
    IUpdateWorkspaceRequest,
    IUpdateWorkspaceResponse
} from '../types/protocols/workspace.protocols';

export default {
    getWorkspaces: (req: Request, res: Response, next: NextFunction): void => {
        const account = req.user as IAccountModel;
        Workspace.find({ account: account._id }, (err, workspaces) => {
            if (err) {
                return next(err);
            }
            const filteredWorkspaces = workspaces.map(workspace => {
                return {
                    _id: workspace._id,
                    account: workspace.account,
                    name: workspace.name
                };
            });
            return res.json({
                error: false,
                workspaces: filteredWorkspaces
            } as IGetWorkspacesResponse);
        });
    },

    createWorkspace: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const account = req.user as IAccountModel;
        const { name } = req.body as ICreateWorkspaceRequest;
        Workspace.create(
            { account: account._id, name },
            (err: any, workspace: IWorkspaceModel) => {
                if (err) {
                    return next(err);
                }

                Workspace.find({ account: account._id }, (err, workspaces) => {
                    if (err) {
                        return next(err);
                    }
                    const { _id, account, name } = workspace;
                    const filteredWorkspaces = workspaces.map(workspace => {
                        return {
                            _id: workspace._id,
                            account: workspace.account,
                            name: workspace.name
                        };
                    });
                    return res.json({
                        error: false,
                        newWorkspace: {
                            _id,
                            account,
                            name
                        },
                        workspaces: filteredWorkspaces
                    } as ICreateWorkspaceResponse);
                });
            }
        );
    },

    getWorkspaceDetails: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const account = req.user as IAccountModel;
        const workspaceId = req.params.id;
        Workspace.findOne(
            { _id: workspaceId, account: account._id },
            (err, workspace) => {
                if (err) {
                    return next(err);
                }
                if (!workspace) {
                    return next(errorsConfig.workspaceNotFound);
                }
                const { _id, account, name } = workspace;
                return res.json({
                    error: false,
                    workspace: {
                        _id,
                        account,
                        name
                    }
                } as IGetWorkspaceDetailsResponse);
            }
        );
    },

    updateWorkspace: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const account = req.user as IAccountModel;
        const workspaceId = req.params.id;
        const { name } = req.body as IUpdateWorkspaceRequest;
        Workspace.findOne(
            { _id: workspaceId, account: account._id },
            (err, workspace) => {
                if (err) {
                    return next(err);
                }
                if (!workspace) {
                    return next(errorsConfig.workspaceNotFound);
                }
                if (typeof name !== undefined) {
                    workspace.name = name as string;
                }
                workspace.save(err => {
                    if (err) {
                        return next(err);
                    }

                    Workspace.find(
                        { account: account._id },
                        (err, workspaces) => {
                            if (err) {
                                return next(err);
                            }
                            const { _id, account, name } = workspace;
                            const filteredWorkspaces = workspaces.map(
                                workspace => {
                                    return {
                                        _id: workspace._id,
                                        account: workspace.account,
                                        name: workspace.name
                                    };
                                }
                            );
                            return res.json({
                                error: false,
                                updatedWorkspace: {
                                    _id,
                                    account,
                                    name
                                },
                                workspaces: filteredWorkspaces
                            } as IUpdateWorkspaceResponse);
                        }
                    );
                });
            }
        );
    },

    deleteWorkspace: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const account = req.user as IAccountModel;
        const workspaceId = req.params.id;

        Workspace.find({ account: account._id }, (err, workspaces) => {
            if (err) {
                return next(err);
            }
            if (workspaces.length <= 1) {
                return next(errorsConfig.deleteNotAllowed);
            }
            Workspace.findOneAndDelete(
                { _id: workspaceId, account: account._id },
                (err, workspace) => {
                    if (err) {
                        return next(err);
                    }
                    if (!workspace) {
                        return next(errorsConfig.workspaceNotFound);
                    }

                    Workspace.find(
                        { account: account._id },
                        (err, workspaces) => {
                            if (err) {
                                return next(err);
                            }
                            const filteredWorkspaces = workspaces.map(
                                workspace => {
                                    return {
                                        _id: workspace._id,
                                        account: workspace.account,
                                        name: workspace.name
                                    };
                                }
                            );

                            if (account.lastUsedWorkspace == workspaceId) {
                                account.lastUsedWorkspace = workspaces[0]._id;
                                account.save(err => {
                                    if (err) {
                                        return next(err);
                                    }
                                    return res.json({
                                        error: false,
                                        currentWorkspaceId:
                                            account.lastUsedWorkspace,
                                        workspaces: filteredWorkspaces
                                    } as IDeleteWorkspaceResponse);
                                });
                            } else {
                                return res.json({
                                    error: false,
                                    currentWorkspaceId:
                                        account.lastUsedWorkspace,
                                    workspaces: filteredWorkspaces
                                } as IDeleteWorkspaceResponse);
                            }
                        }
                    );
                }
            );
        });
    },

    switchWorkspace: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const account = req.user as IAccountModel;
        const workspaceId = req.params.id;

        account.lastUsedWorkspace = workspaceId;
        account.save(err => {
            if (err) {
                return next(err);
            }
            return res.json({
                error: false,
                currentWorkspaceId: workspaceId
            } as ISwitchWorkspaceResponse);
        });
    }
};
