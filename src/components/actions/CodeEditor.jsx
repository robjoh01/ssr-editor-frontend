import React, { useState, useRef, forwardRef } from "react"
import { useColorModeValue } from "@chakra-ui/react"

import { Editor } from "@monaco-editor/react"

const CodeEditor = forwardRef(function CodeEditor({}, editorRef) {
    const theme = useColorModeValue("vs-light", "vs-dark")

    const [code, setCode] = useState("")

    return (
        <Editor
            height="100%"
            theme={theme}
            defaultLanguage="javascript"
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
