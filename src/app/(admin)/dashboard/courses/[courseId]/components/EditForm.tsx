'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ActionIcon, Select, TextInput, Textarea } from '@mantine/core';
import axios from 'axios';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import { z } from 'zod';

import { Button } from '@/src/components/Button';
import { EditFormSchema, ImageSchema } from '@/src/schemas';

import { Dropzone } from './Dropzone';

export const EditForm = ({
  initialData,
  courseId,
  categories,
}: {
  initialData: Record<string, any>;
  courseId: string;
  categories: Record<string, any>[];
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const editForm = useForm<z.infer<typeof EditFormSchema>>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: z.infer<typeof EditFormSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const onSubmitImage = async (url: z.infer<typeof ImageSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, url);
      toast.success('Course updated');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
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
                error={editForm.formState.errors.title?.message}
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
              <Textarea
                {...editForm.register('description')}
                id="description"
                radius="md"
                className="block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                autoComplete="text"
                error={editForm.formState.errors.description?.message}
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

            {initialData.imageUrl && !isEditing && (
              <div className="relative mt-2 aspect-video">
                <div className="absolute right-2 top-2 z-50 flex items-center justify-end font-medium">
                  {initialData.imageUrl && (
                    <ActionIcon className="bg-indigo-500" onClick={toggleEdit}>
                      <FaRegEdit fill="white" />
                    </ActionIcon>
                  )}
                </div>
                <Image
                  alt="Upload"
                  fill
                  className="rounded-md object-cover"
                  src={initialData.imageUrl}
                />
              </div>
            )}
            {!initialData.imageUrl ||
              (isEditing && (
                <div className="relative">
                  <div className="absolute right-2 top-2 z-50 flex items-center justify-end font-medium">
                    {initialData.imageUrl && (
                      <ActionIcon
                        className="bg-indigo-500"
                        onClick={toggleEdit}
                      >
                        <FaRegEdit fill="white" />
                      </ActionIcon>
                    )}
                  </div>
                  <Dropzone
                    endpoint="courseImage"
                    onChange={(url) => {
                      if (url)
                        onSubmitImage({
                          imageUrl: url,
                        });
                    }}
                  />
                  <div className="mt-4 text-xs">
                    16:9 aspect ratio recommended
                  </div>
                </div>
              ))}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="mt-2">
              <Select
                defaultValue={initialData.categoryId}
                placeholder="Select category"
                data={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onChange={(value) => {
                  editForm.setValue('categoryId', value as string);
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
