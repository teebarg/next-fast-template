import React from "react";

const CopyToClipboard = () => {
    const textToCopy = "This is the text to be copied";

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            alert("Text copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div>
            <p>{textToCopy}</p>
            <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
        </div>
    );
};

export default CopyToClipboard;
