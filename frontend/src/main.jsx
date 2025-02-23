import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import Layout from "./components/layout/layout.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
)
