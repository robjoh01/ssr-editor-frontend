import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios.js"

import {
    HStack,
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

function ResetAccount() {
    const navigate = useNavigate()

    useQuery({
        queryKey: ["user"],
        queryFn: () => axios.get("/auth/myself"),
    })

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState()

    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState()

    const { enqueueSnackbar } = useSnackbar()

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

    // Mutation for resetting the password
    const resetPasswordMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/auth/reset-password", {
                password,
            })
            return response.data
        },
        onSuccess: () => {
            enqueueSnackbar("Password reset successfully", {
                variant: "success",
            })
            navigate("/login") // Redirect to login after successful reset
        },
        onError: (error) => {
            enqueueSnackbar(
                error.response?.data?.message || "Something went wrong",
                {
                    variant: "error",
                }
            )
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        // Call mutation to reset the password
        resetPasswordMutation.mutate()
    }

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
                    Reset Password
                </Heading>
                <Text fontSize="sm" textAlign="center">
                    Enter a new password for your account.
                </Text>

                <VStack width="full">
                    <FormControl isInvalid={passwordError}>
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
                            isLoading={resetPasswordMutation.isPending}
                            loadingText="Resetting"
                            isDisabled={resetPasswordMutation.isPending}
                        >
                            Reset Password
                        </Button>

                        <Button
                            mt={4}
                            variant="link"
                            leftIcon={<BiArrowBack />}
                            onClick={() =>
                                navigate("/profile", { replace: true })
                            }
                        >
                            Back to Profile
                        </Button>
                    </VStack>
                </VStack>
            </VStack>
        </Box>
    )
}

export default ResetAccount
