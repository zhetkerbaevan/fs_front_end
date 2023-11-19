import React, {useCallback, useState, useEffect} from 'react';
import Service from '../../services/Service';

const ListUsers = () => {
    const [users, setUsers] = useState([]);

    const getUsers = useCallback(async () => {
        try {
            const res = await Service.getUsers();
            setUsers(res.data);
        } catch (error) {
            console.log('Failed to fetch users:', error.message);
        }
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div>
            <h2 className="text-center">Users</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>About me</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>{user.about_me}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListUsers;
