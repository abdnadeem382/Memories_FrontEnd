import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import {useSelector} from 'react-redux';
import Post from './Post/Post.js'
import useStyles from './styles.js'
     
function Posts({ setCurrentId  }) {
    const classes = useStyles();
    const posts = useSelector((state)=>{
        return state.posts; 
    })

    const showPosts = (posts)=>{
        return posts.map((post)=>(
            <Grid item key={post._id} xs={12} sm={6}>
                <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
        ))
    }

    console.log(posts);
    return (
        !posts.length ? <CircularProgress/> :
        <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
            {showPosts(posts)}
        </Grid>
    )
}

export default Posts
