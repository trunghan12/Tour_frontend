import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";

import "../style/tour.css";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import axios from "axios";
import payment from "../assets/images/img-payment/payment.svg";
import { PayPalButton } from "react-paypal-button-v2";
import "../style/paypal.css";

const PayPal = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const addPaypalScript = async () => {
    const data = await axios.get(`${BASE_URL}/payment/config`);
    // console.log(data);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
    // console.log("data", data);
  };

  const onSuccessPaypal = (details, data) => {};
  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
    addPaypalScript();
  }, []);
  return (
    <Container>
      <Row>
        <PayPalButton
          amount="0.09"
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={onSuccessPaypal}
          onError={() => {
            alert("error");
          }}
        />
      </Row>
    </Container>
  );
};

export default PayPal;
