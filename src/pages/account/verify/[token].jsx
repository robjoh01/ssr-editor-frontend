import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios.js"
import validator from "validator"

import {
    VStack,
    Box,
    Button,
    Heading,
    Text,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react"
import { BiArrowBack, BiReset } from "react-icons/bi"

import { BeatLoader } from "react-spinners"
import { useSnackbar } from "notistack"
import { useErrorBoundary } from "react-error-boundary"
import { Loading } from "@/components/core"

function CreateAccount() {
    const navigate = useNavigate()
    const { token } = useParams()

    const [isVerify, setIsVerify] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const [email, setEmail] = useState("")

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState()

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState()

    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState()

    const { enqueueSnackbar } = useSnackbar()
    const { showBoundary } = useErrorBoundary()

    const verifyQuery = useQuery({
        queryKey: ["verifyAccount", token],
        queryFn: () =>
            axios
                .post("/auth/signUp/verify", { token })
                .then((res) => res.data),
        enabled: !!token,
        cacheTime: 1000 * 60 * 5, // Cache the result for 5 minutes
    })

    useEffect(() => {
        if (!verifyQuery.data) return

        setIsVerify(true)
        setEmail(verifyQuery.data.email)

        // Calculate countdown
        const now = Math.floor(Date.now() / 1000)
        const remainingSeconds = verifyQuery.data.expirationTime - now
        const remainingHours = remainingSeconds / 3600

        setCountdown(Math.round(remainingHours))
    }, [verifyQuery.data])

    useEffect(() => {
        if (!verifyQuery.error) return

        const errorMessage =
            verifyQuery.error?.response?.data || "An unknown error occurred"

        showBoundary(new Error(errorMessage))
    }, [verifyQuery.error])

    useEffect(() => {
        if (name === "") {
            setNameError("Name is required")
            return
        }

        setNameError()
    }, [name])

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
        if (confirmPassword === "") {
            setConfirmPasswordError("Password is required")
            return
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match")
            return
        }

        setConfirmPasswordError()
    }, [password, confirmPassword])

    // Mutation for logging in
    const loginMutation = useMutation({
        mutationFn: () => axios.post("/auth/login", { email, password }),
        onSuccess: () => {
            enqueueSnackbar("Login successful", { variant: "success" })

            // Redirect to dashboard after successful login
            navigate("/dashboard", { replace: true })
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data || "An unknown error occurred"

            enqueueSnackbar(`Failed to login: ${errorMessage}`, {
                variant: "error",
            })
        },
    })

    // Mutation for creating an account
    const createAccountMutation = useMutation({
        mutationFn: () =>
            axios.post("/auth/signUp/complete", {
                name,
                email,
                password,
                token,
            }),
        onSuccess: () => {
            enqueueSnackbar("Account created successfully!", {
                variant: "success",
            })

            loginMutation.mutate()
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data || "An unknown error occurred"

            enqueueSnackbar(`Failed to create account: ${errorMessage}`, {
                variant: "error",
            })
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        createAccountMutation.mutate()
    }

    if (!isVerify) return <Loading />

    return (
        <Box
            as="form"
            onSubmit={handleSubmit}
            width="full"
            maxW="2xl"
            mx="auto"
            p={8}
        >
            <VStack spacing={6} align="stretch">
                <Heading as="h1" size="lg" textAlign="center">
                    Create Your Account
                </Heading>
                <Text fontSize="md" textAlign="center">
                    {countdown} hours remaining.
                </Text>
                <Text fontSize="sm" textAlign="center">
                    Please set a password for your account.
                </Text>

                <VStack width="full">
                    <FormControl isReadOnly>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="email" type="email" value={email} readOnly />
                    </FormControl>

                    <FormControl mt={4} isInvalid={nameError}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                        {nameError && (
                            <FormErrorMessage>{nameError}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl mt={4} isInvalid={passwordError}>
                        <FormLabel htmlFor="password">New Password</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                        {passwordError && (
                            <FormErrorMessage>{passwordError}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl mt={4} isInvalid={confirmPasswordError}>
                        <FormLabel htmlFor="confirmPassword">
                            Confirm Password
                        </FormLabel>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />
                        {confirmPasswordError && (
                            <FormErrorMessage>
                                {confirmPasswordError}
                            </FormErrorMessage>
                        )}
                    </FormControl>

                    <VStack>
                        <Button
                            mt={6}
                            colorScheme="blue"
                            type="submit"
                            leftIcon={<BiReset />}
                            spinner={<BeatLoader size={8} color="white" />}
                            isLoading={createAccountMutation.isPending}
                            loadingText="Creating Account"
                            isDisabled={
                                createAccountMutation.isPending ||
                                !email ||
                                nameError ||
                                passwordError ||
                                confirmPasswordError ||
                                !token
                            }
                        >
                            Create Account
                        </Button>

                        <Button
                            mt={4}
                            variant="link"
                            leftIcon={<BiArrowBack />}
                            onClick={() => navigate("/", { replace: true })}
                        >
                            Back to Signup
                        </Button>
                    </VStack>
                </VStack>
            </VStack>
        </Box>
    )
}

export default CreateAccount
