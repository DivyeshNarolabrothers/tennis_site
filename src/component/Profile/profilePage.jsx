import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import "../Profile/profilepage.css"


function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    credits: "",
    team: null, // Team data to store
  });

  const showAutoCloseAlert = (message) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const showAutoError = (message) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 3000,
    });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const Token = localStorage.getItem("user_token");
        const decodedToken = JSON.parse(atob(Token.split(".")[1]));
        const userId = decodedToken._id;

        const response = await axios.get(
          `http://35.200.147.33/api/users/user/profile/${userId}`,
          {
            headers: { user_token: Token },
          }
        );

        if (response.data && response.data.userDetails) {
          const { name, email, credits, team } = response.data.userDetails;
          setProfileData({
            name: name || "",
            email: email || "",
            credits: credits || "",
            team: team || null, // Set team data if available
          });
          showAutoCloseAlert(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
        if (error.response) {
          if (
            error.response.status === 500 &&
            error.response.data.message === "jwt expired"
          ) {
            showAutoError(error.response.data.message);
          } else {
            showAutoError("An error occurred while fetching profile data.");
          }
        }
      }
    };

    fetchProfileData();
  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "96vh", overflowY: "hidden" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8}>
          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              height: "100%", // Make sure the container takes full height
            }}
          >
            <h3>Profile Information</h3>
            <Table striped bordered hover responsive style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td1">{profileData.name}</td>
                  <td className="td1">{profileData.email}</td>
                  <td className="td1">{profileData.credits}</td>
                </tr>
              </tbody>
            </Table>

            {/* Display Team and Player Details */}
            {profileData.team && (
              <div className="mt-4" style={{ height: "100%" }}>
                <h4>{`Team: ${profileData.team.name}`}</h4>
                <img
                  src={`http://35.200.147.33/api/images/${profileData.team.profile_image}`}
                  alt="Team Profile"
                  style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
                <h5 className="mt-3">Players</h5>

                {/* Add scrollable player table */}
                <div
                  style={{
                    maxHeight: "300px", // Limit height for scrolling
                    overflowY: "auto", // Enable vertical scrolling
                  }}
                >
                  <Table striped bordered hover responsive style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Profile Image</th>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Share Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profileData.team.players.slice(0, 10).map((player) => (
                        <tr key={player._id}>
                          <td className="td1">
                            <img
                              src={`http://35.200.147.33/api/images/${player.profile_image}`}
                              alt={player.name}
                              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                            />
                          </td>
                          <td className="td1">{player.name}</td>
                          <td className="td1">{player.value}</td>
                          <td className="td1">{player.share_quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;



