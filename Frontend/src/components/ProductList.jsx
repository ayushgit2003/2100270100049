// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api';
import ProductCard from './ProductCard';
import { Grid, Container } from '@mui/material';

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('price');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllProducts(category, filters, sort, page).then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, [category, filters, sort, page]);

  return (
    <Container>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
