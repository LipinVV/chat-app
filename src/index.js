import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://fakeql.com/graphql/24c664e4386cfec4a31e61a0c0d457e2',
    cache: new InMemoryCache()
});


ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

console.log(client)