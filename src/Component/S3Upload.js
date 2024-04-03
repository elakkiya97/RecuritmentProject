import React, { useState } from 'react';
import { Button, Upload, Spin, Image } from 'antd';
import { uploadFileToS3 } from '../config/AwsConfig';

const S3Upload = (props) => {
    const { name, setFormData, dynamicPath } = props;
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleBeforeUpload = () => {
        return false; // Prevent default upload behavior
    };

    const fileOnChange = async (file, name) => {
        setIsLoading(true);
        try {
            const response = await uploadFileToS3(file, dynamicPath);
            const { Location } = response;
            if (Location) {
                setFormData(name, Location);
                setUploadedImageUrl(Location); // Store the URL of the uploaded image
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            setIsLoading(false);
        }
    };

    return (
        <Upload
            beforeUpload={handleBeforeUpload}
            onChange={(info) => {
                fileOnChange(info.file, name);
            }}
            maxCount={1}
            showUploadList={{
                showRemoveIcon: false,
                showPreviewIcon: false,
            }}
            defaultFileList={[]}
        >
            <Button>Choose File</Button>
            {isLoading && (
                <div>
                    <Spin />
                </div>
            )}
            {uploadedImageUrl && (
                <div>
                    <Image width={200} src={uploadedImageUrl} /> {/* Display the uploaded image */}
                </div>
            )}
        </Upload>
    );
};

export default S3Upload;