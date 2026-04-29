import { Routes, Route, Link } from "react-router";
import "./App.css";
import MainPage from "./MainPage";
import MovieDetail from "./MovieDetail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
};
export default App;
