/**
 * Workspace.ts
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkspace {
    account: string;
    name: string;
}

export interface IWorkspaceModel extends IWorkspace, Document {}

const WorkspaceSchema: Schema = new Schema({
    account: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model<IWorkspaceModel>('workspace', WorkspaceSchema);
