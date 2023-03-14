/**
 * Object.ts
 */

import mongoose, { Document, Schema } from 'mongoose';
import { FieldType } from '../types/protocols/object.protocols';
import {
    BooleanFieldSchema,
    FieldSchema,
    IField,
    NumberFieldSchema,
    StringFieldSchema
} from './Field';

export interface IObject {
    workspace: string;
    name: string;
    template: boolean;
    fields: Array<IField>;
}

export interface IObjectModel extends IObject, Document {}

const ObjectSchema: Schema = new Schema({
    workspace: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    template: {
        type: Boolean,
        required: true
    },
    fields: {
        type: [FieldSchema],
        default: [],
        required: true
    }
});

// Attach hooks & methods

const fieldsArray = ObjectSchema.path(
    'fields'
) as mongoose.Schema.Types.DocumentArray;

fieldsArray.discriminator(FieldType.String, StringFieldSchema);
fieldsArray.discriminator(FieldType.Number, NumberFieldSchema);
fieldsArray.discriminator(FieldType.Boolean, BooleanFieldSchema);

export default mongoose.model<IObjectModel>('object', ObjectSchema);
