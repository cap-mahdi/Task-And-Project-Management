import { useMutation, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect } from "react";
import { toast } from "react-toastify";



export const useCustomMutation = (request: DocumentNode) => {
    const [mutate, { data, error, loading }] = useMutation(request);

    


    // if (!loading) {
    //     if (!error) {
    //         toast.success('Mutation successful', { position: 'bottom-right', icon: () => null });
    //     }
    //     else {
    //         toast.error('An error occurred in mutation', { position: 'bottom-right', icon: () => null });
    //     }
    // }
    
    console.log('custom mutation hook says data', data);
    console.log('custom mutation hook says error', error);
    return [mutate, { data, error, loading }];
}