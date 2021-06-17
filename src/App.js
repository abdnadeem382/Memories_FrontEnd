import React from 'react'
import {Container} from '@material-ui/core'; 
import Navbar from './components/NavBar/Navbar.js';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home.js'
import Auth from './components/Auth/Auth.js';

function App() {
    
    return (
        <BrowserRouter>
            <Container maxwidth ='lg' >
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/auth' exact component={Auth}/>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App
