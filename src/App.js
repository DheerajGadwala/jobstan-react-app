import './App.css';
import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import Jobstan from "./jobstan";
import CurrentUser from './jobstan/current-user';
import usersReducer from './jobstan/services/users-reducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
  }
})


function App() {
  return (
    <div className="container mt-4 mb-4">
    <Provider store={store}>
        <BrowserRouter>
            <CurrentUser>
                <div className="container">
                    <Routes>
                        <Route path="/*" element={<Jobstan/>}/>
                        <Route path="/home/*" element={<Jobstan/>}/>
                    </Routes>
                </div>
            </CurrentUser>
        </BrowserRouter>
    </Provider>
</div>
  );
}

export default App;
