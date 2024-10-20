import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios.js"
import { authWithGithub, authWithGoogle } from "@/utils/api/auth"

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
import { BeatLoader } from "react-spinners"

function Login({ setTabIndex }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Mutation for logging in
    const loginMutation = useMutation({
        mutationFn: () => {
            return axios.post("/auth/login", {
                email,
                password,
            })
        },
        onSuccess: () => {
            // Optionally, refetch user data after successful update
            navigate("/dashboard", { replace: true })
        },
        onError: (error) => {
            console.error("Error updating user:", error)
        },
    })

    const handleLogin = (e) => {
        e.preventDefault()

        loginMutation.mutate()
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin(e)
        }
    }

    return (
        <Box textAlign="center" width="full" p={4}>
            <VStack spacing={4} width="full">
                <HStack spacing={2} width="full">
                    <Button
                        leftIcon={<BiLogoGoogle />}
                        colorScheme="red"
                        width="full"
                        onClick={authWithGoogle}
                    >
                        Google
                    </Button>
                    <Button
                        leftIcon={<BiLogoGithub />}
                        colorScheme="gray"
                        width="full"
                        onClick={authWithGithub}
                    >
                        GitHub
                    </Button>
                </HStack>

                <HStack width="full">
                    <Divider />
                    <Text fontWeight="medium">OR</Text>
                    <Divider />
                </HStack>

                <VStack spacing={4} width="full">
                    <FormControl id="login-email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="login-password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress} // Handle Enter key
                        />
                    </FormControl>

                    <Button
                        colorScheme="blue"
                        width="full"
                        onClick={handleLogin}
                        isLoading={loginMutation.isLoading}
                        loadingText="Logging in"
                        spinner={<BeatLoader size={8} color="white" />}
                    >
                        Login
                    </Button>

                    <Button
                        variant="link"
                        colorScheme="teal"
                        type="submit"
                        onClick={() => setTabIndex(1)}
                    >
                        Don&apos;t have an account? Sign up
                    </Button>
                </VStack>

                {loginMutation.error && (
                    <Text color="red.500" fontSize="sm">
                        {loginMutation.error.message}
                    </Text>
                )}
            </VStack>
        </Box>
    )
}

export default Login
