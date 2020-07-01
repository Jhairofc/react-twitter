import Home from '../components/views/Home';
import Error from '../components/views/Error';
import Profile from "../components/views/Profile";
import Users from "../components/views/Users/Users";
export default [
    {
        path: "/users", 
        exact: true,
        page: Users
    },
    {
        path: "/:id", 
        exact: true,
        page: Profile
    },
    {
        path: "/", 
        exact: true,
        page: Home
    },
    {
        path: "*",
        page: Error
    }
];