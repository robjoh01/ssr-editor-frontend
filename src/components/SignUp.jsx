import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import {
    Box,
    Button,
    Input,
    VStack,
    HStack,
    Divider,
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react"

import { BiLogoGithub, BiLogoGoogle } from "react-icons/bi"

import { authWithGithub, authWithGoogle, login } from "@/utils/api/auth"
import { createUser } from "@/utils/api/users"

import validator from "validator"

// TODO: useMutation

function SignUp({ setTabIndex }) {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState()

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState()

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState()

    const [passwordAgain, setPasswordAgain] = useState("")
    const [passwordAgainError, setPasswordAgainError] = useState()

    useEffect(() => {
        if (name === "") {
            setNameError("Name is required")
            return
        }

        setNameError()
    }, [name])

    useEffect(() => {
        if (email === "") {
            setEmailError("Email is required")
            return
        }

        if (!validator.isEmail(email)) {
            setEmailError("Invalid email")
            return
        }

        setEmailError()
    }, [email])

    useEffect(() => {
        if (password === "") {
            setPasswordError("Password is required")
            return
        }

        if (!validator.isStrongPassword(password)) {
            setPasswordError("Password must be a strong password")
            return
        }

        setPasswordError()
    }, [password])

    useEffect(() => {
        if (passwordAgain === "") {
            setPasswordAgainError("Password is required")
            return
        }

        if (password !== passwordAgain) {
            setPasswordAgainError("Passwords do not match")
            return
        }

        setPasswordAgainError()
    }, [passwordAgain])

    const handleSignUp = async (e) => {
        e.preventDefault()

        const { data, status } = await createUser({
            name,
            email,
            password,
        })

        if (status !== 200) {
            console.log(data)
            return
        }

        const { data: loginData, status: loginStatus } = await login(
            email,
            password
        )

        if (loginStatus !== 200) {
            console.log(loginData)
            return
        }

        navigate("/dashboard", { replace: true })
    }

    return (
        <Box as="form" textAlign="center" width="full" p={4}>
            <VStack spacing={4} width="full">
                {/* Social login buttons in a horizontal stack */}
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

                {/* Divider with "OR" text */}
                <HStack width="full">
                    <Divider />
                    <Text fontWeight="medium">OR</Text>
                    <Divider />
                </HStack>

                {/* Name input */}
                <FormControl id="signup-name" isRequired isInvalid={nameError}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && (
                        <FormErrorMessage>{nameError}</FormErrorMessage>
                    )}
                </FormControl>

                {/* Email input */}
                <FormControl
                    id="signup-email"
                    isRequired
                    isInvalid={emailError}
                >
                    <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                    )}
                </FormControl>

                {/* Password input */}
                <FormControl
                    id="signup-password"
                    isRequired
                    isInvalid={passwordError}
                >
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                        <FormErrorMessage>{passwordError}</FormErrorMessage>
                    )}
                </FormControl>

                {/* Password again input, conditionally rendered */}
                {password && (
                    <FormControl
                        id="signup-password-again"
                        isRequired
                        isInvalid={passwordAgainError}
                    >
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter password again"
                            value={passwordAgain}
                            onChange={(e) => setPasswordAgain(e.target.value)}
                        />
                        {passwordAgainError && (
                            <FormErrorMessage>
                                {passwordAgainError}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                )}

                <Button
                    type="submit"
                    colorScheme="teal"
                    width="full"
                    onClick={handleSignUp}
                >
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
