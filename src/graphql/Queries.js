import {gql} from '@apollo/client';

export const GET_USERS_QUERY = gql`
          query getUsers {
            users {
            id
            username
            email
            }
          }`;
