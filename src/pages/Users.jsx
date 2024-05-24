
import { useEffect } from 'react';
import UserTable from '../components/UserTable'
import { useUserContext } from '../contexts/userContext';

const Users = () => {
    const { fetchUsers } = useUserContext();

    useEffect(()=> {
        fetchUsers("getAllUsers")
    }, [])

    return (
        <section className="container-fluid">
            <UserTable />
        </section>
    )
}

export default Users
