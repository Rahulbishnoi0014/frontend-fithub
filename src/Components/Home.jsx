import React from 'react'

import "../CSS/home.css";
import img from "../Images/sapiens1.png"
import img1 from "../Images/sapiens.png"

import Signin from './Signin';
import { Link, NavLink } from 'react-router-dom';


const Home = () => {
    return (

        <div className='home'>
            <nav className='navbar'>
                <h1>F I T H U B</h1>
            </nav>

            <div className='section1'>
                <div className='textbox'>

                    <h1>F I T H U B</h1>
                    <br></br>
                    <p>The best and simple gym management system </p>
                    <br></br>



                    <div className="links">
                        <button>
                            <Link className='link' to="/signup" title='Register Yourself'>Register Yourself</Link>
                        </button>
                    </div>


                </div>

                <img src={img} ></img>
            </div>

            

            <div className='cards'>
                <div class='cardbox'>

                    <h2>Member</h2>
                    <hr />
                    <br />
                    <p>A system which is easy to use and easy on the pocket. It provides a straightforward interface for managing gym operations efficiently.</p>

                    <br />

                </div>
                <div class='cardbox'>

                    <h2>Attendance</h2>
                    <hr />
                    <br />
                    <p>A system which enables gym owners to utilize high-tech, easy-to-use face attendance without any extra cost. It streamlines the attendance tracking process, ensuring accurate records.</p>

                    <br />

                </div>
                <div class='cardbox'>

                    <h2>Free</h2>
                    <hr />
                    <br />
                    <p>A system which is free for all gyms. It offers essential gym management functionalities without any subscription or licensing fees.</p>


                </div>

            </div>

            <div className='section1'>

                <img src={img1} ></img>
                <div className='textbox'>

                    <h1>C A M P U S</h1>
                    <br></br>
                    <p>A platfrom for community with best gym finding. </p>
                    <br></br>



                    <div className="links">
                        <button>
                            <Link className='link' to="/memberlogin" title='Register Yourself'>JOIN</Link>
                        </button>
                    </div>


                </div>
            </div>
            <div className='footer'>

                <div>
                    <p>powered by</p>
                    <h1>F I T H U B</h1>
                    <h1>C A M P U S</h1>
                </div>

                <div className='contact'>
                    <h2>C O N T A C T :</h2>
                    <br></br>
                    <p>rahulbhadu14@gmail.com</p>
                    <p>sandeepjavvaji9848@gmail.com</p>

                </div>

            </div>
            <p style={{ backgroundColor: "yellowgreen" }}><center>Designed by Team Fithub with ❤️</center></p>




        </div>

    )
}

export default Home