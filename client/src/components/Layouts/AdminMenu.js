import React from 'react'
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
      <div className="text-center" style={{position:'fixed', minWidth:'300px'}}>
        <div className="list-group" style={{fontSize:"20px"}}>
          <h1>Admin Panel</h1>
          <br />
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action "
            
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default AdminMenu
