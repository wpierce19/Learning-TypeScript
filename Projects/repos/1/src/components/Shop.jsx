import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../shop.css";

export default function Shop() {
  const { cart, setCart } = useOutletContext();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  const addToCart = (item, quantity) => {
    const foundItem = cart.find((element) => element.id === item.id);
    if (foundItem) {
      const newQuant = parseInt(foundItem.quantity) + parseInt(quantity);
      quantity = newQuant;
      const removed = cart.filter((element) => element.id !== item.id);
      setCart([...removed, { ...item, quantity }]);
      return;
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const handleQuantityChange = (itemId, number) => {
    setQuantities({
      ...quantities,
      [itemId]: number || 0,
    });
  };

  useEffect(() => {
    async function getItems() {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        const products = data.map((entry, index) => ({
          id: index,
          name: entry.title,
          image: entry.image,
          price: entry.price,
          desc: entry.description,
        }));

        setItems(products);
      } catch (error) {
        console.error(`Failed to fetch products: ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
    getItems();
  }, []);

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );

  const productList = items.map((item) => {
    return (
      <div className="product-card" key={item.id}>
        <div className="image-container">
          <img src={item.image} alt={item.name} className="product-image" />
        </div>
        <div className="product-info">
          <h2 className="product-name">{item.name}</h2>
          <p className="product-price">${item.price.toFixed(2)}</p>
        </div>
        <div className="product-actions">
          <input
            type="number"
            min={1}
            value={quantities[item.id] || ""}
            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            className="quantity-input"
          />
          <button
            onClick={() => addToCart(item, quantities[item.id] || 1)}
            disabled={!quantities[item.id]}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="shop-container">
      <h1 className="shop-title">Shop</h1>
      <div className="product-grid">{productList}</div>
    </div>
  );
}