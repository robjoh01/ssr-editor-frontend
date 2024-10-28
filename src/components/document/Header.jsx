import React from "react"

// Components
import {
    useDisclosure,
    HStack,
    Button,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react"

import { ViewerList, ShareWindow } from "@/components/document"
import { SyncLoader } from "react-spinners"

// Icons
import { BiSolidShareAlt, BiChevronDown } from "react-icons/bi"

function Header({ title, onTitleChange, isProcessing, viewers }) {
    const shareModal = useDisclosure()

    return (
        <>
            <HStack justifyContent="space-between" width="full">
                <HStack spacing={2} width="full">
                    <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                            File
                        </MenuButton>
                        <MenuList>
                            <MenuItem>New Document</MenuItem>
                            <MenuItem>Open</MenuItem>
                            <MenuItem>Save</MenuItem>
                        </MenuList>
                    </Menu>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
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
                        onChange={onTitleChange}
                        fontWeight="bold"
                        size="md"
                        maxW="xl"
                    />

                    {isProcessing && <SyncLoader color="#36d7b7" />}
                </HStack>
                <HStack gap={4}>
                    <ViewerList viewers={viewers} />
                    <Button
                        leftIcon={<BiSolidShareAlt />}
                        colorScheme="blue"
                        onClick={shareModal.onOpen}
                    >
                        Share
                    </Button>
                </HStack>
            </HStack>

            {/* Share Modal */}
            <ShareWindow
                isOpen={shareModal.isOpen}
                onClose={shareModal.onClose}
            />
        </>
    )
}

export default Header
