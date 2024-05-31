import React from "react";
import { Button } from "../Button";

const PDFViewer = ({ src }) => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const handleDownload = () => {
        window.open(src?.url, '_blank');
    };

    return (
        <div className={`w-full ${!isSafari && "h-[800px]"} overflow-auto`} style={{ WebkitOverflowScrolling: "touch" }}>
            {!isSafari ? <iframe
                src={src?.url}
                title="PDF Viewer"
                style={{ width: "100%", height: "100%", border: "none" }}
                allowFullScreen
            /> :
                <Button label="Download Pitch" onClick={handleDownload} />
            }
        </div>
    );
};

export default PDFViewer;
