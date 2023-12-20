import React from "react";

import Header from "./../Header/Header";
// import Routers from '../../router/Routers'
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import ChatBot from "./../chatBot/ChatBot";

const Layout = () => {
  return (
    <>
      <Header />
      {/* <Routers /> */}
      <Outlet></Outlet>
      <div
        id="rasa-chat-widget"
        data-websocket-url="http://localhost:5005"
      ></div>
      <script
        src="https://unpkg.com/@rasahq/rasa-chat"
        type="application/javascript"
      ></script>
      <ChatBot />
      <Footer />
    </>
  );
  // return (
  //     <h1>Hello ca nha yeu</h1>
  // )
};

export default Layout;
