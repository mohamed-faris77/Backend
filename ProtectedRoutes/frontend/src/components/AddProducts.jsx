
import axios from "axios"
import { useState } from "react";


const AddProducts = () => {

  const [productForm, setProductForm] = useState({ productname: '', description: '', price: '' });

  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/addproducts", productForm);
      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
      setProductForm({ productname: '', description: '', price: '' });

    } catch (error) {
      console.error("Error adding product:", error);
      alert(" Failed to add product. Please try again.");
    }
  };

  return (
    <div>
        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ color: '#333' }}>Add Product</h3>
          <input
            type="text"
            placeholder="Product Name"
            value={productForm.productname}
            onChange={(e) => setProductForm({ ...productForm, productname: e.target.value })}
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <textarea
            placeholder="Description"
            value={productForm.description}
            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%', height: '60px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="number"
            placeholder="Price"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button onClick={handleAddProduct} style={{ padding: '10px 20px', backgroundColor: '#ddd', color: '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
            Add Product
          </button>
        </div>

    </div>
  )
}

export default AddProducts
