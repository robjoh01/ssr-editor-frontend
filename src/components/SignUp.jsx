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

function SignUp({ setTabIndex }) {
    return (
        <Box textAlign="center" width="full" p={4}>
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

                <FormControl id="signup-name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Name" />
                </FormControl>

                <FormControl id="signup-email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" placeholder="Email" />
                </FormControl>

                <FormControl id="signup-password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="Password" />
                </FormControl>

                <Button colorScheme="teal" width="full">
                    Sign Up
                </Button>
                <Button
                    variant="link"
                    colorScheme="blue"
                    onClick={() => setTabIndex(0)}
                >
                    Already have an account? Log in
                </Button>
            </VStack>
        </Box>
    )
}

export default SignUp
