import React from "react"

import { SyncLoader } from "react-spinners"

function Spinner({ isProcessing }) {
    return (
        <div style={{ display: isProcessing ? "block" : "none" }}>
            <SyncLoader color="#36d7b7" />
        </div>
    )
}

export default Spinner
