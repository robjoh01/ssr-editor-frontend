import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams, useParams } from "react-router-dom"

import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios.js"

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

function CreateAccount() {
    const { id } = useParams()

    // TODO: Check the id is valid

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const email = searchParams.get("email")
    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isTokenValid, setIsTokenValid] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    // Validate the token when the component mounts
    useEffect(() => {
        if (!token || !email) {
            enqueueSnackbar("Invalid link. Missing token or email.", {
                variant: "error",
            })
            navigate("/signup")
            return
        }

        const validateToken = async () => {
            try {
                const response = await axios.post("/validate/user", {
                    token,
                    email,
                })
                if (response.data?.valid) {
                    setIsTokenValid(true)
                } else {
                    enqueueSnackbar("Invalid or expired token.", {
                        variant: "error",
                    })
                    navigate("/signup")
                }
            } catch (error) {
                enqueueSnackbar("Token validation failed. Please try again.", {
                    variant: "error",
                })
                navigate("/signup")
            }
        }

        validateToken()
    }, [token, email, enqueueSnackbar, navigate])

    // Mutation for creating the password
    const createPasswordMutation = useMutation({
        mutationFn: async () => {
            return await axios.put("/auth/myself", {
                password,
            })
        },
        onSuccess: () => {
            enqueueSnackbar("Account created successfully!", {
                variant: "success",
            })

            // Redirect to login after account creation
            navigate("/", { replace: true })
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
        setError("")

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        // Call mutation to create the password
        createPasswordMutation.mutate()
    }

    if (!isTokenValid) {
        return null // Or display a loading spinner until the token validation completes
    }

    return (
        <VStack spacing={6} p={8} align="center" maxW="md" mx="auto">
            <Heading>Create Your Account</Heading>
            <Text>Please set a password for your account.</Text>

            <Box as="form" onSubmit={handleSubmit} w="100%">
                <FormControl isReadOnly>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" value={email} readOnly />
                </FormControl>

                <FormControl mt={4} isInvalid={error}>
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </FormControl>

                <FormControl mt={4} isInvalid={error}>
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
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </FormControl>

                <Button
                    mt={6}
                    colorScheme="blue"
                    type="submit"
                    leftIcon={<BiReset />}
                    spinner={<BeatLoader size={8} color="white" />}
                    isLoading={createPasswordMutation.isPending}
                    loadingText="Creating Account"
                    isDisabled={createPasswordMutation.isPending}
                >
                    Create Account
                </Button>

                <Button
                    mt={4}
                    variant="link"
                    leftIcon={<BiArrowBack />}
                    onClick={() => navigate("/signup")}
                >
                    Back to Signup
                </Button>
            </Box>
        </VStack>
    )
}

export default CreateAccount
