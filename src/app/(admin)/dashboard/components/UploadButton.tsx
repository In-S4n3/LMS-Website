'use client';
import React, { useState } from 'react';

import { FileButton } from '@mantine/core';

import { Button } from '@/src/components/Button';

export const UploadButton = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <FileButton onChange={setFile} accept="video/mp4,video/x-m4v,video/*">
      {(props) => <Button {...props}>Upload Video</Button>}
    </FileButton>
  );
};
