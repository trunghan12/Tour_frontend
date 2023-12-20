import React from "react";
import "./App.css";
import "./index.css";
// import Layout from './components/Layout/Layout'
import Routers from "./router/Routers";
import { RecoilRoot } from 'recoil';



function App() {
  // return <Layout />;
  // <Routers></Routers>
  // <h1>Hello ca nha yeu cua kem</h1>
  
  return (
    <RecoilRoot>
      <Routers></Routers>
    </RecoilRoot>
  );
}

export default App;
