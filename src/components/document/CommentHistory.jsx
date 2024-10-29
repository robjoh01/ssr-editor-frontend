import React, { useEffect, useState } from "react"

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Tooltip,
    Text,
    Heading,
    HStack,
    VStack,
    Divider,
    Skeleton,
} from "@chakra-ui/react"

function CommentHistory({ isOpen, onClose, comments, onHighlight, isLoading }) {
    // Sort comments by date in descending order (newest comments at the top)
    const sortedComments = [...comments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Comment History</DrawerHeader>

                <DrawerBody>
                    {isLoading ? (
                        <VStack gap={4} align="stretch">
                            {Array.from({ length: 3 }).map(
                                (
                                    _,
                                    index // Display 3 skeletons
                                ) => (
                                    <Skeleton
                                        key={index}
                                        height="100px"
                                        width="100%"
                                        borderRadius="md"
                                    />
                                )
                            )}
                        </VStack>
                    ) : sortedComments.length > 0 ? (
                        <VStack gap={4} align="stretch">
                            {sortedComments.map((comment) => (
                                <Card
                                    key={comment.id}
                                    cursor="pointer"
                                    onClick={() => {
                                        onHighlight(comment)
                                        // Close the drawer
                                        onClose()
                                    }}
                                    shadow="md"
                                    borderWidth="1px"
                                    borderColor="blackAlpha.200"
                                    p={2} // Reduce padding for a more compact card
                                >
                                    <CardHeader p={1}>
                                        <Tooltip label={comment.user.email}>
                                            <Heading
                                                as="h3"
                                                size="sm" // Smaller heading size for compactness
                                                fontWeight="bold"
                                            >
                                                {comment.user.name}
                                            </Heading>
                                        </Tooltip>
                                    </CardHeader>
                                    <CardBody p={1}>
                                        <Text fontSize="sm">
                                            {comment.content}
                                        </Text>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter p={1}>
                                        <VStack gap={1} align="stretch">
                                            <HStack
                                                justifyContent="space-between"
                                                fontSize="sm"
                                            >
                                                <Text>Created:</Text>
                                                <Text fontWeight="bold">
                                                    {new Date(
                                                        comment.createdAt
                                                    ).toLocaleString()}
                                                </Text>
                                            </HStack>
                                            <HStack
                                                justifyContent="space-between"
                                                fontSize="sm"
                                            >
                                                <Text>Last Updated:</Text>
                                                <Text fontWeight="bold">
                                                    {new Date(
                                                        comment.updatedAt
                                                    ).toLocaleString()}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </CardFooter>
                                </Card>
                            ))}
                        </VStack>
                    ) : (
                        <Text>No comments available</Text>
                    )}
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CommentHistory
