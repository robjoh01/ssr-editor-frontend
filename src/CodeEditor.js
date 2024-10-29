import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

const CodeEditor = ({ onExecute }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        editorRef.current = monaco.editor.create(document.getElementById('editor'), {
            value: '',
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
        });

        return () => editorRef.current.dispose(); 
    }, []);

    const handleExecute = () => {
        const code = editorRef.current.getValue();
        onExecute(code);
    };

    return (
        <div>
            <div id="editor" style={{ height: '600px', width: '800px' }}></div>
            <button onClick={handleExecute}>Exekvera kod</button>
        </div>
    );
};

export default CodeEditor;
