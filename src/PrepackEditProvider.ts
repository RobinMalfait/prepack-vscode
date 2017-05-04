import {
    workspace,
    DocumentRangeFormattingEditProvider,
    DocumentFormattingEditProvider,
    Range,
    TextDocument,
    FormattingOptions,
    CancellationToken,
    TextEdit,
    window
} from 'vscode';

import {
    fullDocumentRange,
    format
} from './utils';

class PrepackEditProvider implements DocumentRangeFormattingEditProvider, DocumentFormattingEditProvider {
    provideDocumentRangeFormattingEdits(
        document: TextDocument,
        range: Range,
        options: FormattingOptions,
        token: CancellationToken
    ): TextEdit[] {
        return [TextEdit.replace(range, format(document.getText(range)))];
    }

    provideDocumentFormattingEdits(
        document: TextDocument,
        options: FormattingOptions,
        token: CancellationToken
    ): TextEdit[] {
        return [TextEdit.replace(fullDocumentRange(document), format(document.getText()))];
    }
}

export default PrepackEditProvider;