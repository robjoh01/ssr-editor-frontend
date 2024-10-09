// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react"

// 2. Add your color mode config
const config = {
    initialColorMode: "dark", // 'dark' | 'light'
    useSystemColorMode: true,
}

// Define colors for light and dark themes
const lightTheme = {
    colors: {
        accent: "#FF6347", // Example: Tomato
        primary: "#0070F3", // Example: Blue
        secondary: "#F7B731", // Example: Yellow
        background: "#FFFFFF", // Light background
        foreground: "#000000", // Light text color
    },
}

const darkTheme = {
    colors: {
        accent: "#FF4500", // Example: OrangeRed
        primary: "#1E90FF", // Example: DodgerBlue
        secondary: "#FFD700", // Example: Gold
        background: "#2D3748", // Dark background
        foreground: "#FFFFFF", // Dark text color
    },
}

// 3. extend the theme
const theme = extendTheme({
    config,
    fonts: {
        heading: "'Poppins', sans-serif", // Custom font for headings
        body: "'Inter', sans-serif", // Custom font for body text
    },
})

export default theme
