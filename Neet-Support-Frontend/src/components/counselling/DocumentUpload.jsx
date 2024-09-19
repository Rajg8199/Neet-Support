import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import {
  EyeOutlined,
  UploadOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import axios from "axios";

const DocumentUpload = () => {
  const documentList = [
    "Passport_Photo",
    "Signature",
    "Metric_Marksheet",
    "Intermediate_Marksheet",
    "NEET_Admit_Card",
    "NEET_Score_Card",
    "Caste_Certificate",
    "PwD_Certificate",
    "Domicile_Certificate",
    "Aadhar_Card",
    "Other_Document",
  ];

  const [uploadStatus, setUploadStatus] = useState({});
  const [files, setFiles] = useState({});
  const [previewUrls, setPreviewUrls] = useState({});
  const [authToken, setAuthToken] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null); // Selected file preview URL and type
  const [documentStatuses, setDocumentStatuses] = useState({});
  const [uploadedDocs, setUploadedDocs] = useState({}); // Store uploaded docs from API

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];

  // Fetch auth token and call fetchUserDocuments on component mount
  const fetchUserDocuments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/doc/files`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.length > 0) {
        const documentStatusMap = {};
        const uploadedDocMap = {};

        response.data.forEach((doc) => {
          documentStatusMap[doc.documentType] = doc.documentStatus;
          uploadedDocMap[doc.documentType] = doc; // Store the full doc object for later use
        });

        setDocumentStatuses(documentStatusMap);
        setUploadedDocs(uploadedDocMap);
      }
    } catch (error) {
      console.error("Error fetching user documents", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setAuthToken(token);
    fetchUserDocuments();
  }, [authToken]);

  // File validation logic
  const handleFileValidation = (file, docName) => {
    if (file.size > MAX_FILE_SIZE) {
      setUploadStatus((prev) => ({
        ...prev,
        [docName]: "File size exceeds 10MB",
      }));
      return false;
    }

    if (!allowedFileTypes.includes(file.type)) {
      setUploadStatus((prev) => ({
        ...prev,
        [docName]: "Invalid file type. Only JPG, PNG, and PDF are allowed.",
      }));
      return false;
    }
    return true;
  };

  // Handle file selection and validation
  const handleFileChangeValidated = (e, docName) => {
    const file = e.target.files[0];
    if (file && handleFileValidation(file, docName)) {
      setFiles((prev) => ({
        ...prev,
        [docName]: file,
      }));

      const url = URL.createObjectURL(file); // Create local preview URL
      setPreviewUrls((prev) => ({
        ...prev,
        [docName]: url, // Show selected file as preview
      }));

      setUploadStatus((prev) => ({
        ...prev,
        [docName]: "File selected",
      }));
    }
  };

  // Handle file upload to the backend
  const handleUpload = async () => {
    for (const docType of documentList) {
      const file = files[docType];
      if (!file) {
        setUploadStatus((prev) => ({
          ...prev,
          [docType]: "No file selected",
        }));
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", docType);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/doc/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Update the upload status and preview URL after successful upload
        setUploadStatus((prev) => ({
          ...prev,
          [docType]: "Uploaded successfully!",
        }));
        const { fileUrl } = response.data; // Assuming API returns fileUrl after upload
        setPreviewUrls((prev) => ({
          ...prev,
          [docType]: fileUrl, // Use server fileUrl after successful upload
        }));
        fetchUserDocuments(); // Re-fetch documents to update statuses
      } catch (error) {
        setUploadStatus((prev) => ({
          ...prev,
          [docType]: "Error uploading file",
        }));
      }
    }
  };

  // Fetch document for preview using its id
  const fetchDocumentById = async (docId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/doc/document`,
        { documentId: docId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const { fileType, fileData } = response.data;

      // Create a Base64-encoded data URL
      const base64Url = `data:${fileType};base64,${fileData}`;

      // Show the preview in a modal
      showPreviewModal(base64Url, fileType);
    } catch (error) {
      console.error("Error fetching document", error);
    }
  };

  // Show the preview modal
  const showPreviewModal = (previewUrl, fileType) => {
    setSelectedPreview({ url: previewUrl, type: fileType });
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPreview(null);
  };

  // Handle Eye icon click: Prioritize showing the selected local file if it exists; otherwise, fetch from API
  const handleEyeIconClick = (docName) => {
    if (previewUrls[docName] && files[docName]) {
      // If the user has chosen a new file, show the local file preview
      showPreviewModal(previewUrls[docName], files[docName].type);
    } else if (uploadedDocs[docName]) {
      // If no new file, but the document is already uploaded, fetch it from the API
      fetchDocumentById(uploadedDocs[docName].id);
    }
  };

  // Get the status label for a document
  const getStatusLabel = (status) => {
    switch (status) {
      case "Approved":
        return <span className="text-green-500 font-semibold">Approved</span>;
      case "Rejected":
        return <span className="text-red-500 font-semibold">Rejected</span>;
      case "Pending":
        return <span className="text-yellow-500 font-semibold">Pending</span>;
      default:
        return <span className="text-gray-500 font-semibold"></span>;
    }
  };

  return (
    <div className="md:p-4 bg-white rounded-xl  mx-auto">
      <h4 className="text-center text-lg font-semibold mb-6 text-[#097F78]">
        Upload Your Documents
      </h4>

      <div className="mb-10 px-10">
        <div className="text-center mb-4">
          <h5 className="text-md font-bold text-[#097F78]">
            Required Documents
          </h5>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b-2 border-gray-300">
                <th className="p-3 text-sm font-semibold text-center">
                  Document Name
                </th>
                <th className="p-3 text-sm font-semibold text-center">
                  Uploaded File
                </th>
                <th className="p-3 text-sm font-semibold text-center">
                  Status
                </th>
                <th className="p-3 text-sm font-semibold text-center">
                  Choose File
                </th>
              </tr>
            </thead>
            <tbody>
              {documentList.map((docName, idx) => (
                <tr key={idx} className="border-b border-gray-300">
                  <td className="p-3">{docName.replace(/_/g, " ")}</td>
                  <td className="p-3">
                    {previewUrls[docName] || uploadedDocs[docName] ? (
                      <div className="text-center items-center space-x-2 bg-gray-300 px-3 py-1 rounded-3xl">
                        <span className="text-sm text-gray-600">
                          {files[docName]?.name ||
                            uploadedDocs[docName]?.dcumentName ||
                            "Uploaded File"}
                        </span>
                        <EyeOutlined
                          onClick={() => handleEyeIconClick(docName)}
                          className="text-[#FF9245] cursor-pointer"
                        />
                      </div>
                    ) : (
                      <span className="bg-gray-300 px-3 text-center block py-1 rounded-3xl text-sm">
                        No file chosen
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {getStatusLabel(documentStatuses[docName])}
                  </td>
                  <td className="p-3 text-center">
                    <label
                      htmlFor={`upload-${idx}`}
                      className="choose-file-button flex items-center justify-center space-x-2"
                    >
                      <PaperClipOutlined className="icon" />
                      <span className="text-xs md:text-base ">Choose File</span>
                    </label>
                    <input
                      type="file"
                      id={`upload-${idx}`}
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileChangeValidated(e, docName)}
                    />
                    {uploadStatus[docName] && (
                      <span className="block mt-2 text-sm text-red-500">
                        {uploadStatus[docName]}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          type="primary"
          className="bg-[#FF9245] px-6 py-2 rounded-3xl text-white font-medium text-sm hover:bg-orange-600 transition"
          onClick={handleUpload}
        >
          <UploadOutlined /> Upload Documents
        </Button>
      </div>

      {/* Modal for file preview */}
      <Modal
        title="File Preview"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedPreview ? (
          selectedPreview.type === "application/pdf" ? (
            <>
              {/* Try displaying the PDF in an iframe */}
              <iframe
                src={selectedPreview.url}
                title="File Preview"
                width="100%"
                height="600px"
              />
              {/* Fallback download link in case iframe is not supported */}
              <p className="mt-4">
                If the preview is not visible,{" "}
                <a
                  href={selectedPreview.url}
                  download
                  className="text-blue-500 underline"
                >
                  click here to download the PDF.
                </a>
              </p>
            </>
          ) : selectedPreview.type.startsWith("image/") ? (
            <>
              {/* Display the image preview */}
              <img
                src={selectedPreview.url}
                alt="Preview"
                className="w-full h-auto"
              />
              {/* Fallback download link */}
              <p className="mt-4">
                If the image is not loading,{" "}
                <a
                  href={selectedPreview.url}
                  download
                  className="text-blue-500 underline"
                >
                  click here to download the image.
                </a>
              </p>
            </>
          ) : (
            <>
              {/* Fallback for unsupported file types */}
              <p>No preview available. </p>
              <a
                href={selectedPreview.url}
                download
                className="text-blue-500 underline"
              >
                Click here to download the file.
              </a>
            </>
          )
        ) : (
          <p>No preview available</p>
        )}
      </Modal>
    </div>
  );
};

export default DocumentUpload;
