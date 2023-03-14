/**
 * object.controllers.ts
 */

import { NextFunction, Request, Response } from 'express';

export default {
    // getObjectsByFilter (Excl. Data)
    getObjectsByFilter: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        res.send('getObjectsByFilter');
        return;
    },

    // getObjectDetails (Incl. Data)
    getObjectDetails: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        res.send('getObjectDetails');
        return;
    },

    // createObject
    createObject: (req: Request, res: Response, next: NextFunction): void => {
        res.send('createObject');
        return;
    },

    // updateObject (Incl. Updating of Data)
    updateObject: (req: Request, res: Response, next: NextFunction): void => {
        res.send('updateObject');
        return;
    },

    // deleteObject
    deleteObject: (req: Request, res: Response, next: NextFunction): void => {
        res.send('deleteObject');
        return;
    },

    // getTemplatesByAccount
    getTemplatesByAccount: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        res.send('getTemplatesByAccount');
        return;
    },

    // getTemplateDetails
    getTemplateDetails: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        res.send('getTemplatesDetails');
        return;
    },

    // createTemplate
    createTemplate: (req: Request, res: Response, next: NextFunction): void => {
        res.send('createTemplate');
        return;
    },

    // updateTemplate
    updateTemplate: (req: Request, res: Response, next: NextFunction): void => {
        res.send('updateTemplate');
        return;
    },

    // deleteTemplate
    deleteTemplate: (req: Request, res: Response, next: NextFunction): void => {
        res.send('deleteTemplate');
        return;
    }
};
