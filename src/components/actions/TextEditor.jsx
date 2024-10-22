import React, { forwardRef } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const { Quill } = ReactQuill

import QuillCursors from "quill-cursors"
Quill.register("modules/cursors", QuillCursors)

import "quill-comment/quill.comment.js"
import "quill-comment/quill.comment.css"

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
        ["comments-add"],
        ["comments-toggle"],
    ],
    history: {
        delay: 2500,
        userOnly: true,
    },
    cursors: true,
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
    "comments-add",
    "comments-toggle",
]

function commentServerTimestamp() {
    // call from server or local time. But must return promise with UNIX Epoch timestamp resolved (like 1507617041)
    return new Promise((resolve) => {
        const currentTimestamp = Math.round(new Date().getTime() / 1000)

        resolve(currentTimestamp)
    })
}

const TextEditor = forwardRef(function TextEditor(
    { value, onChange, userId, userName, onAddComment, onClickedComments },
    ref
) {
    return (
        <ReactQuill
            ref={ref}
            theme="snow"
            value={value}
            onChange={onChange}
            modules={{
                ...modules,
                comment: {
                    enabled: true,
                    commentAuthorId: userId,
                    commentAddOn: userName,
                    color: "yellow",
                    commentAddClick: onAddComment,
                    commentsClick: onClickedComments,
                    commentTimestamp: commentServerTimestamp,
                },
            }}
            formats={formats}
        />
    )
})

export default TextEditor
