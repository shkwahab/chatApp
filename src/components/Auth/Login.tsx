import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth, login } from '../../apis/types';
import { useMutation } from '@tanstack/react-query';
import { getUser, loginFunc } from '../../apis/auth.api';
import { showErrorNotification, showSuccessNotification } from '../../utils/notifcation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { login as setAuth } from '../../redux/slices/auth-slice';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [user, setUser] = useState(null)
    const router = useNavigate();
    const getUserMutation = useMutation({
        mutationFn: getUser,
        onSuccess: (data: any) => {
            setUser(data?.data)
        }
    })
    const mutation = useMutation({
        mutationFn: loginFunc,
        onSuccess: async (data: any) => {
            const response = data?.data
            console.log(response)
            localStorage.setItem("token", response?.token)
            const body = { token: response?.token }
            await getUserMutation.mutateAsync(body)
            showSuccessNotification(data.message)
            const authCtx: Auth = {
                isLogin: true,
                user,
                token: response?.token,
                tokenExpiry: String(response?.expires)
            }
            dispatch(setAuth(authCtx))

        },
        onError: (error: any) => {

            showErrorNotification(error?.response?.data?.message)
        }
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = new FormData(e.currentTarget);
            const email = data.get("email") as string;
            const password = data.get("password") as string;
            const body: login = { email, password };
            // Call the mutation function with the form data
            await mutation.mutateAsync(body);
            router("/");
        } catch (error) {
            // console.log(error)
        }
    };
    return (
        <React.Fragment>
            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Flowbite
                    </a>
                    <div className="w-full  bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" checked={true} type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-darkprimary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                <p className="text-sm font-light text-gray-500">
                                    Don’t have an account yet? <Link to="/register" className="font-medium text-primary hover:underline">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}

export default Login