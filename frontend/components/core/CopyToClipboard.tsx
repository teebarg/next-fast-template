import React from "react";

const CopyToClipboard = () => {
    const textToCopy = "This is the text to be copied";

    const handleCopyToClipboard = async () => {
        try {
            // eslint-disable-next-line no-undef
            await navigator.clipboard.writeText(textToCopy);
        } catch (err) {
            // eslint-disable-next-line no-console
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
