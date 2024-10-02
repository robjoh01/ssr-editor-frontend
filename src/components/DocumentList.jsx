import React from "react"
import { Link } from "react-router-dom"
import { Skeleton, List, ListItem, Icon, Text } from "@chakra-ui/react"
import { IoDocumentText } from "react-icons/io5"

/* eslint-disable react/prop-types */
function DocumentList({ documents }) {
    return (
        <List spacing={3}>
            {documents.length > 0
                ? documents.map((doc) => (
                      <ListItem key={doc.id} display="flex" alignItems="center">
                          <Icon
                              as={IoDocumentText}
                              boxSize={6}
                              mr={4}
                              color="teal.500"
                          />
                          <Link to={`/edit/${doc.id}`}>
                              <Text fontSize="lg" fontWeight="bold">
                                  {doc.title}
                              </Text>
                          </Link>
                      </ListItem>
                  ))
                : // Show skeleton as a loading state
                  [...Array(5)].map((_, index) => (
                      <Skeleton height="20px" key={index} mb={2} />
                  ))}
        </List>
    )
}

export default DocumentList
