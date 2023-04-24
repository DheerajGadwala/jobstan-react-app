import './App.css';
import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import Jobstan from "./jobstan";
import RegisterComponent from "./jobstan/register"
import LoginComponent from "./jobstan/login"
import CurrentUser from './jobstan/current-user';
import usersReducer from './jobstan/services/users-reducer';
import postsReducer from './jobstan/services/posts-reducer';
import bookmarksReducer from './jobstan/services/bookmarks-reducer';
import SearchPageComponent from './jobstan/search';

const store = configureStore({
  reducer: {
      posts: postsReducer,
      users: usersReducer,
      bookmarks: bookmarksReducer
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
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route path="/register" element={<RegisterComponent/>}/>
                    </Routes>
                </div>
            </CurrentUser>
        </BrowserRouter>
    </Provider>
</div>
  );
}

export default App;
