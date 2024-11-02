import routes from "~react-pages"
import React, { Suspense } from "react"
import { useRoutes, useNavigate } from "react-router-dom"

import { Container, Grid, GridItem } from "@chakra-ui/react"

import { Header, Footer, Loading, Error } from "@/components/core"
import { ErrorBoundary } from "react-error-boundary"
import { PromptProvider } from "@/systems/Prompt"

function App() {
    const navigate = useNavigate()

    return (
        <Grid templateRows="auto 1fr auto" minH="100dvh">
            {/* Header */}
            <GridItem>
                <Header />
            </GridItem>

            {/* Main Content */}
            <GridItem as="main" h="full">
                <Container maxW="container.xl" py={5} h="full">
                    <ErrorBoundary
                        FallbackComponent={Error}
                        onReset={(details) => {
                            navigate(-1)
                        }}
                    >
                        <PromptProvider>
                            <Suspense fallback={<Loading />}>
                                {useRoutes(routes)}
                            </Suspense>
                        </PromptProvider>
                    </ErrorBoundary>
                </Container>
            </GridItem>

            {/* Footer */}
            <GridItem>
                <Footer />
            </GridItem>
        </Grid>
    )
}

export default App
