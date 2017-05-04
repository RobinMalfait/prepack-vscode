import {
    TextDocument,
    Range,
    Selection,
    TextEditor,
    StatusBarItem,
    window,
    workspace
} from 'vscode';

const Prepack = require('prepack');

let statusbar: StatusBarItem = undefined;
let outputHandler: Function = () => { };

function showStatusBarMessage(message, output) {
    if (statusbar === undefined) {
        statusbar = window.createStatusBarItem();
    }

    outputHandler(output);

    statusbar.text = message;
    statusbar.command = 'prepack.open-output';
    statusbar.show();
}

export function registerOutputHandler(handler: Function = () => { }) {
    outputHandler = handler;
}

export function fullDocumentRange(document: TextDocument): Range {
    const lastLineId = document.lineCount - 1;
    return new Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

export function fullDocumentSelection(document: TextDocument): Selection {
    return fullDocumentRange(document) as Selection;
}

export function format(code: string) {
    const options = workspace.getConfiguration('prepack') as any;

    try {
        showStatusBarMessage('Prepack: $(sync)', 'Prepacking...');

        const newCode = Prepack.prepack(code, options).code;

        showStatusBarMessage('Prepack: $(check)', 'All good!');

        return newCode;
    } catch (err) {
        showStatusBarMessage('Prepack: $(x)', err);
        return code;
    }
}

export function formatDocument(document: TextDocument, editor: TextEditor): Thenable<any> {
    const { selections } = editor;

    const selectionsToBeReplaced = selections.filter((selection) => {
        return !(selection.start.line === selection.end.line
            && selection.start.character === selection.end.character);
    });
    const hasSelections = selectionsToBeReplaced.length > 0;

    if (!hasSelections) {
        selectionsToBeReplaced.push(fullDocumentSelection(document));
    }

    return Promise.all(selectionsToBeReplaced.map((selection) => {
        // Replace selection with new, formatted text
        return editor
            .edit((editBuilder) => editBuilder.replace(
                selection,
                format(document.getText(selection))
            ));
    }));
}