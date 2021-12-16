import {gql} from '@apollo/client';


export const ADD_USER_MUTATION = gql`
        mutation createUser($username: String! $email: String!) {
           createUser(input: {username: $username email: $email}) {
               username
               email
           }
        }
    `;

export const UPDATE_USERNAME_MUTATION = gql`
        mutation updateUser($username: String! $email: String! $id: ID!) {
           updateUser(id: $id, input: {username: $username email: $email}) {
               username
               email
           }
        }
    `;