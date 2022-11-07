import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
      {shipping ? (
        <Link to="/shipping" className="float-right">
          <div className="step active-step">Shipping</div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="step incomplete">Shipping</div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to="/confirm" className="float-right">
          <div className="step active-step">Confirm Order</div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="step incomplete">Confirm Order</div>
        </Link>
      )}

      {payment ? (
        <Link to="/payment" className="float-right">
          <div className="step active-step">Payment</div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Payment</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;
