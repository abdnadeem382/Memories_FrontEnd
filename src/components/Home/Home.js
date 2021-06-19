import React, {useState, useEffect} from 'react'
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core'; 
import {useHistory, useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
import {getPosts, getPostsBySearch} from '../../actions/posts.js'
import useStyles from './styles.js'
import Pagination from '../Pagination';
import Form from '../Form/Form.js';
import Posts from '../Posts/posts.js';


function useQuery(){
    return new URLSearchParams(useLocation().search);
}


function Home() {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch])

    const handleKeyPress = (e)=>{
        if(e.keyCode === 13){ //13 is for Enter key
            searchPost();
        }
    }
    

    const handleAdd=(tag)=>{
        setTags([...tags,tag])
    }

    const handleDelete=(tagToDelete)=>{
        setTags(tags.filter((tag)=> tag !== tagToDelete))
    }

    const searchPost = ()=>{
        if(search.trim() || tags){
            dispatch(getPostsBySearch({search, tags: tags.join(',') }))
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }
        else{
            history.push('/')
        }
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container className={classes.gridContainer} justify='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField 
                                name='search' 
                                onKeyPress={handleKeyPress} 
                                variant='outlined' 
                                label="Search Memories" 
                                fullWidth 
                                value={search} 
                                onChange={(e)=>{setSearch(e.target.value)}}/>
                            <ChipInput
                                style={{margin: '10px 0px'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant='outlined'

                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId= {currentId} setCurrentId={setCurrentId}/>
                        <Paper elevation={6}>
                            <Pagination/>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
