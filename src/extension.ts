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
import EditProvider from './PrepackEditProvider';

const VALID_LANG: DocumentSelector = ['javascript', 'javascriptreact'];

export function activate(context: ExtensionContext) {
    const editProvider = new EditProvider()

    const disposables = [
        // Register all content providers
        languages.registerDocumentRangeFormattingEditProvider(VALID_LANG, editProvider),
        languages.registerDocumentFormattingEditProvider(VALID_LANG, editProvider),

        // Register all commands
        registerPrepackCommand(),
        registerPrepackCommandOutput(),
    ];

    context.subscriptions.push(...disposables);
}

export function deactivate() {
}