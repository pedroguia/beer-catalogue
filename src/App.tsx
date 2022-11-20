import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./store/store";
import Router from "./router";
import Footer from "./components/footer";
import Header from "./components/header";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <Router />
      </div>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </Provider>
  );
};

export default App;
