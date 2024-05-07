import { DocumentNode, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
export function useCustomMutation(request: DocumentNode, renderToast: boolean) {
  const [postRequest, obj] = useMutation(request);
  const { data, error, loading } = obj;
  console.log('data', data);
  useEffect(() => {
    if (!loading && (data || error)) {
      if (!error) {
        toast.success('Mutation Success', {
          position: 'bottom-right',
          icon: () => null,
        });
      } else {
        toast.error('An error occurred', {
          position: 'bottom-right',
          icon: () => null,
        });
      }
    }
  }, [loading, data, error]);

  return [postRequest, obj];
}
