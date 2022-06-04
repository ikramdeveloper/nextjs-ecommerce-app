import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toast } from "react-hot-toast";

const AppContext = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);

  let foundProduct;
  let index;

  const onAddToCart = (product, quantity) => {
    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + quantity);

    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id)
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        return item;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    setQuantity(1);
    toast.success(`${quantity} ${product.name} added to the cart`);
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);
    const filteredCartItems = cartItems.filter((item) => item._id !== id);

    setCartItems([...filteredCartItems]);
    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prev) => prev - foundProduct.quantity);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);

    if (value === "inc") {
      let newCartItems = cartItems.map((item) => {
        if (item._id === id) {
          item.quantity++;
          return item;
        }
        return item;
      });

      setCartItems([...newCartItems]);
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQuantities((prev) => prev + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity < 2) return;

      let newCartItems = cartItems.map((item) => {
        if (item._id === id) {
          item.quantity--;
          return item;
        }
        return item;
      });

      setCartItems([...newCartItems]);
      setTotalPrice((prev) => prev - foundProduct.price);
      setTotalQuantities((prev) => prev - 1);
    }
  };

  const incQuantity = () => setQuantity((prev) => prev + 1);

  const decQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <AppContext.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        quantity,
        incQuantity,
        decQuantity,
        onAddToCart,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalQuantities,
        setTotalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useStateContext = () => useContext(AppContext);
