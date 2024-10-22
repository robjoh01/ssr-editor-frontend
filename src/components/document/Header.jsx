import React from "react"

import {
    HStack,
    Button,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react"

import { FaShareAlt } from "react-icons/fa" // FaFileAlt
import { ChevronDownIcon } from "@chakra-ui/icons"

import { ViewerList, DocumentSpinner } from "@/components/document"

function Header({ title, setTitle, viewers, isProcessing }) {
    return (
        <HStack justifyContent="space-between" width="full">
            <HStack spacing={2} width="full">
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        File
                    </MenuButton>
                    <MenuList>
                        <MenuItem>New Document</MenuItem>
                        <MenuItem>Open</MenuItem>
                        <MenuItem>Save</MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Edit
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Undo</MenuItem>
                        <MenuItem>Redo</MenuItem>
                        <MenuItem>Cut</MenuItem>
                        <MenuItem>Copy</MenuItem>
                        <MenuItem>Paste</MenuItem>
                    </MenuList>
                </Menu>

                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fontWeight="bold"
                    size="md"
                    maxW="xl"
                />

                <DocumentSpinner isProcessing={isProcessing} />
            </HStack>
            <HStack>
                <ViewerList viewers={viewers} />
                <Button leftIcon={<FaShareAlt />} colorScheme="blue">
                    Share
                </Button>
            </HStack>
        </HStack>
    )
}

export default Header
