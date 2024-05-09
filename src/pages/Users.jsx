
import { useEffect } from 'react';
import UserTable from '../components/UserTable'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

const Users = () => {
    const navigate = useNavigate();
    const { fetchUsers } = useUserContext();

    useEffect(()=> {
        if (!localStorage.getItem('authToken'))
            navigate('/login')
        fetchUsers("getAllUsers")
    }, [])

    return (
        <section className="container-fluid">
            <UserTable />
        </section>
    )
}

export default Users
