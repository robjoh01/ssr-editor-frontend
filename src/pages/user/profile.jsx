import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useUser } from "@/hooks/UserContext"
import useErrorHandler from "@/utils/errorHandler"

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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react"

import { BiArrowBack } from "react-icons/bi"

function Profile() {
    const { user, isLoggedIn, updateUser } = useUser()
    const { navigateToError } = useErrorHandler()

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!isLoggedIn) {
            navigateToError("unauthorized")
        } else {
            setFormData({
                name: user?.name || "",
                email: user?.email || "",
            })
        }
    }, [isLoggedIn, user])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        const result = await updateUser(formData)
        if (result.error) {
            setErrors(result.errors)
        }
        setIsLoading(false)
    }

    const handleResetPassword = () => {
        // Logic for resetting the password
        console.log("Resetting password...")
    }

    return (
        <Box className="container mx-auto px-4 py-8">
            <Box className="w-full max-w-4xl mx-auto p-4 border rounded-lg shadow-md">
                <VStack spacing={4} width="full">
                    <Heading as="h1" size="lg" width="full">
                        User Profile
                    </Heading>
                    <Text fontSize="sm" width="full">
                        View and update your profile information
                    </Text>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width="full"
                    >
                        <Box flex="1" pr={4}>
                            <form onSubmit={handleSubmit}>
                                <FormControl isRequired mb={4}>
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                    {errors.name && (
                                        <Alert status="error" mt={2}>
                                            <AlertIcon />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>
                                                {errors.name}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </FormControl>

                                <FormControl isRequired mb={4}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && (
                                        <Alert status="error" mt={2}>
                                            <AlertIcon />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>
                                                {errors.email}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </FormControl>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleResetPassword}
                                    width="full"
                                >
                                    Reset Password
                                </Button>
                            </form>
                        </Box>

                        <Box flex="1" pl={4}>
                            <Box mb={4}>
                                <Text fontWeight="bold" color="teal.500">
                                    Account Created
                                </Text>
                                <Text fontStyle="italic" color="gray.600">
                                    {new Date(
                                        user?.createdAt
                                    ).toLocaleDateString()}
                                </Text>
                            </Box>

                            <Box mb={4}>
                                <Text fontWeight="bold" color="teal.500">
                                    Last Sign In
                                </Text>
                                <Text fontStyle="italic" color="gray.600">
                                    {new Date(
                                        user?.lastSignIn
                                    ).toLocaleDateString()}
                                </Text>
                            </Box>

                            <Box mb={4}>
                                <Text fontWeight="bold" color="teal.500">
                                    Documents Stats
                                </Text>
                                <Text color="blue.600" fontWeight="semibold">
                                    {user?.documentsCreated}{" "}
                                    <Text
                                        as="span"
                                        fontWeight="normal"
                                        color="gray.500"
                                    >
                                        Created
                                    </Text>
                                </Text>
                                <Text color="blue.600" fontWeight="semibold">
                                    {user?.documentsShared}{" "}
                                    <Text
                                        as="span"
                                        fontWeight="normal"
                                        color="gray.500"
                                    >
                                        Shared
                                    </Text>
                                </Text>
                                <Text color="blue.600" fontWeight="semibold">
                                    {user?.documentsAccess}{" "}
                                    <Text
                                        as="span"
                                        fontWeight="normal"
                                        color="gray.500"
                                    >
                                        Accessed
                                    </Text>
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                    <HStack spacing={4} width="full" mt={4}>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            isLoading={isLoading}
                            width="full"
                        >
                            {isLoading ? "Updating..." : "Update Profile"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleResetPassword}
                            width="full"
                        >
                            Reset Password
                        </Button>
                    </HStack>
                    <Button
                        as={Link}
                        to=".."
                        variant="outline"
                        className="mb-4"
                        width="full"
                    >
                        <BiArrowBack className="mr-2 h-4 w-4" />
                        <Text>Go Back</Text>
                    </Button>
                </VStack>
            </Box>
        </Box>
    )
}

export default Profile
