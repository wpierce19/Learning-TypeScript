import { useOutletContext } from "react-router-dom";
import "../cart.css";

export default function Cart() {
  const { cart, setCart } = useOutletContext();

  const removeFromCart = (indexToRemove) => {
    const filtered = cart.filter((_, index) => indexToRemove !== index);
    setCart(filtered);
  };

  if (cart.length < 1)
    return (
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>
        <div className="empty-cart">No items in cart</div>
      </div>
    );

  let totalPrice = 0;
  const cartList = cart.map((entry, index) => {
    const sum = entry.price * entry.quantity;
    totalPrice += sum;

    return (
      <div className="cart-item" key={index}>
        <div className="item-name">{entry.name}</div>
        <div className="item-quantity">Quantity: {entry.quantity}</div>
        <button className="remove-button" onClick={() => removeFromCart(index)}>
          Remove
        </button>
      </div>
    );
  });

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-items">{cartList}</div>
      {totalPrice > 0 && (
        <div className="cart-total">
          <button className="checkout" onClick={() => {}}>
            Checkout
          </button>
          <div>
            Total: <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}