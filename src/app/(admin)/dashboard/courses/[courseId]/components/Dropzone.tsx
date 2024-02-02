'use client';

import { ourFileRouter } from '@/src/app/api/uploadthing/core';
import { UploadDropzone } from '@/src/lib/uploadthing';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const Dropzone = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url as string);
      }}
      onUploadError={(error) => {
        console.log(`ERROR! ${error.message}`);
      }}
    />
  );
};
