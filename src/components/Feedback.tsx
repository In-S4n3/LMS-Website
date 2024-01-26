import clsx from 'clsx';
import { BiError } from 'react-icons/bi';
import { CiCircleCheck } from 'react-icons/ci';

export function Feedback({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) {
  return (
    <div
      className={clsx(
        'my-5 rounded-md p-4',
        error ? 'bg-red-50' : 'bg-green-50',
      )}
    >
      <div className="flex">
        <div className="shrink-0">
          {error ? (
            <BiError size={20} fill="#e91e63" />
          ) : (
            <CiCircleCheck size={20} fill="#4caf50" />
          )}
        </div>
        <div className="ml-3">
          <p
            className={clsx(
              'text-sm font-medium',
              error ? 'text-red-800' : 'text-green-800',
            )}
          >
            {error ? error : success}
          </p>
        </div>
      </div>
    </div>
  );
}
