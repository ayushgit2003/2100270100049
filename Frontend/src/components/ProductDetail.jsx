// src/components/ProductDetail.js
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Container } from '@mui/material';

const ProductDetail = () => {
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(category, id).then((response) => {
      setProduct(response.data);
    });
  }, [category, id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="140"
        />
        <CardContent>
          <Typography variant="h5">{product.productName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {product.company} - {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {product.rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discount: {product.discount}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Availability: {product.availability ? 'In stock' : 'Out of stock'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
