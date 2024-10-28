import React, { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    useColorModeValue,
    Flex,
    Heading,
    Text,
    Tabs,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react"

import { Login, SignUp } from "@components/forms"
import { useAuth } from "@/systems/Auth"

import FancyText from "@carefully-coded/react-text-gradient"

function Index() {
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()

    useLayoutEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard")
        }
    }, [isLoggedIn, navigate])

    const [tabIndex, setTabIndex] = useState(0) // Control active tab

    const handleTabChange = (index) => {
        setTabIndex(index)
    }

    return (
        <Flex direction="column" align="center" maxW="xl" m="auto">
            <Flex direction="column" align="center" width="full">
                <Heading as="h1" size="4xl">
                    <FancyText
                        gradient={{
                            from: useColorModeValue("#FDE68A", "#F472B6"),
                            to: useColorModeValue("#EC4899", "#8c8afd"),
                        }}
                        animate
                        animationduration={2000}
                    >
                        Welcome to
                    </FancyText>
                </Heading>
                <Text fontSize="lg" textAlign="center">
                    <Text as="b">SSR-Editor</Text> is a{" "}
                    <Text as="em">real-time</Text> web app for collaborative
                    document creation and editing, enabling instant updates for
                    all users.
                </Text>
            </Flex>

            <Flex direction="column" align="center" width="full">
                {/* Tabs for Login and Sign Up */}
                <Tabs
                    width="full"
                    variant="enclosed"
                    isFitted
                    index={tabIndex}
                    onChange={handleTabChange}
                >
                    <TabPanels>
                        <TabPanel>
                            <Login setTabIndex={setTabIndex} />
                        </TabPanel>
                        <TabPanel>
                            <SignUp setTabIndex={setTabIndex} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    )
}

export default Index
