import React, {useEffect, useState, Fragment} from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { changePassword , clearErrors} from '../../actions/userActions'


const ChangePassword = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {error, message, loading} = useSelector((state) => state.changePassword)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    useEffect(() => {
        if(error){
            alert.error(error)
        }

        if (message){
            alert.success(message)
            dispatch(clearErrors())
            navigate('/me')
        }
    }, [error, message, alert])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(changePassword(currentPassword, newPassword, confirmNewPassword))
        
    }
    
  return (
    <Fragment>
            <MetaData title={'Change Password'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Current Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirm_new_password_field"
                                className="form-control"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update Password</button>
                    </form>
                </div>
            </div>

        </Fragment>
  )
}

export default ChangePassword