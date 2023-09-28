import React, { Fragment, useEffect, useState } from 'react';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors, loadUser } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';



const Register = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const [name, setName] =  useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/profile.png");
    // console.log("avatar: " + avatar)


    const {isAuthenticated, error, loading} = useSelector(state => state.registerUser)

    useEffect(() => {
        if (isAuthenticated){
            navigate('/');
        }

        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error]);


    const submitHandler = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar)

        await dispatch(register(formData));
        alert("Registered successfully")
        dispatch(loadUser())
        
    }

    const onChange = e => {
        
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }

            }
            reader.readAsDataURL(e.target.files[0])
    }
  return (
    <Fragment>

            <MetaData title={'Register User'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="custom-file">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className='avatar mr-3 item-rt1'>
                                        <img 
                                        src={avatarPreview} 
                                        alt="Avatar Preview"
                                        className='rounded-circle' 
                                        />

                                    </figure>
                              </div>
                              <div className="custom-file">
                                  <input
                                      type="file"
                                      name='avatar'
                                      maxLength="10MB"
                                      accept = ".jpg, .png, .pdf"
                                      className='cutom-file-input'
                                      id='custom-file'
                                    //   accept='/iamges/*'
                                      onChange={onChange}
                                  />
                                  <label htmlFor="custom-file" className="custom-file-label">
                                      Choose Avatar
                                  </label>
                              </div>
                          </div>
        
                        </div>

                        

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
  )
}

export default Register