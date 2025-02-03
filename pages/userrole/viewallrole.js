import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import Link from 'next/link';

const viewallusers = () => {
    const router = useRouter();
    const [roles, setRole] = useState([]); 
    const [loading, setLoading] = useState(true);

    const fetchallusers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/userrole/getallrole`);

            // console.log('API response:',response.data.data);

            if (response.data.status === "success") {
                setRole(response.data.data); 
              } else if (response.data.status === "tokenerror") { 
                router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
              } else {
                console.log(response.data.message); 
              }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchallusers();  
    }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Role</th>
                <th scope="col">Permission</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {roles.length > 0 && (
                    roles.map((role, index) => (
                    <tr key={role._id}>
                        <td>{index + 1}</td>
                        <td>{role.role}</td>
                        <td>
                            {role.permissions.map((permission) => (
                                <span 
                                key={permission._id} 
                                style={{
                                    display: "inline-block",
                                    margin: "0 5px 5px 0",
                                    padding: "5px 10px",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    borderRadius: "5px",
                                    fontSize: "12px",
                                }}
                                >
                                {permission.permission}
                                </span>
                            ))}
                        </td>
                        <td>
                          <Link href={`${process.env.NEXT_PUBLIC_HOST}/userrole/editrole?id=${role._id}`}>Edit</Link>
                        </td>
                    </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
  )
}

export default viewallusers