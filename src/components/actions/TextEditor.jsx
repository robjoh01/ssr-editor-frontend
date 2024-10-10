import React, { useState, forwardRef, useImperativeHandle } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Box } from "@chakra-ui/react"

const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, false] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video", "formula"],
    ],
    history: {
        delay: 2500,
        userOnly: true,
    },
}

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "formula",
    "color",
    "background",
    "align",
    "code-block",
]

const TextEditor = forwardRef((props, ref) => {
    const [value, setValue] = useState("")

    // Expose methods to parent component using useImperativeHandle
    useImperativeHandle(ref, () => ({
        getValue: () => value,
        setValue: (newValue) => setValue(newValue),
    }))

    return (
        <Box width="full" height="full">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
            />
        </Box>
    )
})

export default TextEditor
