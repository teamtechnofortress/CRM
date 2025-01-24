import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';

const viewallusers = () => {
    const router = useRouter();
    const [roles, setRole] = useState([]); 

    const fetchallusers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/userrole/getallrole`);

                console.log('API response:',response.data.data);

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
    };
    useEffect(() => {
        fetchallusers();  
    }, []);


  return (
    <div>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Role</th>
                <th scope="col">Permission</th>
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
                    </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
  )
}

export default viewallusers