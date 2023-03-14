/**
 * Field.ts
 */

import { Schema } from 'mongoose';
import { FieldType } from '../types/protocols/object.protocols';

export interface IField {
    name: string;
    type: FieldType;
}

export const FieldSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    { discriminatorKey: 'type' }
);

export const StringFieldSchema: Schema = new Schema({
    value: {
        type: String,
        required: true
    }
});

export const NumberFieldSchema: Schema = new Schema({
    value: {
        type: Number,
        required: true
    }
});

export const BooleanFieldSchema: Schema = new Schema({
    value: {
        type: Boolean,
        required: true
    }
});
