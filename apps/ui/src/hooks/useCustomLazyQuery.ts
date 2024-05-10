import {
  DocumentNode,
  LazyQueryResultTuple,
  useLazyQuery,
} from '@apollo/client';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
export function useCustomLazyQuery(
  request: DocumentNode,
  renderToast: boolean
) {
  const [loadData, obj] = useLazyQuery(request);
  const { data, error, loading } = obj;
  useEffect(() => {
    if (!loading) {
      if (!error && data) {
        toast.success('Welcome back', {
          position: 'bottom-right',
          icon: () => null,
        });
      } else if (error) {
        toast.error('An error occurred', {
          position: 'bottom-right',
          icon: () => null,
        });
      }
    }
  }, [loading, data, error]);

  return [loadData, obj];
}
