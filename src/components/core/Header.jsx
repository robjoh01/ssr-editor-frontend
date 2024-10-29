import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/systems/Auth"

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
import { BiCodeAlt } from "react-icons/bi"

import FancyText from "@carefully-coded/react-text-gradient"

import { useSnackbar } from "notistack"

function Header() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { isLoggedIn, logOut } = useAuth()

    const { toggleColorMode } = useColorMode()
    const colorModeIcon = useColorModeValue(<SunIcon />, <MoonIcon />)

    const handleLogout = async () => {
        await logOut()

        enqueueSnackbar("Logged out", { variant: "success" })
        navigate("/", { replace: true })
    }

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
                            animationduration={2000}
                        >
                            SSR Editor
                        </FancyText>
                    </Heading>
                </Link>
                <HStack spacing={4}>
                    {isLoggedIn && (
                        <IconButton
                            aria-label="Go to code editor"
                            onClick={() => navigate("/code", { replace: true })}
                            icon={<BiCodeAlt />}
                            variant="ghost"
                        />
                    )}
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
                                <MenuItem as={Link} to="/profile">
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Sign out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </HStack>
            </Box>
        </Box>
    )
}

export default Header
