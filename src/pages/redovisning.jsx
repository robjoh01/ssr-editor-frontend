import React from "react"

import {
    Grid,
    GridItem,
    Code,
    Flex,
    HStack,
    VStack,
    Box,
    Heading,
    Text,
    OrderedList,
    UnorderedList,
    ListItem,
    Link,
} from "@chakra-ui/react"

const links = [
    {
        href: "#authentication",
        text: "Autentisering",
    },
    {
        href: "#sockets",
        text: "Sockets",
    },
    {
        href: "#comments",
        text: "Kommentarer",
    },
    {
        href: "#code-mode",
        text: "Code-mode",
    },
    {
        href: "#graphql",
        text: "GraphQL",
    },
    {
        href: "#testing",
        text: "Testing",
    },
]

function Redovisning() {
    return (
        <Grid templateColumns="auto 1fr">
            <GridItem position="sticky" top={0} alignSelf="start">
                <OrderedList spacing={3} py={16}>
                    {links.map((link, index) => (
                        <ListItem key={index}>
                            <Link
                                href={link.href}
                                color="blue.500"
                                _hover={{
                                    color: "blue.800",
                                    _dark: { color: "blue.500" },
                                }}
                                _dark={{ color: "blue.300" }}
                                textDecoration="underline"
                            >
                                {link.text}
                            </Link>
                        </ListItem>
                    ))}
                </OrderedList>
            </GridItem>
            <GridItem py={16}>
                <VStack
                    maxW="xl"
                    mx="auto"
                    lineHeight="tall"
                    color="gray.700"
                    _dark={{ color: "gray.300" }}
                >
                    <Heading
                        as="h1"
                        size="4xl"
                        mb={4}
                        color="gray.800"
                        _dark={{ color: "gray.200" }}
                    >
                        Redovisning
                    </Heading>
                    <VStack align="stretch" gap={16} my={16}>
                        <VStack align="stretch" gap={4}>
                            <Heading
                                as="h2"
                                size="xl"
                                id="authentication"
                                color="gray.800"
                                _dark={{ color: "gray.200" }}
                            >
                                Krav 1: Autentisering
                            </Heading>
                            <Text>
                                Autentiseringen tog mycket tid och krävde massa
                                ändringar både på frontend och backend. För att
                                uppnå en säker hantering av JWT-token valde vi
                                att implementera både refresh- och access-token,
                                vilket innebar mycket kod och olika
                                lösningsmetoder för att säkerställa att detta
                                gjordes på ett säkert sätt.
                            </Text>

                            <Text>
                                Vi lade också till användarrättigheter för både
                                frontend- och backend-API-anrop. Backend är nu
                                inställt så att endast administratörer har
                                behörighet att göra ändringar i databasen.
                            </Text>

                            <Text>
                                Vi testade att integrera Mailgun i projektet,
                                där användare får ett email efter registrering
                                med en länk som är giltig i 48 timmar för att
                                slutföra registreringen.
                            </Text>

                            <Text>
                                Utvecklingen av autentiseringen var krävande,
                                men vi är nöjda med resultatet.{" "}
                            </Text>

                            <Text>
                                <Text as="b">Ett allvarligt problem</Text>{" "}
                                uppstod när en bugg skickade API-förfrågningar
                                till MongoDB med 30 operationer per sekund,
                                vilket maxade vår MongoDB-server. Lyckligtvis
                                stängdes servern automatiskt av på grund av
                                MongoDB funktion för att förhindra
                                överbelastning vid hög trafik.
                            </Text>
                        </VStack>
                        <VStack align="stretch" gap={4}>
                            <Heading
                                as="h2"
                                size="xl"
                                id="sockets"
                                color="gray.800"
                                _dark={{ color: "gray.200" }}
                            >
                                Krav 2: Sockets
                            </Heading>
                            <Text>
                                Arbetet med sockets tog relativt lång tid, även
                                om grunderna i koden inte var särskilt
                                komplicerade. Problemet uppstod när vi hanterade
                                data och variabler i React, särskilt med dess
                                olika hooks. Vi använde
                                <Code>useEffect</Code> för att reagera på
                                ändringar och styra rendering, men stötte på
                                problem eftersom
                                <Code>useEffect</Code> i kombination med{" "}
                                <Code>useRef</Code> ibland tog bort data som
                                ännu inte uppdaterats.
                            </Text>

                            <Text>
                                Anledningen till att vi valde{" "}
                                <Code>useRef</Code> var att{" "}
                                <Code>useEffect</Code> orsakade fördröjningar i
                                gränssnittet, speciellt i textfält där
                                användarupplevelsen blev lidande på grund av att{" "}
                                <Code>useEffect</Code> aktiverade komplex kod.{" "}
                                <Code>useRef</Code> gav bättre prestanda och
                                användes för att undvika onödiga renderingar,
                                till exempel när vi visade ikonen för
                                dokumentens status, som krävde omrendering utan
                                att påverka hela gränssnittet.
                            </Text>

                            <Text>
                                Det var även en utmaning att bestämma hur koden
                                skulle fungera optimalt. Vi övervägde{" "}
                                <Link
                                    color="teal.500"
                                    href="https://www.techtarget.com/whatis/definition/debouncing"
                                    isExternal
                                >
                                    debouncing
                                </Link>{" "}
                                för både frontend och backend samt när databasen
                                skulle uppdateras med ny information.
                            </Text>

                            <Text>
                                Vi använde också React-versionen av Quill
                                editor, vilket underlättade arbetet med
                                sockets.io. Quill stödjer{" "}
                                <Text as="b">plugins</Text>, vilket gjorde det
                                möjligt att lägga till en{" "}
                                <Link
                                    color="teal.500"
                                    href="https://www.npmjs.com/package/quill-cursors"
                                    isExternal
                                >
                                    cursors
                                </Link>{" "}
                                för att visa var på sidan olika användare
                                befinner sig.
                            </Text>
                        </VStack>
                        <VStack align="stretch" gap={4}>
                            <Heading
                                as="h2"
                                size="xl"
                                id="comments"
                                color="gray.800"
                                _dark={{ color: "gray.200" }}
                            >
                                Krav 3: Kommentarer
                            </Heading>
                            <Text>
                                På grund av tidsbrist beslutade vi att
                                implementera en enkel lösning för att
                                kommentarer på ett dokument. Vi valde att
                                använda oss utav API POST-request. Vi skapade
                                även ett modal för comment history, där
                                användare kan se olika kommentarer.
                            </Text>

                            <Text>
                                Tyvärr kunde vi inte förbättra systemets
                                utseende, eftersom det saknades fungerande
                                plugins för Quill editor som stödjer
                                kommentarsfunktioner. Därför fick vi nöja oss
                                med en grundläggande lösning.
                            </Text>

                            <Text>
                                Vi stötte också på liknande utmaningar med
                                sockets, där vi behövde bestämma oss vad som
                                skulle hanteras av backend med MongoDB-databasen
                                och vilka funktioner som skulle skötas via
                                frontend med Socket.IO.
                            </Text>
                        </VStack>
                        <VStack align="stretch" gap={4}>
                            <Heading
                                as="h2"
                                size="xl"
                                id="code-mode"
                                color="gray.800"
                                _dark={{ color: "gray.200" }}
                            >
                                Krav 4: Code-mode
                            </Heading>
                            <Text>
                                Vi började med att gå igenom kraven och granska
                                API-dokumentationen för kodsystemet. För att
                                möta dessa krav installerade vi flera paket,
                                bland annat monaco-editor för att integrera med
                                React-ramverket.
                            </Text>

                            <Text>
                                Vi använde JWT med refresh token genom
                                API-objektet. Dock var vi tvungna att ta bort
                                credentials när vi skickade koden till
                                API-systemet, eftersom{" "}
                                <Link
                                    href="https://execjs.emilfolino.se/code"
                                    isExternal
                                    color="teal.600"
                                >
                                    https://execjs.emilfolino.se/code
                                </Link>{" "}
                                inte accepterade dem.
                            </Text>

                            <Text>
                                Därefter utvecklade vi en sida för code-mode,
                                där vi inkluderade exempel på kod och
                                implementerade en koppling mellan API requests
                                och display av resultaten i code editorn. Allt
                                fungerade smidigt och vi stötte inte på några
                                större hinder under processen.
                            </Text>
                        </VStack>
                        <VStack align="stretch" gap={4}>
                            <Heading
                                as="h2"
                                size="xl"
                                id="graphql"
                                color="gray.800"
                                _dark={{ color: "gray.200" }}
                            >
                                Krav 5: GraphQL
                            </Heading>
                            <Text>
                                Vi började med att titta på hur GraphQL fungerar
                                och hur stor skillnad det är mellan från ett
                                REST API. Vi bestämde oss för att bara hämta
                                information från GraphQL.
                            </Text>

                            <Text>
                                Sedan skapade vi en GraphQL-endpoint med flera
                                olika sökbara fält. Genom dem kunde vi hämta
                                information om användare, deras dokument, samt
                                dokument som dem har rättigheter till.
                            </Text>

                            <Text>
                                Trots att GraphQL krävde ett nytt arbetssätt
                                stötte vi inte på större problem under
                                implementationen.
                            </Text>
                        </VStack>
                        <VStack align="stretch" gap={4}>
                            <Heading
                                as="h2"
                                size="xl"
                                id="testing"
                                color="gray.800"
                                _dark={{ color: "gray.200" }}
                            >
                                Krav 6: Testning
                            </Heading>
                            <Text>
                                Vi började med att skapa tester för backend med
                                MongoDB, men stötte på problemet att databasen
                                behövde mockas. Tyvärr kunde vi inte hitta en
                                tydlig guide för hur man gör detta, men vi
                                upptäckte att det gick att mocka databasen med
                                Jest.
                            </Text>

                            <Text>
                                Eftersom autentisering och sockets tog extrem
                                tid, och vi gjorde flera omarbetningar av vårt
                                projekt, hade vi begränsad tid för att skriva
                                tester. Därför beslutade vi oss för att fokusera
                                på att implementera enklare tester. Jest.
                            </Text>

                            <Text>
                                Vi skapade även några GUI-tester för
                                frontend-delen av projektet för att säkerställa
                                att användargränssnittet fungerade som avsett.
                            </Text>
                        </VStack>
                        <VStack align="stretch" gap={4}>
                            <Heading
                                as="h2"
                                size="xl"
                                id="testing"
                                color="gray.800"
                                _dark={{ color: "gray.200" }}
                            >
                                Hjälpmedel
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    <Link
                                        href="https://github.com/robjoh01/ssr-editor-frontend"
                                        color="teal.500"
                                        isExternal
                                    >
                                        GitHub - Frontend
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link
                                        href="https://github.com/robjoh01/ssr-editor-backend"
                                        color="teal.500"
                                        isExternal
                                    >
                                        GitHub - Backend
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link
                                        href="https://www.student.bth.se/~roje22/editor"
                                        color="teal.500"
                                        isExternal
                                    >
                                        Studentservern - roje22
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link
                                        href="https://jsramverk-roje22-fbb8fgbngxgtfzgf.swedencentral-01.azurewebsites.net/"
                                        color="teal.500"
                                        isExternal
                                    >
                                        Azure - roje22
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link
                                        href="https://cloud.mongodb.com/v2/66ead90e5a4a0042b36e7d76#/clusters/detail/jsramverk"
                                        color="teal.500"
                                        isExternal
                                    >
                                        MongoDB - roje22
                                    </Link>
                                </ListItem>
                            </UnorderedList>
                        </VStack>
                    </VStack>
                </VStack>
            </GridItem>
        </Grid>
    )
}

export default Redovisning
