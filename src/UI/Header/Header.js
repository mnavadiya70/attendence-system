import React, { Component } from "react";
import AuthContext from "../../contexts/AuthContext";
import {
    Button,
} from "@material-ui/core";
import { withRouter } from 'react-router';

class Header extends Component {
    static contextType = AuthContext;

    logout = () => {
        localStorage.clear();
        this.context.updateUser({ user: {} });
        this.props.history.push('/');
    };

    render() {
        return (
            <header>
                <h3 style={{float: "left"}}>Admin</h3>
                <div style={{float: "right"}}>
                    <Button color="primary" onClick={this.logout}>Logout</Button>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
