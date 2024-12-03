const vscode = require('vscode');

/**
 * Activar la extensión
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Registrar el comando de formateo BP
    let disposable = vscode.commands.registerCommand('extension.formatBP', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const formattedText = formatBPCode(document.getText());
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(document.getText().length)
            );
            editor.edit(editBuilder => {
                editBuilder.replace(fullRange, formattedText);
            });
        }
    });

    // Registrar el formateador de documentos para el lenguaje BP
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider('bp', {
            provideDocumentFormattingEdits(document) {
                const formattedText = formatBPCode(document.getText());
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(document.getText().length)
                );
                return [vscode.TextEdit.replace(fullRange, formattedText)];
            }
        })
    );

    context.subscriptions.push(disposable);
}

/**
 * Desactivar la extensión
 */
function deactivate() { }

/**
 * Formatear el código en el lenguaje BP
 * @param {string} code - Código fuente original
 * @returns {string} - Código formateado
 */
function formatBPCode(code) {
    const lines = code.split('\n');
    const formattedLines = [];

    // Reglas de palabras clave en mayúsculas para comparar
    const increaseIndentKeywords = ["IF", "FOR", "WHILE", "FUNCTION", "SUB"];
    const decreaseIndentKeywords = ["ENDIF", "ENDFOR", "ENDWHILE", "ENDFUNCTION", "ENDSUB"];
    const keywordsToFormat = ["IF", "THEN", "ELSE", "ELSEIF", "FOR", "TO", "STEP", "WHILE", "ENDWHILE", "ENDFUNCTION", "FUNCTION", "ENDSUB", "SUB"];

    // Formatear las líneas primero
    const preFormattedLines = lines.map(line => {
        let trimmedLine = line.trim();

        // Normalizar palabras clave al formato requerido
        keywordsToFormat.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');

            trimmedLine = trimmedLine.replace(regex, match => {
                // Si la palabra clave es una palabra de cierre como ENDFUNCTION, formatear ambas partes
                if (decreaseIndentKeywords.includes(keyword)) {
                    return match.replace(/END/, 'End').replace(keyword.replace('END', ''), match => {
                        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
                    });
                }

                // Si no, devolver solo con la primera letra en mayúscula
                return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
            });
        });

        // Asegurar exactamente un espacio antes y después de operadores y asignaciones
        trimmedLine = trimmedLine.replace(/\s*([+\-*/=<>!&|^]+)\s*/g, ' $1 '); // Operadores simples
        trimmedLine = trimmedLine.replace(/\s*([<>]=?|!=?)\s*/g, ' $1 '); // Operadores combinados (<=, >=, <>)
        trimmedLine = trimmedLine.replace(/,\s*/g, ', '); // Asegura un espacio después de comas
        trimmedLine = trimmedLine.replace(/\s{2,}/g, ' '); // Compactar múltiples espacios

        return trimmedLine;
    });

    // Aplicar la indentación en una segunda pasada
    let currentIndent = 0;
    preFormattedLines.forEach(line => {
        if (line === '') {
            formattedLines.push('');
            return;
        }

        const upperCaseLine = line.toUpperCase();

        // Ajustar la indentación si comienza con una palabra clave de reducción
        if (decreaseIndentKeywords.some(keyword => upperCaseLine.startsWith(keyword))) {
            currentIndent = Math.max(0, currentIndent - 1);
        }

        // Aplicar la indentación actual
        formattedLines.push(' '.repeat(currentIndent * 4) + line);

        // Aumentar la indentación para las siguientes líneas si aplica
        if (increaseIndentKeywords.some(keyword => upperCaseLine.startsWith(keyword))) {
            currentIndent++;
        }
    });

    // Unir las líneas sin eliminar líneas vacías
    return formattedLines.join('\n')
        .replace(/\b(EndIf|EndFor|EndFunction|EndSub|EndWhile)\b/g, '$1\n') // Nueva línea después de palabras clave específicas
        .replace(/\n{2,}/g, '\n\n'); // Compactar múltiples líneas vacías consecutivas
}

module.exports = {
    activate,
    deactivate
};
