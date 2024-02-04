'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { NumberInput } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/src/components/Button';
import { PriceSchema } from '@/src/schemas';

export const PriceForm = ({
  initialData,
  courseId,
}: {
  initialData: Record<string, any>;
  courseId: string;
}) => {
  const { refresh } = useRouter();
  const priceForm = useForm<z.infer<typeof PriceSchema>>({
    resolver: zodResolver(PriceSchema),
    defaultValues: {
      price: initialData.price,
    },
  });

  const onSubmit = async (values: z.infer<typeof PriceSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated');
      refresh();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const { isSubmitting } = priceForm.formState;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={priceForm.handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Course Price
            </label>
            <div className="mt-2">
              <NumberInput
                defaultValue={initialData.price}
                leftSection={<span className="text-gray-500">€</span>}
                allowNegative={false}
                prefix="€"
                radius="md"
                className="block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                styles={{
                  input: {
                    borderRadius: '10px',
                    borderColor: 'lightgray',
                    display: 'block',
                    color: 'rgb(17 24 39 / var(--tw-text-opacity))',
                  },
                }}
                onChange={(value) => {
                  priceForm.setValue('price', value as number);
                }}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center"
              loading={isSubmitting}
            >
              Edit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
