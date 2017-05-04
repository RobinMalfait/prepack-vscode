import {
    TextDocument,
    commands,
    window
} from 'vscode';

import { formatDocument, registerOutputHandler } from './utils';

export const registerPrepackCommand = () => {
    return commands.registerCommand('prepack.format', () => {
        formatDocument(
            window.activeTextEditor.document,
            window.activeTextEditor
        );
    });
}

export const registerPrepackCommandOutput = () => {
    const outputChannel = window.createOutputChannel('Prepack');

    registerOutputHandler((output) => {
        outputChannel.clear();
        outputChannel.append(output);
    });

    return commands.registerCommand('prepack.open-output', () => {
        outputChannel.show();
    });
};
