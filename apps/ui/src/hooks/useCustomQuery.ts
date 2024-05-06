import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect } from "react";
import { toast } from "react-toastify";



export const useCustomQuery = (request: DocumentNode, renderToast: boolean) => {
    const { data, error, loading } = useQuery(request);


    if (!loading && renderToast) {
        if (!error) {
            toast.success('Welcome back', { position: 'bottom-right', icon: () => null });
        }
        else {
            toast.error('An error occurred', { position: 'bottom-right', icon: () => null });
        }
    }
    console.log('custom hook says data', data);
    console.log('custom hook says error', error);
    return { data, error, loading };
}