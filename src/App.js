import React from 'react'
import {Container} from '@material-ui/core'; 
import Navbar from './components/NavBar/Navbar.js';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './components/Home/Home.js'
import Auth from './components/Auth/Auth.js';
import PostDetails from './components/PostDetails/PostDetails'

function App() {
    const user  = JSON.parse(localStorage.getItem('profile'));
    
    return (
        <BrowserRouter>
            <Container maxwidth ='xl' >
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={()=><Redirect to='/posts'/>}/>
                    <Route path='/posts' exact component={Home}/>
                    <Route path='/posts/search' exact component={Home}/>
                    <Route path='/posts/:id' exact component={PostDetails}/>
                    <Route path='/auth' exact component={()=>(!user ? <Auth/> : <Redirect to='/posts'/>)}/>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App
