import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';


const Registration = () => {
    const { user, createUser } = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const registrationHandler = event => {
        event.preventDefault();

        // get value
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        console.log(email, password, confirmPassword);

        setError('')
        setSuccess('')
        // validation
        if (password !== confirmPassword) {
            setError('Your password did not match');
            return;
        } else if (password.length < 6) {
            setError('Password must be 6 characters or longer')
            return;
        }

        // create user
        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('User created successful')
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Registration!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={registrationHandler} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input required type="email" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input required type="password" name='password' placeholder="password" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input required type="password" name='confirmPassword' placeholder="confirm password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            <p className="text-error">{error}</p>
                            <p className="text-primary">{success}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Registration</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;