import React from "react"

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
    Divider,
    Text,
} from "@chakra-ui/react"

import { BiLogoGithub, BiLogoGoogle } from "react-icons/bi"

function Login({ setTabIndex }) {
    return (
        <Box textAlign="center" width="full" p={4}>
            {/* Vertical stack for the entire form */}
            <VStack spacing={4} width="full">
                {/* Social login buttons in a horizontal stack */}
                <HStack spacing={2} width="full">
                    <Button
                        leftIcon={<BiLogoGoogle />}
                        colorScheme="red"
                        width="full"
                    >
                        Google
                    </Button>
                    <Button
                        leftIcon={<BiLogoGithub />}
                        colorScheme="gray"
                        width="full"
                    >
                        GitHub
                    </Button>
                </HStack>

                {/* Divider with "OR" text */}
                <HStack width="full">
                    <Divider />
                    <Text fontWeight="medium">OR</Text>
                    <Divider />
                </HStack>

                {/* Vertical stack for the login form */}
                <VStack spacing={4} width="full">
                    <FormControl id="login-email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Enter your email" />
                    </FormControl>

                    <FormControl id="login-password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                        />
                    </FormControl>

                    <Button colorScheme="blue" width="full">
                        Log In
                    </Button>

                    <Button
                        variant="link"
                        colorScheme="teal"
                        onClick={() => setTabIndex(1)}
                    >
                        Don't have an account? Sign up
                    </Button>
                </VStack>
            </VStack>
        </Box>
    )
}

export default Login
