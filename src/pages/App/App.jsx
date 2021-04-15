import React, { Component } from "react";
import { Route, Redirect} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import Users from "../Users/Users"
import authService from "../../services/authService"
import "./App.css";
import * as snippetAPI from '../../services/snippets-api'
import CreateSnippetPage from "../CreateSnippetPage/CreateSnippetPage";
// import PageHeader from '../../components/PageHeader/PageHeader';
// import PageFooter from '../../components/PageFooter/PageFooter';
// import SideNav from '../../components/SideNav/SideNav';

class App extends Component {
  state = {
    snippets: [],
    user: authService.getUser(),
  };

  handleLogout = () => {
    authService.logout();
    this.setState({ user: null });
    this.props.history.push("/");
  };

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() })
  }

  handleAddSnippet = async newSnippetData => {
    const newSnippet = await snippetAPI.create(newSnippetData);
    newSnippet.addedBy = { name: this.state.user.name, _id: this.state.user._id }
    this.setState(state => ({
      snippets: [...state.snippets, newSnippet]
    }), () => this.props.history.push('/snippets'));
  }

  render() {
    const {user} = this.state
    return (
      <>
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        <Route
          exact
          path="/"
          render={() => (
            <main>
              <h1>Welcome. This is an authorization template for Script Stud.io</h1>
            </main>
          )}
        />
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route 
          exact
          path="/users"
          render={({ history}) =>
            user ? <Users /> : <Redirect to="/login" />
          }
        />
        {/* <Route exact path='/snippets/create' render={() =>
          authService.getUser() ?
            <CreateSnippetPage
              handleAddSnippet={this.handleAddSnippet}
              user={this.state.user}
            />
            :
            <Redirect to='/login' />
        } /> */}
      </>
    );
  }
}

export default App;
