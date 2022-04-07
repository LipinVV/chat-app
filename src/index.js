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
    uri: 'https://fakeql.com/graphql/9e22fbefd2fbb3410cefb41b253c19e1',
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
