import React, { useState } from 'react';
import pdf from '../../assets/pdf.svg';
import pdfIcon from '../../assets/pdfIcon.svg';

function ClassnotesPdf({ link, subjectName }) {
    const [loadError, setLoadError] = useState(false);

    const openPdf = () => {
        window.open(link, '_blank');
    };

    const handleIframeError = () => {
        setLoadError(true);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="pdf-card border-black justify-center">
                <div className="pdf-image" onClick={openPdf}>
                    {loadError ? (
                        <img src={pdf} alt="PDF Thumbnail" />
                    ) : (
                        <iframe
                            src={link}
                            width="300"
                            height="200"
                            title="PDF Preview"
                            onError={handleIframeError}
                            sandbox="allow-same-origin allow-scripts"
                        ></iframe>
                    )}
                </div>
                <div className='flex flex-wrap cursor-pointer' onClick={openPdf}>
                    <img src={pdfIcon} alt="" />
                    <div className='max-[500px]:pl-3 font-medium text-lg pt-2 pl-3'>{subjectName}</div>
                </div>
            </div>
        </div>
    );
}

export default ClassnotesPdf;
