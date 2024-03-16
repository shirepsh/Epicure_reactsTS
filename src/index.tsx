import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrderProvider } from "./contexts/OrderContext";
import HomePage from "./components/HomePage/HomePageFull/HomePage";
import Restaurants from "./components/AllRestaurants/Restaurants";
import SideMenu from "./components/SideMenuWindow/SideMenu";
import data from "./data/data.json";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import RestaurantPage from "./components/SingleRestaurantPage/RestaurantPage";
import Chefs from "./components/Chefs/Chefs";
import DishPage from "./components/SingleDishPage/DishPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <OrderProvider> 
        <Navbar />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage restaurantsData={data}  />} />
          </Route>
          {/* <Route path="/" element={<App />}>
            <Route index element={<HomePage restaurantsData={{ restaurants: data.restaurants, dishes: data.dishes, chefs: data.chefs }}  />} />
          </Route> */}
          <Route path="/home" element={<HomePage restaurantsData={data}  />} />
          <Route
            path="/side-menu"
            element={<SideMenu handleClose={() => {}} isOpen={false} />}
          />
          <Route
            path="/our-restaurants"
            element={<Restaurants restaurantsData={data} />}
          />
          <Route
            path="/restaurant/:id"
            element={<RestaurantPage restaurantsData={data} />}
          />

          {/* <Route
            path="/restaurant/:restaurantId/dish/:mealType/:dishId"
            element={<DishPage restaurantsData={data} />}
          /> */}
        


          <Route path="/our-chefs" element={<Chefs chefsData={data} />} />
          {/* <Route path="/my-order" element={<MyOrder />} /> */}
      
        </Routes>
        <Footer />
      </OrderProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


