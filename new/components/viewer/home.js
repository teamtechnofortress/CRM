import React, { useEffect,useState } from 'react';
import axios from 'axios';

const home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchallproducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/woocommerce/getallproduct`);

      if (response.data && response.data.message) {
        // console.log('API Response:', response.data.data);
        setProducts(response.data.data);
      } else {
        console.error('Unexpected API Response:', response.data);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchallproducts();  

  }, []);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Product List</h1>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock_status || "Out of stock"}</td>
              <td>
                  {product.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.src }
                      alt={image.alt || "Product Image"}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default home;
