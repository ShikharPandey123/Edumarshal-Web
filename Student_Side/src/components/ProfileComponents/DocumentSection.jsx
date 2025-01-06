import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import documents from "../../constants/Documents.json";
import DocumentCard from "./Documentcard";

const SkeletonLoading = () => {
    return (
        <>
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                    key={index}
                    className="md:w-42 w-21 relative md:ml-14 ml-2 my-7 flex flex-col items-center"
                >
                    <div className="rounded-t-2xl bg-gray-300 animate-pulse sm:h-[214px] sm:w-[214px] h-[180px] w-[180px]"></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-200 h-[30%] sm:w-[13.38rem] w-[11.25rem] rounded-b-2xl animate-pulse"></div>
                </div>
            ))}
        </>
    );
};

const DocumentSection = () => {
    const [uploadDocumentType, setUploadDocumentType] = useState("");
    const [documentUrls, setDocumentUrls] = useState({});
    const [loading, setLoading] = useState(true); // Loading state for fetching documents
    const [uploading, setUploading] = useState(false); // Loading state for uploading documents
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
            const response = await axios.get(
                import.meta.env.VITE_BACKEND_API + "/v1/student/profile/documents",
                {
                    withCredentials: true,
                }
            );
            setDocumentUrls(response.data.documents);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("Error fetching documents:", error);
            toast.error("Error fetching documents");
            setLoading(false); // Ensure loading is set to false even if there's an error
        }
    };

    const handleUploadClick = (document) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
            setUploadDocumentType(document.query);
        }
    };

    const handleDownloadClick = async (document) => {
        await fetchDocuments();
        const selectedDocument = documentUrls[document.query];
        if (selectedDocument) {
            window.open(selectedDocument, "_blank");
        } else {
            toast.error("Document not available");
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true); // Set uploading state to true
            const formData = new FormData();
            formData.append("document", file);
            try {
                await axios.post(
                    import.meta.env.VITE_BACKEND_API +
                    `/v1/student/profile/document?documentType=${uploadDocumentType}`,
                    formData,
                    {
                        withCredentials: true,
                    }
                );
                toast.success("Document uploaded successfully");
                await fetchDocuments();
            } catch (error) {
                console.error("Error uploading document:", error);
                toast.error("Error uploading document");
            } finally {
                setUploading(false); // Set uploading state to false after the upload is complete
            }
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="bg-[#ffffff] md:h-[73vh] h-[86vh] rounded-3xl md:m-6 overflow-y-auto">
                <div className="md:text-lg text-md md:ml-10 ml-6 mt-4 font-medium flex items-center justify-center md:justify-start">
                    Upload/Update Document
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-[94%] h-[2px] bg-[#D9D9D9] my-4"></div>
                </div>
                <div className="flex justify-center md:justify-evenly">
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 my-5 md:mr-8 items-center">
                        {loading || uploading ? ( // Show skeleton loading if data is loading or uploading
                            <SkeletonLoading />
                        ) : (
                            documents.map((document, cardIndex) => (
                                <DocumentCard
                                    key={cardIndex}
                                    document={document}
                                    handleUploadClick={() =>
                                        handleUploadClick(document)
                                    }
                                    handleDownloadClick={() =>
                                        handleDownloadClick(document)
                                    }
                                    uploadedFile={documentUrls[document.query]}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <input
                type="file"
                id="fileInput"
                name="fileInput"
                accept=".jpg,.jpeg,.png,.heic"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </div>
    );
}

export default DocumentSection;
