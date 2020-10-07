import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import PostListPage from './pages/post-list/post-list.page';
import PostDetailPage from './pages/post-detail/post-detail.page';
import PostEditPage from './pages/post-edit/post-edit.page';
import authService from './services/auth.service';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userData : null
    }
  }

  componentDidMount(){
    this.loadUserData()
  }
  
  loadUserData(){
    let userData = authService.getLoggedUser()
    if(userData){
      this.setState({ userData : userData })
    }
  }

  logout(){
    authService.clearLoggedUser();
    window.location.reload();
  }

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
            {(this.state.userData) ? (
                <div className="nav-user">
                  <div className="nav-user__info">
                    <h4>{this.state.userData.name}</h4>
                    <p>{this.state.userData.email}</p>
                  </div>
                  <button className="btn btn-outline-dark" onClick={e => this.logout()}>Sair</button>
                </div>
              ) : null}
          </div>
        </nav>
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/login" component={props => <LoginPage {...props} onLogin={() => this.loadUserData()}/>}/>
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
