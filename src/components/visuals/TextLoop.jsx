import React, { useState, useEffect } from "react"
import TextTransition, { presets } from "react-text-transition"
// import { Text } from "@chakra-ui/react"

const TextLoop = ({ textElements, duration = 3000 }) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            duration
        )
        return () => clearTimeout(intervalId)
    }, [textElements, duration])

    return (
        <TextTransition springConfig={presets.default}>
            {textElements[index % textElements.length]}
        </TextTransition>
    )
}

export default TextLoop
