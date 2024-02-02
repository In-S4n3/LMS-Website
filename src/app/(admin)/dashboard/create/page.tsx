'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, TextInput } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoIosAlert } from 'react-icons/io';
import { z } from 'zod';

import { Button } from '@/src/components/Button';

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Please, write your title' })
    .max(20, { message: 'Your title is too long' }),
});

const CreatePage = () => {
  const [toasterError, setToasterError] = useState('');
  const { push } = useRouter();

  const createForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const toaster = (error: string) => {
    return (
      <Alert variant="light" color="red" title="Error" icon={<IoIosAlert />}>
        {error}
      </Alert>
    );
  };

  const { isSubmitting } = createForm.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post('/api/courses', data);
      push(`/dashboard/courses/${res.data.id}`);
    } catch (error: any) {
      setToasterError(error.message);
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-xl flex-col gap-y-10 p-6 md:justify-center">
      <h1 className="text-2xl font-semibold leading-6">Name your Course</h1>
      <form className="space-y-6" onSubmit={createForm.handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <TextInput
              {...createForm.register('title')}
              id="title"
              radius="md"
              className="block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              autoComplete="text"
              disabled={isSubmitting}
              error={createForm.formState.errors.title?.message}
            />
          </div>
        </div>
        {toasterError && toaster(toasterError)}
        <div>
          <Button
            type="submit"
            className="flex w-full justify-center"
            loading={isSubmitting}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
