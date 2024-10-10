import React from "react"

import { Box, Select, Button, IconButton, HStack } from "@chakra-ui/react"
import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdFormatAlignLeft,
    MdFormatAlignCenter,
    MdFormatAlignRight,
    MdFormatAlignJustify,
    MdUndo,
    MdRedo,
    MdLink,
    MdImage,
    MdTableChart,
} from "react-icons/md"

function Toolbar() {
    return (
        <HStack spacing={2} width="full">
            {/* Font Style */}
            <Select placeholder="Normal" width="120px">
                <option value="heading1">Heading 1</option>
                <option value="heading2">Heading 2</option>
                <option value="heading3">Heading 3</option>
            </Select>

            {/* Font Family */}
            <Select placeholder="Arial" width="120px">
                <option value="arial">Arial</option>
                <option value="helvetica">Helvetica</option>
                <option value="times">Times New Roman</option>
                <option value="courier">Courier</option>
            </Select>

            {/* Font Size */}
            <Select placeholder="16" width="80px">
                {[8, 9, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72].map(
                    (size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    )
                )}
            </Select>

            {/* Text Formatting */}
            <IconButton icon={<MdFormatBold />} aria-label="Bold" />
            <IconButton icon={<MdFormatItalic />} aria-label="Italic" />
            <IconButton icon={<MdFormatUnderlined />} aria-label="Underline" />

            {/* Text Alignment */}
            <IconButton icon={<MdFormatAlignLeft />} aria-label="Align Left" />
            <IconButton
                icon={<MdFormatAlignCenter />}
                aria-label="Align Center"
            />
            <IconButton
                icon={<MdFormatAlignRight />}
                aria-label="Align Right"
            />
            <IconButton icon={<MdFormatAlignJustify />} aria-label="Justify" />

            {/* Other Actions */}
            <IconButton icon={<MdUndo />} aria-label="Undo" />
            <IconButton icon={<MdRedo />} aria-label="Redo" />
            <IconButton icon={<MdLink />} aria-label="Insert Link" />
            <IconButton icon={<MdImage />} aria-label="Insert Image" />
            <IconButton icon={<MdTableChart />} aria-label="Insert Table" />
        </HStack>
    )
}

export default Toolbar
