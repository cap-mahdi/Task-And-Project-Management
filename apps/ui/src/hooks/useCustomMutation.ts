import { DocumentNode, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
export function useCustomMutation(request: DocumentNode, renderToast: boolean) {
  const [postRequest, obj] = useMutation(request);
  const { data, error, loading } = obj;
  useEffect(() => {
    console.log('data', data);
    if (renderToast) {
      console.log(obj);
      if (!loading && (data || error)) {
        if (!error) {
          toast.success('Operation completed successfully', {
            position: 'bottom-right',
            icon: () => null,
          });
        } else {
          toast.error(
            error?.graphQLErrors[0].message ||
              error?.networkError.result.message ||
              'Something went wrong',
            {
              position: 'bottom-right',
              icon: () => null,
            }
          );
        }
      }
    }
  }, [loading, data, error]);

  return [postRequest, obj];
}
