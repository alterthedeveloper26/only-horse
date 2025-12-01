import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import React, { ReactNode } from 'react'
import { Button } from './ui/button';

const UploadImageButton = ({imageUploadHandle, children, className}: {imageUploadHandle: (mediaUrl: string) => void, children: ReactNode, className?: string}) => {

    const handleCldUpload = (result: CloudinaryUploadWidgetResults) => {
        imageUploadHandle((result.info as CloudinaryUploadWidgetInfo).secure_url)
    }

  return (
    <div>
        <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={handleCldUpload}
            >
              {({ open }) => {
                return (
                  <Button
                    type="button"
                    onClick={() => open()}
                    variant={"outline"}
                    className={className}
                  >
                    {children}
                  </Button>
                );
              }}
        </CldUploadWidget>
    </div>
  )
}

export default UploadImageButton