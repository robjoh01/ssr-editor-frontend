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

import { BiArrowBack, BiReset } from "react-icons/bi"
import { BeatLoader } from "react-spinners"

// TODO: Add loading status

function Profile() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [lastLogin, setLastLogin] = useState("")
    const [stats, setStats] = useState({
        totalDocuments: 0,
        totalEdits: 0,
        totalComments: 0,
    })

    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: () => axios.get("/auth/myself"),
    })

    const updateUserMutation = useMutation({
        mutationFn: (data) => axios.put("/auth/myself", data),
        onSuccess: () => {
            // Optionally, refetch user data after successful update
            userQuery.refetch()
        },
        onError: (error) => {
            console.error("Error updating user:", error)
        },
    })

    const deleteUserMutation = useMutation({
        mutationFn: () => axios.delete("/auth/myself"),
        onSuccess: () => {
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
            console.error("Error deleting user:", error)
        },
    })

    useEffect(() => {
        if (!userQuery.data) return

        console.log(userQuery.data)

        const { name, email, createdAt, lastLogin, stats } =
            userQuery.data.data.user

        setName(name)
        setEmail(email)
        setCreatedAt(createdAt)
        setLastLogin(lastLogin)
        setStats(stats)
    }, [userQuery.data])

    const handleSubmit = async (e) => {
        e.preventDefault()

        updateUserMutation.mutate({
            name,
            email,
        })
    }

    const handleResetPassword = () => {
        // Logic for resetting the password
        console.log("Resetting password...")

        navigate("/reset-password")
    }

    const handleDeleteAccount = () => {
        // TODO: Add logic for prompting the user to confirm deletion

        if (!window.confirm("Are you sure you want to delete your account?")) {
            return
        }

        deleteUserMutation.mutate()
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
                                {new Date(createdAt).toLocaleDateString()}
                            </Text>
                        </Box>

                        <Box mb={4}>
                            <Text fontWeight="bold" color="teal.500">
                                Last Sign In
                            </Text>
                            <Text fontStyle="italic" color="gray.600">
                                {new Date(lastLogin).toLocaleDateString()}
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
                            colorScheme="gray"
                            onClick={handleSubmit}
                            isLoading={updateUserMutation.isLoading}
                            loadingText="Updating"
                            spinner={<BeatLoader size={8} color="white" />}
                            width="full"
                        >
                            Update Profile
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
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
