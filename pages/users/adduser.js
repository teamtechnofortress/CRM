import React, { useEffect,useState } from 'react'
import axios from 'axios';

const adduser = () => {
    const [userRole, setUserRole] = useState([]);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        role: ''
    });
    

    const fetchallrole = async () =>{
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/userrole/getallrole`);
            // console.log(response.data);
            setUserRole(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchallrole();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = async (event) => {  

        event.preventDefault();
        
        // console.log(formData);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/users/adduser`, formData);
            if (response.data.status === "success") {
                alert("User added successfully");
            } else {
                alert("User not added");
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }

  return (
    <div className='container'>
        <form method="POST" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="exampleInputFirstName" className="form-label">First Name</label>
          <input type="text" value={formData.firstname} onChange={handleChange} className="form-control" id="exampleInputFirstName"  name="firstname" placeholder="First Name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputLastName" className="form-label">Last Name</label>
          <input type="text" value={formData.lastname} onChange={handleChange} className="form-control" id="exampleInputLastName"  name="lastname" placeholder="Last Name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
          <input type="email" value={formData.email} onChange={handleChange} className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" name="email" placeholder="Email" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">Password</label>
          <input type="password" value={formData.password} onChange={handleChange} className="form-control" id="exampleInputPassword"  name="password" placeholder="Password" required />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="exampleInputConfirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputConfirmPassword"  name="confirmpassword" placeholder="Confirm Password" required />
        </div> */}
        <div className="mb-3">
          <label htmlFor="exampleInputphone" className="form-label">Phone Number</label>
          <input type="text" value={formData.phone} onChange={handleChange} className="form-control" id="exampleInputphonenumber"  name="phone" placeholder="Phone Number" required />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputrole" className="form-label">Role</label>
            <select 
                className="form-select" 
                id="exampleInputrole" 
                name="role" 
                value={formData.role}
                onChange={handleChange}
                required 
            >
                <option value="" >Select Role</option> {/* Placeholder option */}
                {userRole.map((role) => (
                <option key={role._id} value={role._id}>{role.role}</option>
                ))}
            </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default adduser