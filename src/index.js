import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Submit from './Submit'
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

ReactDOM.render(
	<Router>
     <div className="container">
      <nav className="navbar navbar-inverse bg-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Recipie World!</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><NavLink exact activeClassName="activeNav" to="/">Home</NavLink></li>
              <li><NavLink activeClassName="activeNav" to="/submit">Submit a Recipie</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
      <Route exact path="/" component={Home} />
      <Route path="/submit" component={Submit} history={history} />
    </div>
    </Router>,
document.getElementById('root'));
