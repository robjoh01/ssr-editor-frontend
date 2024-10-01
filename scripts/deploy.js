"use strict"

const { spawn } = require("child_process")
require("dotenv").config()

// Log to indicate that the script is running
console.log("Deploy script is running...")

const user = process.env.REACT_APP_DEPLOY_USER

if (!user) {
    console.error(
        "Error: 'REACT_APP_DEPLOY_USER' is not set. Please check your .env file or environment variables."
    )
    process.exit(1) // Exit the process with a failure code
}

const command = "rsync"
const args = [
    "-av",
    "--delete",
    "build/",
    `${user}@ssh.student.bth.se:www/editor`,
]

// Spawn a new child process to run the command
const deployProcess = spawn(command, args, { shell: true })

// Handle standard output
deployProcess.stdout.on("data", (data) => {
    process.stdout.write(data) // Print stdout directly without prefixes
})

// Handle standard error
deployProcess.stderr.on("data", (data) => {
    process.stderr.write("\n") // Print a newline before the error message
    process.stderr.write("\x1b[31m") // Set text color to red
    process.stderr.write(data) // Print stderr directly without prefixes
    process.stderr.write("\x1b[0m") // Reset text color to default
})

// Handle errors during spawning
deployProcess.on("error", (error) => {
    console.error(`Error: ${error.message}`)
})

// Handle process exit
deployProcess.on("close", (code) => {
    if (code !== 0) {
        console.error(`Process exited with code: ${code}`)
    } else {
        console.log("Deployment completed successfully.")
    }
})
