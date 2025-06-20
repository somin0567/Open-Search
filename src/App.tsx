import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Header from "./views/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <section className="main">
        <Router />
      </section>
    </BrowserRouter>
  );
};

export default App;
