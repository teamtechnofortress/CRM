import React, { useEffect,useState } from 'react'
import axios from 'axios';
import ToastComponent from '@/components/toastcomponent'
import { toast } from "react-toastify";

const addrole = () => {
    const [permissions, setPermissions] = useState([]);
    const [role, setRole] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const fetchallpermissions = async () => {
       try {
         const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/permission/getallpermission`);
        //  console.log(response.data);

         if(response.data.status === "success"){
             setPermissions(response.data.data);
         }else{
             console.log(response.data.message);
         }

       } catch (error) {
         console.error('Error fetching data:', error);
       }
     };
     // Use useEffect to call the function
     useEffect(() => {
       fetchallpermissions();
     }, []);

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        if (type === 'checkbox') {
            // If the target is a checkbox, update the selectedPermissions array
            if (checked) {
                setSelectedPermissions([...selectedPermissions, value]);
            } else {
                setSelectedPermissions(selectedPermissions.filter(id => id !== value));
            }
        } else if (type === 'text') {
            // If the target is the role input, update the role state
            setRole(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Create the payload to send to the API
        const data = {
            role,
            permission: selectedPermissions
        };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/userrole/addrole`, data);
            if (response.data.status === "success") {
                // Handle successful response (e.g., show a message or reset the form)
                toast.success("Role Added successfully!");
                setSelectedPermissions([]);
                setRole('');

                // console.log('Role added successfully', response.data);
            } else {
                console.log('Error:', response.data.message);
                toast.error("Role Not Added!");
                
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error("An error occurred while adding the role.");
            
        }
    };

  return (
    <div className='container'>
        <ToastComponent />
        <form onSubmit={handleSubmit}>
            <div className='' style={{ maxWidth: "300px" }}>
                <label for="exampleInputEmail1" className="form-label">Enter Role Name</label>
                <input  
                    className='form-control'
                    type="text" 
                    placeholder="Role" 
                    name="role"
                    value={role}
                    onChange={handleChange} 
                    required
                />
            </div>
            {permissions.map((permission, index) => (
                <div key={index}>
                    <input 
                        class="form-check-input"
                        type="checkbox" 
                        id={permission._id} 
                        name={permission.permission} 
                        value={permission._id} 
                        onChange={handleChange}
                        checked={selectedPermissions.includes(permission._id)}
                    />
                    <label htmlFor={permission._id}>{permission.permission}</label>
                </div>
            ))}
            <button class="btn btn-primary" type="submit">Add Role</button>
        </form>
    </div>
  )
}

export default addrole