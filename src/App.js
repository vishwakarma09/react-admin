// in src/App.js
import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './posts'
import { UserList } from './UserList'
import Dashboard from './Dashboard'
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import authProvider from './authProvider';

// import dataProvider from './dataProvider';
import jsonServerProvider from 'ra-data-json-server';
import simpleRestProvider from 'ra-data-simple-rest';

const httpClient = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: 'SRTRDFVESGNJYTUKTYTHRG'
    }
    return fetchUtils.fetchJson(url, options);
}
// const dataProvider = simpleRestProvider('http://localhost:8081', httpClient);
const dataProvider = jsonServerProvider('http://localhost:8081');
// const dataProvider = simpleRestProvider('http://jsonplaceholder.typicode.com', httpClient);
// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');


const App = () => (
    <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon}/>
    </Admin>
);

export default App;