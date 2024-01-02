import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeDirectory from './EmployeeDirectory.jsx';
import NavHeader from './navigation.jsx';
import Home from './Home.jsx';
import { HashRouter as Router } from 'react-router-dom';

const element=<Router> <Home /> </Router>

ReactDOM.render(element, document.getElementById('contents'));
  