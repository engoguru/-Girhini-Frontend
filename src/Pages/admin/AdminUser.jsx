import React, { useEffect, useState } from 'react'
import Header from '../../component/admin/Common/Header'
import Sidebar from '../../component/admin/Common/Sidebar'
import baseUrl from '../../utils/baseurl'
import axios from 'axios'

function AdminUser() {

    const [collapsed, setCollapsed] = useState(false);
    const [users, setUsers] = useState([]);

    const toggleSidebar = () => setCollapsed(!collapsed);

    useEffect(() => {
        handleUser();
    }, []);

    const handleUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/auth/getAll`, {
                withCredentials: true
            });

            // console.log(response.data, "Fetched Users");

            // store users in state
            setUsers(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-black text-white min-vh-100">
            <Header onToggleSidebar={toggleSidebar} />

            <div className="d-flex">
                <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

                {/* MAIN CONTENT - full width */}
                <div className="flex-grow-1 p-4">

                    <h2 className="text-2xl mb-4">All Users</h2>

                    <table className="table-auto w-100 text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-2 border text-lg">Name</th>
                                <th className="p-2 border text-lg">Contact</th>
                                <th className="p-2 border text-lg">Email</th>
                                <th className="p-2 border text-lg">Role</th>
                                <th className="p-2 border text-lg">Register</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users?.length > 0 ? (
                                users.map((user, idx) => (
                                    <tr key={idx}>
                                        <td className="p-2 border text-sm">{user.name}</td>
                                        <td className="p-2 border text-sm">{user.phone}</td>
                                        <td className="p-2 border text-sm">{user.email}</td>
                                        <td className="p-2 border text-sm">{user.role}</td>
                                        <td className="p-2 border text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-4">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default AdminUser
