import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import Home from "./routes/router";

const rootDiv = document.getElementById("root");
const root = ReactDOM.createRoot(rootDiv);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Home />
    </PersistGate>
  </Provider>
);
