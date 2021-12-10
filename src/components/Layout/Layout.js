import classes from './Layout.module.css';
import { Fragment } from 'react';
import Navigation from './Navigation';

const Layout = (props) => {
    return (
        <Fragment>
            <Navigation />
            <main className={classes.main}>{props.children}</main>
        </Fragment>
    )
}

export default Layout;