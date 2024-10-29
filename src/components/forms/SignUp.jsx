import React, { useEffect, useState } from "react"

import { useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios.js"
import { authWithGithub, authWithGoogle } from "@/utils/api/auth"

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
import { BeatLoader } from "react-spinners"

import { useSnackbar } from "notistack"
import validator from "validator"

function SignUp({ setTabIndex }) {
    const { enqueueSnackbar } = useSnackbar()

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState()

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

    // Mutation for creating a user
    const createUserMutation = useMutation({
        mutationFn: async () =>
            axios.post("/auth/signUp", {
                email,
                redirect: `${import.meta.env.VITE_DOMAIN_URL}/account/verify`,
            }),
        onSuccess: () => {
            enqueueSnackbar("Email verification link sent", {
                variant: "success",
            })
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data || "An unknown error occurred"

            enqueueSnackbar(`Failed to sign up: ${errorMessage}`, {
                variant: "error",
            })
        },
    })

    const handleSignUp = (e) => {
        e.preventDefault()

        createUserMutation.mutate()
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

                <Button
                    type="submit"
                    colorScheme="teal"
                    width="full"
                    isLoading={createUserMutation.isPending}
                    loadingText="Sending email"
                    spinner={<BeatLoader size={8} color="white" />}
                    disabled={
                        createUserMutation.isPending || !email || emailError
                    }
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
