import React, { forwardRef } from "react"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"

const { Quill } = ReactQuill

import QuillCursors from "quill-cursors"
Quill.register("modules/cursors", QuillCursors)

/**
 * @typedef {import("react-quill").Quill} Quill
 * @typedef {import("react-quill").EditorProps} EditorProps
 * @typedef {import("react-quill").Format} Format
 */

const modules = {
    /**
     * Custom toolbar configuration
     * @type {import("react-quill").Format[]}
     */
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

    /**
     * Custom history configuration
     * @type {import("react-quill").HistoryConfig}
     */
    history: {
        delay: 2500,
        userOnly: true,
    },

    /**
     * Enable real-time collaboration cursors
     * @type {boolean}
     */
    cursors: true,
}

/**
 * List of formats to support in the editor
 * @type {Format[]}
 */
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

/**
 * Custom text editor component
 * @extends {React.ForwardRefExoticComponent<EditorProps & React.RefAttributes<Quill>>}
 */
const TextEditor = forwardRef(function TextEditor(
    { onChange, onChangeSelection },
    ref
) {
    return (
        <ReactQuill
            ref={ref}
            theme="snow"
            onChange={onChange}
            onChangeSelection={onChangeSelection}
            modules={modules}
            formats={formats}
        />
    )
})

export default TextEditor
