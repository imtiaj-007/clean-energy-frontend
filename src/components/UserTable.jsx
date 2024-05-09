/* eslint-disable react/prop-types */

import { useUserContext } from "../contexts/userContext";

const UserTable = () => {
    const { users } = useUserContext();

    return (
        <section className="user-container container">
            <h2 className='text-center mb-4'>Users Table</h2>
            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Connec. Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map((user) => {
                                let address = "";
                                for(let [key, value] of Object.entries(user.address)) {
                                    if(key) address += value + ", ";
                                }
                                return (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.customerName}</td>
                                        <td>{user.email}</td>
                                        <td>{address.slice(0, -2)}</td>
                                        <td>{user.connectionType}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default UserTable
