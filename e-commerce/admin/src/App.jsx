import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import ManageProducts from "./Pages/ManageProducts/ManageProducts";
import AddProduct from "./Pages/AddProduct/AddProduct";
import ManageOrders from "./Pages/ManageOrders/ManageOrders";
import ManageUsers from "./Pages/ManageUsers/ManageUsers";

function App() {
  return (
    <>
      <div className="admindashboard-container">
        <div className="admindashboard-sidebar">
          <Sidebar />
        </div>
        
        <div className="admindashboard-content">
          <div className="admindashboard-header">
            <Header />
          </div>
          
          <div className="admindashboard-main">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/products" element={<ManageProducts />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/edit/:id" element={<AddProduct />} />
              <Route path="/orders" element={<ManageOrders />} />
              <Route path="/users" element={<ManageUsers />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
