import routers from "./routers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux-setup/store";
import { persistor } from "./redux-setup/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import Banner from "./shared/components/Layout/Banner";
import Footer from "./shared/components/Layout/Footer";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <div>
            <Header />
            {/*	Body	*/}
            <div id="body">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <Menu />
                  </div>
                </div>
                <div className="row">
                  <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                    <Slider />
                    <Routes>
                      {routers.map((router, index) => (
                        <Route
                          key={index}
                          path={router.path}
                          element={<router.element />}
                        />
                      ))}
                    </Routes>
                  </div>
                  <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
                    <Banner />
                  </div>
                </div>
              </div>
            </div>
            {/*	End Body	*/}
            <Footer />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
