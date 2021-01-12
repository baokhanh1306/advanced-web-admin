import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Detail from './pages/Detail';
import Login from './pages/Login';
import history from './utils/history';

function App() {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path='/login' component={Login} />
				<PrivateRoute exact path='/dashboard' component={Dashboard} />
				<PrivateRoute exact path='/user/:id' component={Detail} />
				<Redirect from='/' to='/dashboard' exact />
			</Switch>
		</Router>
	)
}

export default App;
