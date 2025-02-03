import React, { useEffect } from 'react';
import axios from 'axios';  // Ensure axios is imported
import { useRouter } from 'next/router';

const EditRole = () => {
    const router = useRouter();
    const { id } = router.query;

    const fetchRole = async (rid) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/userrole/getsingelrole`, {
                params: { id: rid } 
            });
            console.log("API response:", response.data);
        } catch (error) {
            console.error("Error fetching role:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchRole(id);  
        }
    }, [id]); 

    return (
        <div>
            <h1>Edit Role</h1>
        </div>
    );
};

export default EditRole;
