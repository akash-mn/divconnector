import React, { useState } from "react";
import {Link ,Navigate} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { login } from "../../actions/auth";


function Login({login,isAuthenticated}) {
  const [fromData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = fromData;
  const onChange = (e) =>
    setFormData({ ...fromData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
     login({email,password});
    // console.log('OK');
    }

    // Redirect if logged in
    if(isAuthenticated) {
      return <Navigate to='/dashboard' />
    }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => onChange(e)}
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={(e) => onChange(e)}
            value={password}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
};
const mapStateToProps= state=>({
  isAuthenticated:state.auth.isAuthenticated
});
export default connect(mapStateToProps,{login})(Login);
