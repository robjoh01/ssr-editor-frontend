import React, { useState, forwardRef } from "react"
import { useColorModeValue } from "@chakra-ui/react"

import { Editor } from "@monaco-editor/react"

/* eslint-disable-next-line no-empty-pattern */
const CodeEditor = forwardRef(function CodeEditor({}, editorRef) {
    const theme = useColorModeValue("vs-light", "vs-dark")

    const [code, setCode] = useState("")

    return (
        <Editor
            height="100%"
            theme={theme}
            defaultLanguage="javascript"
            /* eslint-disable-next-line quotes */
            defaultValue={`// Using console.log\nconsole.log("Hello, World!");`}
            value={code}
            onChange={(value) => setCode(value)}
            onMount={(editor) => {
                editorRef.current = editor
                editor.focus()
            }}
        />
    )
})

export default CodeEditor
