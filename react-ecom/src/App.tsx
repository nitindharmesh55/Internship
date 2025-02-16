import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSeller from "./components/TopSeller";
import PopularBlog from "./components/PopularBlog";


export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent/>}/>
            <Route path="/product/:id" element={<ProductPage />} />

          </Routes>
          <div>
          <TopSeller />
          <PopularBlog />
          </div>
        </div>
      </div>
    </Router>
  );
}
