'use strict';

import {
    languages,
    ExtensionContext,
    DocumentSelector,
    window,
    workspace,
} from 'vscode';
import {
    registerPrepackCommand,
    registerPrepackCommandOutput
} from './commands';

export function activate(context: ExtensionContext) {
    const disposables = [
        // Register all commands
        registerPrepackCommand(),
        registerPrepackCommandOutput(),
    ];

    context.subscriptions.push(...disposables);
}

export function deactivate() {
}