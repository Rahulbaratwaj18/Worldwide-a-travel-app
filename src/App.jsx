import React, { Suspense, lazy } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFulPage from "./components/SpinnerFullPage";


// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./components/AppLayout";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"))
const AppLayout = lazy(() => import("./pages/AppLayout"));

export default function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
          <Suspense fallback={<SpinnerFulPage />}>
            <Routes>
              <Route index element={<Homepage />}></Route>
              <Route path="pricing" element={<Pricing />}></Route>
              <Route path="products" element={<Product />}></Route>

              <Route path="login" element={<Login />}></Route>
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}
