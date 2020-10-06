import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import PostListPage from './pages/post-list/post-list.page';
import PostDetailPage from './pages/post-detail/post-detail.page';
import PostEditPage from './pages/post-edit/post-edit.page';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Post App</Link>
          <button className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMenu"
            aria-controls="navbarMenu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMenu">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">Home</Link>
              <Link to="/post-list" className="nav-item nav-link">Posts</Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/post-list" component={PostListPage} />
          <Route path="/post-detail/:id" component={PostDetailPage} />
          <Route path="/post-add" component={PostEditPage} />
          <Route path="/post-edit/:id" component={PostEditPage} />
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
