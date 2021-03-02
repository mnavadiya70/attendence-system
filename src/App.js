import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Login from './components/Auth/Login/Login';
import AuthContext from './contexts/AuthContext';
import Utils from './helper/Utils';
import AuthService from './services/AuthService';
import AuthRoutes from './routes/AuthRoutes';
import Routes from './routes/Routes';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      updateUser: this.updateUserContext,
    };
  }

  componentDidMount() {
    console.log(AuthService.getCurrentUser(), "- AuthService.getCurrentUser()");
    this.setState({ user: AuthService.getCurrentUser() });
  }

  updateUserContext = (values) => {
    this.setState(values);
  };

  render() {
    let app = null;
    if (Utils.getDataFromStorage('user')) {
      app = <Routes />;
    }
    else {
      app = <AuthRoutes />;
    }
    return (
      <AuthContext.Provider value={this.state}>
        <BrowserRouter>
          <Suspense fallback={<LinearProgress />}>
            {app}
            {/* <ToastContainer /> */}
          </Suspense>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
