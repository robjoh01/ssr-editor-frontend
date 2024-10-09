import React from "react"
import { Link } from "react-router-dom"
import { useUser } from "@hooks/UserContext"

import {
    useColorMode,
    useColorModeValue,
    Box,
    Button,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    HStack,
    Heading,
    IconButton,
} from "@chakra-ui/react"
import { SunIcon, MoonIcon, ChevronDownIcon } from "@chakra-ui/icons"

import FancyText from "@carefully-coded/react-text-gradient"

function Header() {
    const { isLoggedIn, logOut } = useUser()

    const { toggleColorMode } = useColorMode()
    const colorModeIcon = useColorModeValue(<SunIcon />, <MoonIcon />)

    return (
        <Box as="header" borderBottom="1px" borderColor="gray.700" py={4}>
            <Box
                maxW="container.xl"
                mx="auto"
                px={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Link to="/">
                    <Heading size="lg">
                        <FancyText
                            gradient={{
                                from: useColorModeValue("#FDE68A", "#F472B6"),
                                to: useColorModeValue("#EC4899", "#8c8afd"),
                            }}
                            animate
                            animationDuration={2000}
                        >
                            SSR Editor
                        </FancyText>
                    </Heading>
                </Link>
                <HStack spacing={4}>
                    <IconButton
                        aria-label="Toggle theme"
                        onClick={toggleColorMode}
                        icon={colorModeIcon}
                        variant="ghost"
                    />
                    {isLoggedIn && (
                        <Menu>
                            <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                variant="ghost"
                            >
                                <Avatar
                                    size="sm"
                                    src="/placeholder-avatar.jpg"
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={Link} to="/user/profile">
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={logOut}>Sign out</MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </HStack>
            </Box>
        </Box>
    )
}

export default Header
