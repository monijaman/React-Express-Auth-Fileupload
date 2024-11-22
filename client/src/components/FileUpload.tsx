import React, { useState } from "react";

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const token = localStorage.getItem("token"); // Retrieve token from localStorage

            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });


            const data = await response.json();
            if (data.success) {
                alert("File uploaded successfully!");
            } else {
                alert("Upload failed: " + data.error);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred during upload.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-xl font-medium text-gray-700">Upload File</h3>
            <div className="mt-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-gray-700 border rounded-md p-2"
                />
                <button
                    onClick={handleUpload}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    disabled={!selectedFile}
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default FileUpload;
