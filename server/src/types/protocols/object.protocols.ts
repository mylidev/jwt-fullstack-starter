/**
 * object.protocols.ts
 */

/* ENUMERATIONS */
export enum FieldType {
    String = 'string',
    Number = 'number',
    Boolean = 'boolean'
}

/* REQUESTS */
export interface IGetObjectsByFilterRequest {
    filter: string;
}
export interface ICreateObjectRequest {
    workspace: string;
    name: string;
    fields: Array<{
        _id: string;
        name: string;
        type: FieldType;
    }>;
}
export interface IUpdateObjectRequest {
    name: string;
    fields: Array<{
        _id: string;
        name: string;
        type: FieldType;
    }>;
}

export interface ICreateTemplateRequest {
    workspace: string;
    name: string;
    fields: Array<{
        _id: string;
        name: string;
        type: FieldType;
    }>;
}

export interface IUpdateTemplateRequest {
    name: string;
    fields: Array<{
        _id: string;
        name: string;
        type: FieldType;
    }>;
}

/* RESPONSES */
export interface IGetObjectsByFilterResponse {
    error: boolean;
    objects: Array<{
        _id: string;
        workspace: string;
        name: string;
        fields: Array<{
            _id: string;
            name: string;
            type: FieldType;
        }>;
    }>;
}
export interface IGetObjectDetailsResponse {
    error: boolean;
    object: {
        _id: string;
        workspace: string;
        name: string;
        fields: Array<{
            _id: string;
            name: string;
            type: FieldType;
        }>;
    };
}
export interface ICreateObjectResponse {
    error: boolean;
    object: {
        _id: string;
        workspace: string;
        name: string;
        fields: Array<{
            _id: string;
            name: string;
            type: FieldType;
        }>;
    };
}
export interface IUpdateObjectResponse {
    error: boolean;
    object: {
        _id: string;
        workspace: string;
        name: string;
        fields: Array<{
            _id: string;
            name: string;
            type: FieldType;
        }>;
    };
}
export interface IDeleteObjectResponse {
    error: boolean;
    object: {
        _id: string;
        workspace: string;
        name: string;
        fields: Array<{
            _id: string;
            name: string;
            type: FieldType;
        }>;
    };
}

export interface IGetTemplatesByAccountResponse {
    error: boolean;
    objects: Array<{
        _id: string;
        workspace: string;
        name: string;
        fields: Array<{
            _id: string;
            name: string;
            type: FieldType;
        }>;
    }>;
}

export interface IGetTemplateDetailsResponse {
    error: boolean;
    object: {
        _id: string;
        workspace: string;
        name: string;
        fields: Array<{
            _id: string;
            name: string;
            type: FieldType;
        }>;
    };
}

export interface ICreateTemplateResponse {
    error: boolean;
    object: {
        _id: string;
        workspace: string;
        name: string;
        fields: Array<{
            _id: string;
            name: string;
            type: FieldType;
        }>;
    };
}

export interface IUpdateTemplateResponse {
    error: boolean;
    object: {
        _id: string;
        workspace: string;
        name: string;
        fields: Array<{
            _id: string;
            name: string;
            type: FieldType;
        }>;
    };
}

export interface IDeleteTemplateResponse {
    error: boolean;
    object: {
        _id: string;
        workspace: string;
        name: string;
        fields: Array<{
            _id: string;
            name: string;
            type: FieldType;
        }>;
    };
}
