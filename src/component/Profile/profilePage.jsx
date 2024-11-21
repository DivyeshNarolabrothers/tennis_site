import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Row, Col, Form, Table, Button, Modal } from "react-bootstrap";
import "../Profile/profilepage.css"
import { useNavigate } from "react-router-dom";


function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password:"",
    credits: "",
    profile_image: "", 
    team: null, // Team data to store
    profile_image: "", // Profile image field
  });
  const navigate = useNavigate();

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
            headers: { Authorization: `Bearer ${Token}` },
          }
        );

        if (response.data && response.data.userDetails) {
          const { name, email,password, credits, team ,profile_image } = response.data.userDetails;
          setProfileData({
            name: name || "",
            email: email || "",
            password:password || "",
            credits: credits || "",
            team: team || null, // Set team data if available
            profile_image: profile_image || "", // Ensure profile_image is fetched
          });
          console.log(response.data.message);
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

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: profileData.name || "",
    password: profileData.password || "",
    email: profileData.email || "",
  });
  const [profileImage, setProfileImage] = useState(null);

  // Open modal with current profile data
  const handleEditClick = () => {
    setFormData({
      name: profileData.name,
      password: profileData.password,
      email: profileData.email,
    });
    setShowModal(true);
  };


  // Close modal
  const handleClose = () => setShowModal(false);

  // Handle form input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Token = localStorage.getItem("user_token");
      const decodedToken = JSON.parse(atob(Token.split(".")[1]));
      const userId = decodedToken._id;

      // Prepare form data
      const data = new FormData();
      data.append("name", formData.name);
      data.append("password", formData.password);
      data.append("email", formData.email);
      if (profileImage) {
        data.append("profile_image", profileImage);
      }

      const response = await axios.patch(
        `http://35.200.147.33/api/users/userdetails-updated/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.data.status) {
        navigate('/');
      }

      // Update profileData and close modal
      setProfileData(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };


  return (
    <>
    
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
                  <th>Profile</th>
                  <th>Full Name</th>
                  <th>Password</th>
                  <th>Email</th>
                  <th>Credits</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td className="td1">
                <img
                  src={`http://35.200.147.33/api/images/${profileData.profile_image || "default-image.png"}`}
                  alt="Profile"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </td>
                  <td className="td1">{profileData.name}</td>
                  <td className="td1">{profileData.password}</td>
                  <td className="td1">{profileData.email}</td>
                  <td className="td1">{profileData.credits}</td>
                  <td className="td1" >
              <button variant="primary" onClick={handleEditClick} className="btn6">
                Edit
              </button>
            </td>
                </tr>
              </tbody>
            </Table>
            <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header >
          <Modal.Title style={{color:'white'}}>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white" }}>
          <Form onSubmit={handleSubmit} >
            <Form.Group controlId="formName">
              <Form.Label >Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formProfileImage">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange}  name="profile_image"/>
              </Form.Group>
            <Button variant="primary" type="submit" className="btn5" >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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
                        {/* <th>Profile Image</th> */}
                        <th>Name</th>
                        <th>Value</th>
                        <th>Share Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profileData.team.players.slice(0, 10).map((player) => (
                        <tr key={player._id}>
                          {/* <td className="td1">
                            <img
                              src={`http://35.200.147.33/api/images/${player.profile_image}`}
                              alt={player.name}
                              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                            />
                          </td> */}
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
    </>
  );
}

export default ProfilePage;



