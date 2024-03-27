import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar3 from './NavBar3'
import "../CSS/memberhome.css"
import "../CSS/ownerhome.css"

import * as Icon from "react-bootstrap-icons"
import LoadingBar from 'react-top-loading-bar'
export default function MemberHome() {
  const navigate = useNavigate()
  const [memberHomeData, setmemberHomeData] = useState({
    allData: "", gymdetail: "", feehistory: []
  })
  const [progress, setProgress] = useState(0)

  document.title = "FITHUB - Home"

  const callMemberData = async () => {
    try {
      setProgress(30)
      const res = await fetch("/memberHome", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      setProgress(60)
      const data = await res.json();
      // console.log(data.gymDetails[0]);
      setProgress(100)

      setmemberHomeData({ allData: data, gymdetail: data.gymDetails[0], feehistory: data.feeHistory })

      console.log(data.feeHistory);

    } catch (error) {
      console.log(error);
      navigate("/memberlogin")
    }

  }
  useEffect(() => {
    callMemberData();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <LoadingBar
        color="linear-gradient(to right, #ff3300 0%, #000099 100%)"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <NavBar3 gymname={memberHomeData.allData.gymname} name={memberHomeData.allData.userName} />

      <div className="memberHome">
        <div className="atten">
          <h1 style={{ borderBottom: "2px solid black", margin: "20px 20px" }}>Dashboard <span style={{ fontSize: "20px", float: "right" }}><Icon.GeoAltFill />{memberHomeData.gymdetail.gymAddress}</span></h1>
          <button className='Abtn' onClick={() => navigate("/memberattendance")}>Attendance</button>
        </div>

        <br></br>
        <br></br>

        <div className="dashboard">
          <div className="dash-left member-home-left">
            <div className="my-info">
              <h2>My Info</h2>
              <hr />
              <div className="info">
                <div className="infooo">
                  <span><Icon.PersonCircle /></span>
                  <p>{memberHomeData.allData.name}</p>
                </div>
                <div className="infooo">
                  <span><Icon.GeoAltFill /></span>
                  <p>{memberHomeData.allData.address}</p>
                </div>
                <div className="infooo">
                  <span><Icon.PhoneVibrateFill /></span>
                  <p>{memberHomeData.allData.phone}</p>
                </div>

                <div className="infooo">
                  <span><Icon.PersonWorkspace /></span>
                  <p>{(memberHomeData.allData.gymname)}</p>
                </div>
              </div>
              <hr />
              <p>Dite : {memberHomeData.allData.dite}</p>
            </div>
            <hr style={{ margin: "10px 0px" }} />

            <div className="gym-info">
              <h2>Gym Info</h2>

              <div className="gym-information">
                <div className="timing">
                  <div className="morning">
                    <h4>Morning:</h4>
                    <br></br>
                    <div className="row">
                      <p><Icon.ClockFill /> {memberHomeData.gymdetail.morningOpening} AM</p>
                      <h4 style={{ margin: "0px 0px" }}> - </h4>
                      <p> {memberHomeData.gymdetail.morningClosing} AM</p>
                    </div>
                    <br></br>

                  </div>
                  <div className="evening">
                    <h4>Evening:</h4>
                    <br></br>

                    <div className="row">
                      <p><Icon.ClockFill /> {memberHomeData.gymdetail.eveningOpening} PM</p>
                      <h4 style={{ margin: "0px 0px" }}> - </h4>
                      <p> {memberHomeData.gymdetail.eveningClosing} PM</p>
                    </div>
                  </div>
                  <br></br>

                </div>

                {/* <hr style={{ margin: "10px 0px" }} /> */}
                {/* <h2>Gym Description</h2> */}
                <br></br>

                {/* <h3 style={{ margin: "10px 0px" }}><Icon.GeoAltFill />{memberHomeData.gymdetail.gymAddress}</h3> */}
                {/* <h3>{memberHomeData.gymdetail.descreption}</h3> */}
              </div>



              {/* <div className="links">
                <NavLink to="/updateOwnerInfo">Action</NavLink>
              </div> */}
            </div>

          </div>

          <div className="dash-right member-home-right">
            <div className="top-heading">
              <p><span><Icon.PeopleFill /></span> Fee History</p>
              {/* <p>Total:{ownerData.totalMember} </p> */}
            </div>
            <hr />

            <div className="table" style={{ marginTop: "10px" }}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">SNO.</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Plane Type</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Days Left</th>
                  </tr>
                </thead>
                {
                  // eslint-disable-next-line
                  memberHomeData.feehistory.map((curr, index) => {
                    const registeration = new Date(curr.registerdate)
                    const x = registeration.toLocaleDateString();
                    const feeDuration = new Date(curr.feeDuration);
                    const z = feeDuration.toLocaleDateString();

                    const q = new Date();
                    let Remaining;
                    let arr = [];
                    if (q.getTime() > registeration.getTime()) {
                      const diff = feeDuration.getTime() - q.getTime();
                      const one_day = 1000 * 3600 * 24;
                      Remaining = Math.ceil(diff / one_day)
                    }
                    else {
                      const diff = feeDuration.getTime() - registeration.getTime();
                      const one_day = 1000 * 3600 * 24;
                      Remaining = Math.ceil(diff / one_day)
                    }
                    return (
                      <>
                        <tbody>
                          <tr style={Remaining <= 5 ? { backgroundColor: "rgb(295, 225, 224)" } : { backgroundColor: "white" }} >
                            <td data-label="Sno.">{index + 1}</td>
                            <td data-label="Amount">{curr.amount}</td>
                            <td data-label="Plane Type">{curr.planeType[curr.planeType.length - 1]} Month</td>
                            <td data-label="Duration">{x} <br /> TO <br /> {z}</td>
                            <td data-label="Days Left">{Remaining}</td>
                          </tr>
                        </tbody>
                      </>
                    )
                  })
                }
              </table>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}
