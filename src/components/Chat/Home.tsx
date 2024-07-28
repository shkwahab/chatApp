import React, { useState } from "react"
import { FaRocketchat } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../redux/store"
import { signOut } from "../../redux/slices/auth-slice"
const Home = () => {
    const dispatch = useDispatch<AppDispatch>()
    const authCtx = useSelector((state: RootState) => state.authCtx);
    const [hideProfileDropDown, setProfileDropDown] = useState<boolean>(false)
    return (
        <React.Fragment>
            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to={"/"} className="flex items-center p-2 text-gray-900 rounded-lg  ">
                                <FaRocketchat className='text-3xl text-blue-600' />
                                <span className="ms-3">Chat Me</span>
                            </Link>
                        </li>
                        <div className="flex space-x-4">

                        </div>

                        <li className=' absolute bottom-4 w-full  items-center flex justify-between'>
                            <div>
                                {authCtx.user?.name}
                            </div>
                            <div className="relative">
                                <button onClick={() => {
                                    setProfileDropDown(!hideProfileDropDown)
                                }}>

                                    <img className=' w-8 h-8 object-cover rounded-full' src={authCtx.user?.img} alt={authCtx.user?.name} />
                                </button>
                                {(hideProfileDropDown) &&
                                    <div className=' bg-gray-200 p-3 px-4 rounded-md absolute -top-20 left-6'>
                                        <div className="flex space-y-8 flex-col">
                                            <div>
                                                Profile
                                            </div>
                                            <button onClick={() => {
                                                dispatch(signOut())
                                            }} >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>

                        </li>

                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="rounded-lg">
                    {/* COntent goes here chat */}


                </div>
            </div>


        </React.Fragment>
    )
}

export default Home