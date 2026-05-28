import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import './AdminDashboard.css'
import DashboardBoxSlider from "../../Components/DashboardBoxSlider/DashboardBoxSlider";

const AdminDashboard = () => {
  return (
    <div className="admin-dash">
      <DashboardBoxSlider/>
      <DashboardBoxSlider/>
      <DashboardBoxSlider/>
      <DashboardBoxSlider/>
    </div>
  );
};

export default AdminDashboard;