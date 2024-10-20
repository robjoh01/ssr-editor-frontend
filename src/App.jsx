import routes from "~react-pages"
import React, { Suspense } from "react"
import { useRoutes } from "react-router-dom"

import { Container, Grid, GridItem } from "@chakra-ui/react"

import { Header, Footer, Loading } from "@/components"

function App() {
    return (
        <Grid templateRows="auto 1fr auto" minH="100dvh">
            {/* Header */}
            <GridItem>
                <Header />
            </GridItem>

            {/* Main Content */}
            <GridItem as="main" h="full">
                <Container maxW="container.xl" py={5} h="full">
                    <Suspense fallback={<Loading />}>
                        {useRoutes(routes)}
                    </Suspense>
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
