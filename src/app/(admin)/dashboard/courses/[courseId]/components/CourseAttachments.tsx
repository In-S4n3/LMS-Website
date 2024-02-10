'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { AttachmentSchema } from '@/src/schemas';

import { Dropzone } from './Dropzone';

export const CourseAttachments = ({ courseId }: { courseId: string }) => {
  const onSubmitAttachment = async (url: z.infer<typeof AttachmentSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, url);
      toast.success('Course updated');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-sm">
      <Dropzone
        onChange={(url) => {
          if (url)
            onSubmitAttachment({
              imageUrl: url,
            });
        }}
        endpoint="courseAttachment"
      />
    </div>
  );
};
