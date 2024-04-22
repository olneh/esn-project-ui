import React, { useState } from 'react';
import axios from 'axios';

interface PhotoUploadFormProps {
    memberId: number;
}

const PhotoUploadForm: React.FC<PhotoUploadFormProps> = ({ memberId }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post(`/members/${memberId}/uploadPhoto`, formData, {
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
            });
            alert('Photo uploaded successfully: ' + response.data);
        } catch (error) {
            console.error('Upload failed', error);
            alert('Upload failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Upload photo:
                <input type="file" onChange={handleFileChange} />
            </label>
            <button type="submit">Upload</button>
        </form>
    );
};

export default PhotoUploadForm;
