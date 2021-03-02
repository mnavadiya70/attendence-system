import React, { Component } from "react";
import AuthContext from "../../../contexts/AuthContext";
import Utils from "../../../helper/Utils";
import { TextField, InputAdornment, IconButton, Button } from "@material-ui/core";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import Alert from "@material-ui/lab/Alert";
import AuthService from "../../../services/AuthService";
import Loader from "../../../loader/Loader";

class Login extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPassword: false,
            loginError: null,
            errors: {
                email: false,
                password: false,
            },
            isLoading: false
        };
    }

    // Function to handle the change in inputs
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: !event.target.value || event.target.value === "" ? true : false,
            },
        });
    };

    // Function to show/hide password
    handleClickShowPassword = () => {
        this.setState({ ...this.state, showPassword: !this.state.showPassword });
    };

    onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            this.handleSubmit(e);
        }
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Function to validate the form
    validateForm = () => {
        let hasError = false;
        let errors = {
            email: false,
            password: false,
        };
        if (!this.state.email || this.state.email === "") {
            errors.email = true;
            hasError = true;
        }
        if (!this.state.password || this.state.password === "") {
            errors.password = true;
            hasError = true;
        }

        this.setState({ errors: { ...this.state.errors, ...errors } });
        return hasError;
    };

    // Function to handle the submit event
    handleSubmit = (event) => {
        this.setState({ isLoading: true });
        const { loginError } = this.state;

        if (loginError) {
            this.setState({ loginError: null });
        }

        event.preventDefault();
        //validate the form
        const hasError = this.validateForm();

        if (hasError) {
            this.setState({ isLoading: false });
            return false;
        }

        const body = {
            username: this.state.email,
            password: this.state.password
        }

        AuthService.login()
            .then(response => {
                console.log(response);
                if (response.data) {
                    if (response.data.Username !== body.username || response.data.Password !== body.password) {
                        this.setState({ loginError: "Invalid username or password", 'isLoading': false });
                        return false;
                    }
                    this.setState({ isLoading: false });
                    Utils.addDataToStorage("user", response.data.Username);
                    this.context.updateUser({ user: response.user });
                    console.log("test");
                    this.props.history.push("/");
                }
            })
            .catch(error => {
                this.setState({ loginError: error.message ? error.message : "There is some error in logging you.", 'isLoading': false });
            });
    }


    render() {
        const { loginError } = this.state;
        return (
            <div>
                <Loader loading={this.state.isLoading} />
                <div>
                    <div>
                        {loginError && (
                            <>
                                <Alert severity="error">{loginError}</Alert>
                                <br />
                            </>
                        )}

                        <div>
                            <form onSubmit={this.handleSubmit} onKeyDown={this.onKeyDownHandler}>
                                <div>
                                    <TextField
                                        name="email"
                                        id="input-with-icon-textfield"
                                        label="Username"
                                        placeholder="Username"
                                        variant="filled"
                                        onChange={this.handleChange}
                                        error={this.state.errors.email}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="filled-password-input"
                                        label="Password"
                                        name="password"
                                        type={this.state.showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        variant="filled"
                                        helperText="Password must be at least 8 characters long"
                                        onChange={this.handleChange}
                                        error={this.state.errors.password}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                                <VisibilityOff />
                                                            )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div>
                                    <Button type="submit"> SignIn </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;