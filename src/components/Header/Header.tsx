import React from 'react';
import {NavLink} from "react-router-dom";

import styles from './Header.module.scss';

import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getLogin} from '../../redux/selectors/headerSelectors';
import {logout} from '../../redux/authReducer';
import {AppBar, Avatar, Container} from '@material-ui/core';
import {Toolbar} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';
import {Grid} from '@material-ui/core';

const Header: React.FC = () => {
    const isAuth = useSelector(getIsAuth);
    const login = useSelector(getLogin);
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <AppBar position="static">
            <Container>
                <Grid container justify="space-between">
                    <Grid className={styles.navigation}>
                        <Button><NavLink to='/profile'>Profile</NavLink></Button>
                        <Button><NavLink to='/dialogs'>Dialogs</NavLink></Button>
                        <Button><NavLink to='/news'>News</NavLink></Button>
                        <Button><NavLink to='/music'>Music</NavLink></Button>
                        <Button><NavLink to='/settings'>Settings</NavLink></Button>
                        <Button><NavLink to='/users'>Users</NavLink></Button>
                        <Button><NavLink to='/chat'>Chat</NavLink></Button>
                    </Grid>
                    <Toolbar>
                        <Grid container alignItems='center'>
                            {isAuth
                                ? <>
                                    <Avatar>{login?.substring(0, 1)}</Avatar>
                                    <Typography className={styles.login}>{login}</Typography>
                                    <Button color="secondary" onClick={onLogout}>
                                        <Typography style={{color: '#ff0000'}}>
                                            Logout
                                        </Typography>
                                    </Button>
                                </>
                                : <Button>
                                    <NavLink to='/login'>
                                        <Typography style={{color: '#ffffff'}}>
                                            <NavLink style={{color: 'inherit'}} to="/login">Login</NavLink>
                                        </Typography>
                                    </NavLink>
                                </Button>
                            }
                        </Grid>
                    </Toolbar>
                </Grid>
            </Container>
        </AppBar>
    )
};
export default Header;
