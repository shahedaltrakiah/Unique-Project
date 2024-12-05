import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/API';

const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getAllProducts()
                // console.log(fetchedProducts.data);
                setProducts(fetchedProducts.data)
                setError(null)
            } catch (error) {
                console.error('error fetching products', error)
                setError('Failed to fetch products ')
            }

        }

        fetchProducts()

    }, []);
    return (
        <div>
            <h1>products</h1>
            {
                products.length > 0 && (
                    <ul >
                        {console.log(products[0].name)}
                        {products.map((product) => (
                            <li key={product.id}
                            >
                                {product.name}
                            </li>
                        )
                        )}
                    </ul>
                )
            }
        </div>
    );
}
export default ProductsList;
