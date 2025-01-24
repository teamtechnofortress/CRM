import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router';

const login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
          email: '',
          password: '',
      });
      
  const auth = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`,formData);
      // console.log('API Response:', response);

      const data = response.data;
      if (data.status === 'Success') {

        if (data.token) {
          // Redirect to homepage or dashboard
          router.push(`${process.env.NEXT_PUBLIC_HOST}/`);

        }

        // localStorage.setItem('authToken', data.token);

        // Make the API call with Axios
        // const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/users/adduser`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`, // Add the token in the header
        //   },
        // });

      } else {
        console.error(data.error);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } 
    finally {
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
  };

  return (
    <div className='container'>
      <form onSubmit={auth} method='POST'>
        <div className="mb-3 mt-3">
          <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" id="exampleInputEmail" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" id="exampleInputPassword" />
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div> */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
        
    </div>

  )

}

export default login