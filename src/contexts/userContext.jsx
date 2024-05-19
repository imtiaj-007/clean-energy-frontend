/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = (props)=>{
    const baseURL = import.meta.env.VITE_USER_BASE_URL;
    const [users, setUsers] = useState([]);

    const fetchUsers = async() => {
        const res = await axios.get(baseURL, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        console.log(res.data.users);
        setUsers(res.data.users);
    }

    const fetchUserByID = async(userID) => {
        const url = `${baseURL}/${userID}`;
        const res = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('authToken')
            }
        });
        return res;
    }

    useEffect(()=> {
        if(localStorage.getItem('authToken'))
            fetchUsers()
    }, [])


    return (
        <UserContext.Provider value={{ users, fetchUsers, fetchUserByID }}>
            {props.children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(UserContext);
}

export {UserProvider, useUserContext};