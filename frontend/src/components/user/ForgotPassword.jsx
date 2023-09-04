import React, {Fragment, useState, useEffect} from 'react'
import MetaData from '../layout/MetaData';
import { forgotPassword, clearErrors } from '../../actions/userActions';
import { useDispatch, useSelector } from'react-redux';
import {useAlert} from 'react-alert';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const {error, loading, message} = useSelector((state) => state.forgotPassword)

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));

    }

    useEffect(() => {
        if (error){
            alert.error(error);
            dispatch(clearErrors())
        }

        if (message){
            alert.success(message);
            navigate('/');
        }
    },[error, message, alert, dispatch])
  return (
      <Fragment>
          <MetaData title={"Forgot Password"} />
          <div className="row wrapper">
              <div className="col-10 col-lg-5">
                  <form className="shadow-lg" onSubmit={submitHandler}>
                      <h1 className="mb-3">Forgot Password</h1>
                      <div className="form-group">
                          <label htmlFor="email_field">Enter Email</label>
                          <input
                              type="email"
                              id="email_field"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>

                      <button
                          id="forgot_password_button"
                          type="submit"
                          className="btn btn-block py-3"
                          disabled={loading ? true : false} >
                          Send Email
                      </button>

                  </form>
              </div>
          </div>

      </Fragment>
  )
}

export default ForgotPassword