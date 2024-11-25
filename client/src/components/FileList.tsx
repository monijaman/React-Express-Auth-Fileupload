import { useEffect, useState } from "react";
import { BASE_URL } from '../utils/constants';
import Cookies from "js-cookie";

interface FileData {
    id: number;
    fileName: string;
    filePath: string;
    uploadedAt: string;
}

interface FileListProps {
    fileUploaded: boolean;
}

const FileList = ({ fileUploaded }: FileListProps) => {
    const [files, setFiles] = useState<FileData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1); // Current page
    const [totalPages, setTotalPages] = useState<number>(1); // Total pages

    const fetchFiles = async () => {
        try {
            setLoading(true);
            setError(null); // Reset error state
            const token =  Cookies.get('token'); // Retrieve token from localStorage

            const response = await fetch(`${BASE_URL}/api/files?page=${page}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setFiles(data.files); // Update files
                setTotalPages(data.totalPages); // Update total pages
            } else {
                setError(data.message || "Failed to fetch files");
            }
        } catch (error) {
            setError("An error occurred while fetching files.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchFiles();
    }, [page, fileUploaded]); // Re-fetch files when page changes

    const handleNextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    if (loading) {
        return <p>Loading files...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }


    if (loading) {
        return <p>Loading files...</p>;
    }


    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-xl font-medium text-gray-700">Uploaded Files  </h3>
            {files.length === 0 ? (
                <p className="mt-4 text-gray-600">No files uploaded yet.</p>
            ) : (
                <ul className="mt-4 space-y-4">
                    {files.map((file) => (
                        <li
                            key={file.id}
                            className="flex flex-col md:flex-row justify-between items-center p-2 border rounded-md"
                        >
                            {/* Image Preview */}
                            <img
                                src={file.filePath}
                                alt={file.fileName}
                                className="w-32 h-32 object-cover rounded-md"
                            />
                            {/* File Info */}
                            <div className="mt-4 md:mt-0 md:ml-4 flex-1">
                                <p className="text-gray-800 font-medium">{file.fileName}</p>
                                <p className="text-gray-500 text-sm">
                                    Uploaded: {new Date(file.uploadedAt).toLocaleString()}
                                </p>
                                <a
                                    href={file.filePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline mt-2 inline-block"
                                >
                                    View Full Image
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {/* Pagination Controls */}
            <div className="mt-6 flex justify-between items-center">
                <button
                    disabled={page <= 1}
                    onClick={handlePreviousPage}
                    className={`px-4 py-2 text-white rounded ${page <= 1 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {page} of {totalPages}
                </span>
                <button
                    disabled={page >= totalPages}
                    onClick={handleNextPage}
                    className={`px-4 py-2 text-white rounded ${page >= totalPages ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FileList;
