import { DocumentNode, useApolloClient } from "@apollo/client";
import { toast } from 'react-toastify';


type Request = {
    query: DocumentNode;
    variables?: Record<string, any>;
}

export const useCustomApolloClient = () => {
    const client = useApolloClient();

    const sendQuery = async (request: Request) => {

        try {
            const response = await client.query({
                query: request.query,
                variables: request.variables
            });

            if (response.networkStatus === 7) {
                toast.success('Request succeeded', { position: "top-right" });
            }

            if (response.networkStatus === 8) {
                const error = response.errors && response.errors[0];
                const statusCode = error && error.extensions && error.extensions.code;
                console.log('Request failed with status code: ', statusCode);
                toast.error('Request failed with status code: ', { position: "top-right" });
            }
        } catch (error) {
            console.log('Error sending request: ', error)
            toast.error('An error occured when sending the request', { position: "top-right" });
        }
    }

    const sendMutation = async (request: Request) => {
        try {
            const response = await client.mutate({
                mutation: request.query,
                variables: request.variables
            });

            if (!response.errors) {
                toast.success('Request succeeded', { position: "top-right" });
            }

            else {
                const error = response.errors[0];
                const statusCode = error.extensions && error.extensions.code;
                console.log('Request failed with status code: ', statusCode);
                toast.error('Request failed with status code: testtest', { position: "top-right" });
            }
        } catch (error) {
            console.log('Error sending request: ', error)
            toast.error('An error occured when sending the request', { position: "top-right" });
        }
    }

    return { sendQuery, sendMutation };
}