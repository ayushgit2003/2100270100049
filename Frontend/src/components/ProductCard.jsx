import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/products/${product.category}/${product.id}`}>
        <CardMedia
          component="img"
          height="140"
          image={product.imageUrl} // Assuming you have an imageUrl property in your product data
          alt={product.productName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {product.rating}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
