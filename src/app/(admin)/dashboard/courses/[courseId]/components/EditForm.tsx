'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/src/components/Button';
import { EditFormSchema } from '@/src/schemas';

import { Dropzone } from './Dropzone';

export const EditForm = () => {
  const editForm = useForm<z.infer<typeof EditFormSchema>>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      title: '',
      description: '',
      // categoryId: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof EditFormSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={editForm.handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <TextInput
                {...editForm.register('title')}
                id="title"
                radius="md"
                className="block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                autoComplete="text"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <TextInput
                {...editForm.register('description')}
                id="description"
                radius="md"
                className="block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                autoComplete="text"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Course Image
            </label>
            <div className="mt-2">
              <Dropzone
                endpoint="courseImage"
                onChange={(url) => {
                  console.log(url);
                }}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="flex w-full justify-center">
              Edit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
