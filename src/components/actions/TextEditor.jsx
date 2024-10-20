import React, { forwardRef } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const { Quill } = ReactQuill

import QuillCursors from "quill-cursors"

Quill.register("modules/cursors", QuillCursors)

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
    cursors: true, // enable cursors module,
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

const TextEditor = forwardRef(function TextEditor({ value, onChange }, ref) {
    return (
        <ReactQuill
            ref={ref}
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
        />
    )
})

export default TextEditor
