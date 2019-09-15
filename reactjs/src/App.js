import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class App extends React.Component {
    state = {
        email: '',
        password: '',
        token: cookies.get('token'),
        message: ''
    }

    onChange = (e) => {
        if (e.keyCode === 13) {
            this.onSubmit();
        } else {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    }

    onSubmit = async () => {
        try {
            var userObj = {
                email: this.state.email,
                password: this.state.password
            }
            const res = await fetch(' http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObj)
            });

            const data = await res.json();

            if (data.tokenKey) {
                this.setState({
                    token: data.tokenKey,
                    message: ''
                });

                var date = new Date();
                date.setTime(date.getTime() + (30 * 1000));

                cookies.set('token', data.tokenKey, {
                    path: '/',
                    expires: date,
                });
            } else {
                this.setState({
                    message: data.message
                });
            }

        } catch (e) {
            console.log('Post error', e.message);
        }

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {this.state.token ?
                        <div className="login">
                            Login successfully
                        </div>
                        : <div>
                            <img src={logo} className="App-logo" alt="logo" />
                            <form className="form-signin">
                                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                                <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                                    required="" autoFocus="" name='email'

                                    onChange={e => this.onChange(e)}
                                    onKeyUp={e => this.onChange(e)}
                                    value={this.state.email} />
                                <label htmlFor="inputPassword" className="sr-only">Password</label>
                                <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                                    required=""
                                    name='password'

                                    onChange={e => this.onChange(e)}
                                    onKeyUp={e => this.onChange(e)}
                                    value={this.state.password} />
                                <div className="error">{this.state.message}</div>
                                <button className="btn btn-lg btn-primary btn-block" type="button"
                                    onClick={() => this.onSubmit()}>Sign in
                        </button>

                            </form>
                        </div>
                    }
                </header>
            </div>
        );
    }
}

export default App;
