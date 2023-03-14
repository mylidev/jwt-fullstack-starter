/**
 * toast.ts
 */

import { IconName, Intent, Toaster } from '@blueprintjs/core';

const toaster = Toaster.create();

export default (icon: IconName, intent: Intent, message: string): void => {
    toaster.show({ icon, intent, message });
};
