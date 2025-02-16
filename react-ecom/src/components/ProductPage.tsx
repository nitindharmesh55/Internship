import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // ✅ Import axios

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    images: string[];
}

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);


    useEffect(() => {
        setProduct(null); // ✅ This ensures "Loading..." is displayed
    
        if (id) {
            axios.get<Product>(`https://dummyjson.com/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => {
                    console.error(`Error Fetching Product Data: ${error}`);
                });
                
        }
    }, [id]);
    

    if (!product) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="p-5 w-[60%]">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-5 px-4 py-2 bg-black text-white rounded"
            >
                Go Back {/* ✅ Added button text */}
            </button>
            <section>
           <img src={product.images[0]} alt={product.title} 
           className="w-[50%] h-auto mb-5"
           />
           <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
           <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
           <div className="flex">
            <p>Price:${product.price}</p>
            <p className="ml-10">Rating: {product.rating}</p>
           </div>
           </section>
           <button className="px-4 py-2 mt-5 bg-black text-white rounded">Add To Cart</button>

           
            
        </div>
        
    );
};

export default ProductPage;
