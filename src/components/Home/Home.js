import React, {useState, useEffect} from 'react'
import {Container, Grow, Grid} from '@material-ui/core'; 
import Form from '../Form/Form.js';
import Posts from '../Posts/posts.js';
import { useDispatch } from 'react-redux';
import {getPosts} from '../../actions/posts.js'
import useStyles from './styles.js'

function Home() {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch])

    return (
        <Grow in>
            <Container>
                <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId= {currentId} setCurrentId={setCurrentId}/>
                    </Grid>

                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
