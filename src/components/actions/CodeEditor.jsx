import React, { useState, forwardRef } from "react"
import { useColorModeValue } from "@chakra-ui/react"

import { Editor } from "@monaco-editor/react"

/**
 * A Monaco Code Editor component with a light/dark theme toggle.
 *
 * The component is a forwardRef, so it can be used with the `useRef` hook.
 *
 * @param {Object} props - The component's props.
 * @param {React.MutableRefObject<Editor.IStandaloneCodeEditor | null>} editorRef - A ref to the Monaco Editor instance.
 * @returns {React.ReactElement} A JSX element representing the CodeEditor component.
 */
/* eslint-disable-next-line no-empty-pattern */
const CodeEditor = forwardRef(function CodeEditor({}, editorRef) {
    const theme = useColorModeValue("vs-light", "vs-dark")

    const [code, setCode] = useState("")

    /**
     * Handles changes to the code in the editor.
     *
     * The function is called whenever the user types something in the editor.
     *
     * @param {string} value - The new value of the code.
     */
    const handleEditorChange = (value) => {
        setCode(value)
    }

    /**
     * Handles the editor's mount event.
     *
     * The function is called once the editor is mounted.
     *
     * @param {Editor.IStandaloneCodeEditor} editor - The Monaco Editor instance.
     */
    const handleEditorMount = (editor) => {
        editorRef.current = editor
        editor.focus()
    }

    return (
        <Editor
            height="100%"
            theme={theme}
            defaultLanguage="javascript"
            /* eslint-disable-next-line quotes */
            defaultValue={`// Using console.log\nconsole.log("Hello, World!");`}
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorMount}
        />
    )
})

export default CodeEditor
