import 'react-toastify/dist/ReactToastify.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import stores from './stores'
import {Provider} from 'mobx-react'
import MoviePage from './components/movie' 

ReactDOM.render(
  <Provider stores={stores}>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MoviePage}/>
      <Route path="/movie" component={MoviePage}/>
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
