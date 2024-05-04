import { gql, useQuery } from '@apollo/client';

// const GET_USERS = gql`
//   query GetUsers {
//     users {
//       id
//       name
//       workspaces {
//         workspace {
//           name
//         }
//       }
//     }
//   }
// `;
// export const Test = () => {
//   const { loading, data } = useQuery(GET_USERS);
//   console.log(data);
//   console.log(loading);

//   return <div>test</div>;
// };
