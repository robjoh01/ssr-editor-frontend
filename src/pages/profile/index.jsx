import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios.js"

import {
    VStack,
    HStack,
    Box,
    Button,
    Heading,
    Text,
    Input,
    FormControl,
    FormLabel,
} from "@chakra-ui/react"

import { Prompt } from "@/components/actions"
import { BiArrowBack, BiReset } from "react-icons/bi"

import { BeatLoader } from "react-spinners"
import { useSnackbar } from "notistack"

function Profile() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [lastLogin, setLastLogin] = useState("")
    const [stats, setStats] = useState({
        totalDocuments: 0,
        totalEdits: 0,
        totalComments: 0,
    })

    const [prompt, setPrompt] = useState({
        isOpen: false,
        title: "",
        message: "",
        confirmText: "",
        cancelText: "",
        isLoading: false,
        loadingText: "",
        confirmAction: null,
    })

    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: () => axios.get("/auth/myself"),
    })

    const updateUserMutation = useMutation({
        mutationFn: (data) => axios.put("/auth/myself", data),
        onSuccess: () => {
            enqueueSnackbar("User updated", { variant: "success" })

            // Optionally, refetch user data after successful update
            userQuery.refetch()
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data || "An unknown error occurred"

            enqueueSnackbar(`Failed to update user: ${errorMessage}`, {
                variant: "error",
            })
        },
    })

    const deleteUserMutation = useMutation({
        mutationFn: () => axios.delete("/auth/myself"),
        onSuccess: () => {
            enqueueSnackbar("User deleted", { variant: "success" })

            // Optionally, clear user data after successful deletion
            setName("")
            setEmail("")
            setCreatedAt("")
            setLastLogin("")
            setStats({
                totalDocuments: 0,
                totalEdits: 0,
                totalComments: 0,
            })

            navigate("/", { replace: true })
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data || "An unknown error occurred"

            enqueueSnackbar(`Failed to delete user: ${errorMessage}`, {
                variant: "error",
            })
        },
    })

    useEffect(() => {
        if (!userQuery.data) {
            navigate("/", { replace: true })
            return
        }

        const { name, email, createdAt, lastLogin, stats } =
            userQuery.data.data.user

        setName(name)
        setEmail(email)
        setCreatedAt(createdAt)
        setLastLogin(lastLogin)
        setStats(stats)
    }, [userQuery.data, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()

        updateUserMutation.mutate({
            name,
            email,
        })
    }

    const handleResetPassword = () => {
        setPrompt({
            isOpen: true,
            title: "Reset Password",
            message: "Are you sure you want to reset your password?",
            confirmText: "Reset",
            cancelText: "Cancel",
            isLoading: false,
            loadingText: "Loading",
            confirmAction: () => {
                navigate("/profile/reset", { replace: true })
            },
        })
    }

    const handleDeleteAccount = () => {
        setPrompt({
            isOpen: true,
            title: "Delete Account",
            message:
                "Are you sure you want to delete your account? This action cannot be undone.",
            confirmText: "Delete",
            cancelText: "Cancel",
            isLoading: deleteUserMutation.isPending,
            loadingText: "Deleting",
            confirmAction: () => {
                deleteUserMutation.mutate()
            },
        })
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
            {prompt.isOpen && (
                <Prompt
                    isOpen={prompt.isOpen}
                    onClose={() =>
                        setPrompt((prev) => ({ ...prev, isOpen: false }))
                    }
                    onConfirm={prompt.confirmAction}
                    title={prompt.title}
                    message={prompt.message}
                    isLoading={prompt.isLoading}
                    loadingText={prompt.loadingText}
                    confirmText={prompt.confirmText}
                    cancelText={prompt.cancelText}
                />
            )}

            <VStack spacing={6} align="stretch">
                <Heading as="h1" size="lg" textAlign="center">
                    Your Profile
                </Heading>
                <Text fontSize="sm" textAlign="center">
                    View and update your profile information
                </Text>

                <Box
                    display="flex"
                    flexDirection={["column", "row"]}
                    width="full"
                >
                    <Box flex="1" pr={[0, 4]} mb={[4, 0]}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired mt={4}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                    </Box>

                    <Box flex="1" pl={[0, 4]}>
                        <Box mb={4}>
                            <Text fontWeight="bold" color="teal.500">
                                Account Created
                            </Text>
                            <Text fontStyle="italic" color="gray.600">
                                {new Date(createdAt).toLocaleString()}
                            </Text>
                        </Box>

                        <Box mb={4}>
                            <Text fontWeight="bold" color="teal.500">
                                Last Sign In
                            </Text>
                            <Text fontStyle="italic" color="gray.600">
                                {new Date(lastLogin).toLocaleString()}
                            </Text>
                        </Box>

                        <Box mb={4}>
                            <Text fontWeight="bold" color="teal.500">
                                Statistics
                            </Text>
                            <Text color="blue.600" fontWeight="semibold">
                                {stats?.totalDocuments}{" "}
                                <Text
                                    as="span"
                                    fontWeight="normal"
                                    color="gray.500"
                                >
                                    Total Documents
                                </Text>
                            </Text>
                            <Text color="blue.600" fontWeight="semibold">
                                {stats?.totalEdits}{" "}
                                <Text
                                    as="span"
                                    fontWeight="normal"
                                    color="gray.500"
                                >
                                    Total Edits
                                </Text>
                            </Text>
                            <Text color="blue.600" fontWeight="semibold">
                                {stats?.totalComments}{" "}
                                <Text
                                    as="span"
                                    fontWeight="normal"
                                    color="gray.500"
                                >
                                    Total Comments
                                </Text>
                            </Text>
                        </Box>
                    </Box>
                </Box>

                <VStack width="full" spacing={4}>
                    <HStack spacing={4} width="full">
                        <Button
                            type="submit"
                            variant="outline"
                            colorScheme="green"
                            onClick={handleSubmit}
                            isLoading={updateUserMutation.isPending}
                            loadingText="Updating"
                            disabled={updateUserMutation.isPending}
                            spinner={<BeatLoader size={8} color="white" />}
                            width="full"
                        >
                            Update Profile
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            colorScheme="orange"
                            onClick={handleResetPassword}
                            rightIcon={<BiReset />}
                            width="full"
                        >
                            Reset Password
                        </Button>
                    </HStack>
                    <Button
                        variant="solid"
                        colorScheme="red"
                        width="full"
                        onClick={handleDeleteAccount}
                    >
                        <Text>Delete Account</Text>
                    </Button>
                    <Button
                        as={Link}
                        to=".."
                        leftIcon={<BiArrowBack />}
                        variant="outline"
                        width="full"
                    >
                        <Text>Go Back</Text>
                    </Button>
                </VStack>
            </VStack>
        </Box>
    )
}

export default Profile
