'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/src/components/Button';

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Your title is too short.' })
    .max(20, { message: 'Your title is too long' }),
});

const CreatePage = () => {
  const createForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = createForm.formState;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col gap-y-10 p-6 md:justify-center">
      <h1 className="text-2xl">Name your Course</h1>
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
