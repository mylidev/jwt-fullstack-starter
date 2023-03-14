/**
 * object.selectors.ts
 */

import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { IObjectState } from '../types/object.types';

const objectStateSelector = (state: AppState): IObjectState => state.object;
