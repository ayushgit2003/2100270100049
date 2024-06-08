import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList category="electronics" />} />
        <Route path="/products/:category/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
