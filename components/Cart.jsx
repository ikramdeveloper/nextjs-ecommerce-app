import { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const resp = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (resp.statusCode === 500) return;

    const data = await resp.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <section className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </section>
        )}

        <section className="product-container">
          {cartItems.length > 0 &&
            cartItems.map((item) => {
              if (!item._id) return;

              const { _id, name, image, price, quantity } = item;

              return (
                <article className="product" key={_id}>
                  <img
                    src={urlFor(image[0])}
                    alt={name}
                    className="cart-product-image"
                  />
                  <div className="item-desc">
                    <article className="flex top">
                      <h5>{name}</h5>
                      <h4>${price}</h4>
                    </article>

                    <article className="flex bottom">
                      <div>
                        <p className="quantity-desc noselect">
                          <span
                            className="minus"
                            onClick={() => toggleCartItemQuantity(_id, "dec")}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{quantity}</span>
                          <span
                            className="plus"
                            onClick={() => toggleCartItemQuantity(_id, "inc")}
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>

                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => onRemove(_id)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </article>
                  </div>
                </article>
              );
            })}
        </section>

        {cartItems.length > 0 && (
          <section className="cart-bottom">
            <article className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </article>

            <article className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </article>
          </section>
        )}
      </div>
    </div>
  );
};

export default Cart;
