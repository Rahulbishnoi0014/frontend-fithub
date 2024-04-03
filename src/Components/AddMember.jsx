import React, { useEffect, useRef, useCallback, useState } from 'react'

import Webcam from 'react-webcam';
import axios from 'axios';



import NavBar2 from "./NavBar2"
import "../CSS/addmember.css"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import * as Icon from "react-bootstrap-icons"
export default function AddMember() {
    const navigate = useNavigate();
    const [addmember, setAddmember] = useState({
        userName: "", name: "", phone: "", address: "", amount: "", dite: "", remark: ""
    })

    document.title = "FITHUB - Add Member"

    const [progress, setProgress] = useState(0)

    const [ownerAllData, setOwnerAllData] = useState("")
    const [ownergymdetail, setOwnergymdetail] = useState("")


    const callownerAllData = async (e) => {
        try {
            setProgress(30)
            const res = await fetch("/ownerhome", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            setProgress(60)
            // console.log("JS i rfdsnb");
            const data = await res.json();
            setProgress(100)
            setOwnerAllData(data)
            setOwnergymdetail(data.gymDetails[0])
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }
    useEffect(() => {
        callownerAllData();
        // eslint-disable-next-line
    }, [])


    const [datq, setDat] = useState({ feeDuration: "" });
    const [registerationDate, setregisterDate] = useState({ registerdate: "" })
    const [plane, setplane] = useState({ feeDuration: "" })
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleMember = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = (e.target.value).toLowerCase();
        setAddmember({ ...addmember, [name]: value })
        console.log(addmember);
    }

    const handleDate = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setregisterDate({ ...registerationDate, [name]: value })
        const q = new Date(registerationDate.registerdate)
        const duration = new Date(q.getFullYear(), q.getMonth() + parseInt(value), q.getDate());
        setplane({ ...plane, [name]: value });
        setDat({ ...datq, [name]: duration })
    }

    const postMember = async (e) => {
        setIsSubmitting(true);
        try {
            e.preventDefault();

            const { userName, name, phone, address, amount, dite, remark } = addmember
            const gymname = ownerAllData.gymname
            const { morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption, _id, city, category } = ownergymdetail

            const { feeDuration } = datq;
            const planeType = plane.feeDuration
            const { registerdate } = registerationDate


           
            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('registerdate', registerdate);
            formData.append('planeType', planeType);
            formData.append('amount', amount);
            formData.append('dite', dite);
            formData.append('remark', remark);
            formData.append('feeDuration', feeDuration);
            formData.append('morningOpening', morningOpening);
            formData.append('morningClosing', morningClosing);
            formData.append('eveningOpening', eveningOpening);
            formData.append('eveningClosing', eveningClosing);
            formData.append('gymAddress', gymAddress);
            formData.append('city', city);
            formData.append('category', category);
            formData.append('descreption', descreption);
            formData.append('_id', _id);
            formData.append('gymname', gymname);
            formData.append('File1', capturedImage); // Assuming imgFile is the File object for the image

            const res = await fetch('/addmember', {
                method: 'POST',
                body: formData
              })

              setIsSubmitting(false);

            if (res.status === 422) {
                toast.error('Fill All The Fields!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else if (res.status === 201) {
                toast.error('No face found!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else if (res.status === 402) {
                toast.warn('UserName Already Exist !', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else if (res.status === 204) {
                toast.warn('User FACE Already Exist !', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else if (res.status === 200) {
                toast.success('Mamber Added SuccessFully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    navigate("/memberdetails")
                }, 1000);
            }
            // else if (res.status === 401) {
            //     navigate("/")
            // }
            else {
                alert("Something went wrong")
            }


        } catch (error) {

            console.log(error);
            navigate("/addmember")
        }
    }
    // ---------------------face-------------
    const webcamRef = useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);
    const [name, setName] = useState(null);
    const [status, setstatus] = useState(false);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    }, [webcamRef]);

    const retake = () => {
        setCapturedImage(null);
    };

    
    // ---------------------face----------------

    return (
        <>
            <LoadingBar
                color='red'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <NavBar2 gymname={ownerAllData.gymname} />
            <div className="addmember">
                <div className="all_form">
                    <h1>Add Member</h1>
                    <form method='POST'>
                        <div className="flex-input">
                            <div className="lable">
                                <label htmlFor="userName">userName: </label>
                                <div className="icon">
                                    <Icon.PersonBadge className='inputIcon' />
                                    <input type="text" name='userName' placeholder='UserName' onChange={handleMember} required />
                                </div>
                            </div>
                            <div className="lable">
                                <label htmlFor="name">Name: </label>
                                <div className="icon">
                                    <Icon.PersonBoundingBox className='inputIcon' />
                                    <input type="text" name='name' placeholder='Name' onChange={handleMember} required />
                                </div>
                            </div>
                        </div>

                        <div className="flex-input">
                            <div className="lable">
                                <label htmlFor="phone">Phone No.: </label>
                                <div className="icon">
                                    <Icon.PhoneVibrate className='inputIcon' />
                                    <input type="number" name="phone" placeholder='Phone Number' onChange={handleMember} required />
                                </div>
                            </div>
                            <div className="lable">
                                <label htmlFor="address">Address: </label>
                                <div className="icon">
                                    <Icon.HouseLockFill className='inputIcon' />
                                    <input type="text" name="address" placeholder='Address' onChange={handleMember} required />
                                </div>
                            </div>
                        </div>

                        <div className="flex-input">
                            <div className="lable">
                                <label htmlFor="Register Date">Register Date: </label>
                                <div className="icon">
                                    <Icon.ClockFill className='inputIcon' />
                                    <input type="date" name='registerdate' placeholder="Registeraton date" onChange={handleDate} required />
                                </div>
                            </div>

                            <div className="lable">
                                <label htmlFor="Plan Type">Plan Type: </label>
                                <div className="icon">
                                    <Icon.CalendarCheckFill className='inputIcon' />
                                    <select name="feeDuration" onChange={handleDate} defaultValue={'DEFAULT'} required>
                                        <option value="DEFAULT" disabled>Fee Type</option>
                                        <option value="1">1 Months</option>
                                        <option value="3">3 Months</option>
                                        <option value="12">1 Year</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex-input">
                            <div className="lable">
                                <label htmlFor="Amount">Amount: </label>
                                <div className="icon">
                                    <Icon.CurrencyRupee className='inputIcon' />
                                    <input type="number" name='amount' placeholder='Amount' onChange={handleMember} required />
                                </div>
                            </div>
                        </div>
                        <br />
                        {/* --------- */}
                        <div className="camera">
                            {capturedImage ?
                                <div>
                                    <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
                                    <p>Captured Image</p>
                                </div> :
                                <Webcam width={200} ref={webcamRef} screenshotFormat="image/jpeg" />
                            }



                            {capturedImage ?
                                <h1 className='camerabutton' onClick={retake}>Retake</h1>
                                :
                                <h1  className='camerabutton' onClick={capture}>Capture</h1>
                            }


                        </div>
                        {/* --------- */}

                        <textarea name="dite" cols="100" rows="5" placeholder='Add Diet' onChange={handleMember}></textarea>
                        <br />
                        <button onClick={postMember} disabled={isSubmitting} style={{ backgroundColor: isSubmitting ? 'grey' : '' }}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    </form>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"

            />
        </>
    )
}
