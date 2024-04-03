import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import NavBar2 from './NavBar2';
import "../CSS/faceatt.css"

import { useNavigate } from 'react-router-dom';

const FaceAtt = () => {
    const webcamRef = useRef(null);
    const [img, setImg] = useState(null);
    const [status, setStatus] = useState(false);
    const [err, setErr] = useState('');
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [studentDisplayData, setStudentDisplayData] = useState([]);
    const [gymname, setgymname] = useState('')

    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            const res = await fetch("/memberdetails", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setStudentDisplayData(data.newmembers);
            setgymname(data.gymname)

        } catch (error) {
            console.log(error);
            navigate("/faceattendance");
        }
    };

    const captureImage = async () => {
        try {
            const screenshot = webcamRef.current.getScreenshot();
            setImg(screenshot);
            setSubmitting(true);
            await handleImageUpload(screenshot);
        } catch (error) {
            console.error('Error capturing image:', error);
        }
    };

    const handleImageUpload = async (image) => {
        if (!image) {
            setErr('No image captured yet');
            return;
        }

        const formData = new FormData();
        formData.append('File1', image);

        try {
            const response = await axios.post('http://localhost:5001/check-face', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                let userName = response.data.result[0]._label;

                await markAttendance(userName);

            } else {

                setErr('Try again or register face first');
                setStatus(false);
            }
        } catch (err) {
            setErr('Server error. Please try again.');
            // console.error('Error uploading image:', err);
            // setStatus(false);
            setTimeout(() => {
                window.location.reload(); // Refresh the page after 3 seconds of showing attendance message
            }, 2000);

            // setTimeout(() => {
            //     setAttendanceMarked(false);
            //     setName('');
            //     setStatus(false);
            //     setErr('');
            //     setImg(null);
            // }, 2000);

        } finally {
            setSubmitting(false);
        }
    };
    const markAttendance = async (userName) => {
        const attendanceData = {
            userName,
            isChecked: true,
            date: new Date().toISOString(),
        };
        try {
            const res = await fetch("/markfaceAttendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(attendanceData)
            });

            console.log(res);

            if (res.status === 200) {
                setAttendanceMarked(true);
                setErr('');
                setStatus(true);
                setName(userName);

                console.log(`Attendance marked for student with ID ${userName}`);
                console.log("Updated");

                setTimeout(() => {
                    // window.location.reload(); // Refresh the page after 3 seconds of showing attendance message

                    setAttendanceMarked(false);
                    setName('');
                    setStatus(false);
                    setErr('');
                    setImg(null);


                }, 3000);

            } else {
                setStatus(false);

                console.error(`Error marking attendance for student with ID ${userName}`);
                setTimeout(() => {
                    window.location.reload(); // Refresh the page after 3 seconds of showing attendance message
                }, 2000);
            }
        } catch (error) {
            setStatus(false);
            console.error(error);
            setTimeout(() => {
                window.location.reload(); // Refresh the page after 3 seconds of showing attendance message
            }, 2000);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {

        setTimeout(() => {
            captureImage(); // Capture image every 5 seconds if status is not true

        }, 2000);

    }, [status]); // Run the effect when status changes

    return (
        <>

            <NavBar2 gymname={gymname} />
            <div className='facemain'>
                <div className='messbox'>
                    <p className='fheading'>Face Recognition System</p>
                    {submitting && !attendanceMarked ? <p>verification in process...</p> : <p></p>}

                    {attendanceMarked && <p className='present'>Attendance marked for "<strong>{name}</strong>"</p>}
                    <p>{err}</p>
                </div>

                <div className='camerabox'>
                    <div className='livecamera'>

                        <Webcam
                            ref={webcamRef}
                            width={400}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{ facingMode: 'user' }}
                        />
                        <p>Live camera</p>
                        <p>Stay in front for few seconds</p>

                    </div>
                    <div className='preimg'>
                        <img src={img} alt="" />
                        <p>Preview Image</p>
                        {submitting ? <p>verification in process...</p> : <p>Next picture in few seconds</p>}
                    </div>
                </div>

            </div>





        </>
    );
};

export default FaceAtt;
