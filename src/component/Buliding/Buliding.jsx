import React, { useEffect, useRef, useState } from "react";
import "../Buliding/buliding.css";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Building() {
  const [show, setShow] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState(Array(8).fill(null)); // Track selected profile images
  const [selectedPlayers, setSelectedPlayers] = useState([]); // Track selected players for confirmation
  const [confirmModal, setConfirmModal] = useState(false); // For confirmation modal
  const [playerShares, setPlayerShares] = useState({});
  const [totalSpent, setTotalSpent] = useState(0);
  const [teamName, setTeamName] = useState(""); // State for team name
  const [isMarketFrozen, setIsMarketFrozen] = useState(false);
  const [freezeMessage, setFreezeMessage] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [overallValue, setOverallValue] = useState(0);
  const [userName, setUserName] = useState("");
  const [inPlayValue, setInPlayValue] = useState(0);
  const [credits, setCredits] = useState(0);


  const navigate = useNavigate();
  // Show banner when the market is frozen
  const showFreezeBanner = () => {
    return isMarketFrozen ? (
      <div className="freeze-banner">
        {/* <p>{freezeMessage}</p> */}
        <p>
          The US Open starts soon. The market will close one hour before the
          start and reopen on completion
        </p>
      </div>
    ) : null; // Only render when the market is frozen
  };

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

  const fetchMarketStatus = async () => {
    try {
      const Token = localStorage.getItem("user_token");
      const response = await axios.get(
        "http://35.200.147.33/api/users/market-status",
        {
          headers: { user_token: Token },
        }
      );

      if (response.data.isFrozen) {
        setIsMarketFrozen(true);
        setFreezeMessage(
          "The market is currently frozen. Please wait for it to reopen."
        );
      } else {
        setIsMarketFrozen(false);
        setFreezeMessage(""); // Clear the message if market is unfrozen
      }
    } catch (error) {
      console.error("Error fetching market status:", error);
      showAutoError("Error fetching market status. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch market status initially and every 2 seconds
    fetchMarketStatus();
    const interval = setInterval(fetchMarketStatus, 100000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const fetchPlayers = async () => {
    const Token = localStorage.getItem("user_token");
    axios
      .get("http://35.200.147.33/api/users/players", {
        headers: { user_token: Token },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setPlayers(response.data.data);
        } else {
          console.error("Unexpected response format", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirmClose = () => setConfirmModal(false);
  const handleConfirmShow = () => setConfirmModal(true);

  // const handleBuyPlayer = (playerId, iconIndex) => {
  //   if (isMarketFrozen) {
  //     showAutoError("Market is frozen! Player purchases are disabled.");
  //     return;
  //   }

  //   const selectedPlayer = players.find((player) => player._id === playerId);
  //   if (!selectedPlayer) return;

  //   const newTotalSpent = totalSpent + selectedPlayer.value;
  //   if (newTotalSpent > 30) {
  //     alert("Total value of selected players cannot exceed 30.");
  //     return;
  //   }

  //   setPlayers((prevPlayers) =>
  //     prevPlayers.map((player) =>
  //       player._id === playerId ? { ...player, selected: true } : player
  //     )
  //   );

  //   setSelectedIcons((prev) => {
  //     const newSelectedIcons = [...prev];
  //     newSelectedIcons[iconIndex] = {
  //       image: selectedPlayer.profile_image,
  //       name: selectedPlayer.name,
  //       value: selectedPlayer.value,
  //     };
  //     return newSelectedIcons;
  //   });

  //   setSelectedPlayers((prevSelectedPlayers) => {
  //     if (!prevSelectedPlayers.some((p) => p._id === playerId)) {
  //       return [...prevSelectedPlayers, selectedPlayer];
  //     }
  //     return prevSelectedPlayers;
  //   });

  //   setTotalSpent(newTotalSpent);
  //   handleClose();
  // };
  const handleBuyPlayer = (playerId, iconIndex) => {
    // Check if the market is frozen
    if (isMarketFrozen) {
      showAutoError("Market is frozen! Player purchases are disabled.");
      return;
    }

    // Find the selected player based on the playerId
    const selectedPlayer = players.find((player) => player._id === playerId);
    if (!selectedPlayer) return; // Exit if player is not found

    // Calculate the new total spent value
    const newTotalSpent = totalSpent + selectedPlayer.value;

    // Validate that the total spent does not exceed the limit
    if (newTotalSpent > 30) {
      alert("Total value of selected players cannot exceed 30.");
      return;
    }

    // Mark the selected player as chosen
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player._id === playerId ? { ...player, selected: true } : player
      )
    );

    // Update the selected icons array
    setSelectedIcons((prev) => {
      const newSelectedIcons = [...prev];
      newSelectedIcons[iconIndex] = {
        image: selectedPlayer.profile_image,
        name: selectedPlayer.name,
        value: selectedPlayer.value,
      };
      return newSelectedIcons;
    });

    // Update the list of selected players
    setSelectedPlayers((prevSelectedPlayers) => {
      // Add player only if it's not already selected
      if (!prevSelectedPlayers.some((p) => p._id === playerId)) {
        return [...prevSelectedPlayers, selectedPlayer];
      }
      return prevSelectedPlayers;
    });

    // Update the total spent state
    setTotalSpent(newTotalSpent);

    // Optional: Log total spent to check the updates
    console.log("Total Spent:", newTotalSpent);

    // Close the modal or UI element
    handleClose();
  };

  console.log(totalSpent);

  const handleConfirm = () => {
    if (selectedPlayers.length <= 8) {
      handleConfirmShow();
    } else {
      alert("Please select 8 players.");
    }
  };

  // const handleSharesChange = (playerId, shares) => {
  //   setPlayerShares((prevShares) => ({ ...prevShares, [playerId]: shares }));
  // };
  const handleSharesChange = (playerId, shares) => {
    setPlayerShares((prevShares) => ({
      ...prevShares,
      [playerId]: shares >= 0 ? shares : 0, // Ensure shares cannot be negative
    }));
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setFile(imageFile);
    }
  };

  const confirmTeam = async () => {
    const Token = localStorage.getItem("user_token");
    if (!Token) {
      showAutoError("User token is missing. Please log in.");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(Token.split(".")[1]));
      const userId = decodedToken._id;

      const formData = new FormData();
      formData.append("teamName", teamName);
      formData.append("profile_image", file);

      const playersData = selectedPlayers.map((player) => ({
        id: player._id,
        share_quantity: playerShares[player._id] || 0, // This should be the value from your input field
        name: player.name,
        value: player.value,
      }));

      // Ensure share_quantity is captured and included in playersData
      playersData.forEach((player) => {
        player.share_quantity = playerShares[player.id] || 0; // Assign share quantity
      });

      formData.append("players", JSON.stringify(playersData));

      const response = await axios.post(
        `http://35.200.147.33/api/users/add-team/${userId}`,
        formData,
        { headers: { user_token: Token } }
      );

      showAutoCloseAlert(response.data.message);
      console.log("Team confirmed:", response.data);
      handleConfirmClose();
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 500 &&
          error.response.data.message === "jwt expired"
        ) {
          showAutoError("Session expired. Please log in again.");
        } else {
          showAutoError(
            error.response.data.message ||
              "Something went wrong. Please try again."
          );
        }
      } else {
        console.error("Error confirming team:", error);
        showAutoError("Network error. Please try again later.");
      }
    }
  };

  useEffect(() => {
    const Token = localStorage.getItem("user_token");

    if (Token) {
      const decodedToken = JSON.parse(atob(Token.split(".")[1]));
      const userId = decodedToken._id;

      // Fetch the in-play value from the API
      axios
        .get(`http://35.200.147.33/api/users/user/in-play-value/${userId}`, {
          headers: { user_token: Token },
        })
        .then((response) => {
          // Extract the needed values from the response
          const { name, credits, grand_total_value, player_value_sum } =
            response.data;

          // Set the name, credits, in-play value, and total user player value in state
          setUserName(name); // Set the user's name
          setCredits(credits); // Set the user's credits
          setInPlayValue(grand_total_value); // Set the in-play total value
          setTotalSpent(player_value_sum); // Set the total spent value
        })
        .catch((error) => {
          console.error("Error fetching in-play values:", error);
        });

      // Fetch the overall value from another API (if needed)
      axios
        .get(`http://35.200.147.33/api/users/user/overall/${userId}`, {
          headers: { user_token: Token },
        })
        .then((response) => {
          setOverallValue(response.data.grand_total_value); // Set the overall value
        })
        .catch((error) => {
          console.error("Error fetching overall values:", error);
        });
    }
  }, []);

  return (
    <div className="container">
      {" "}
      <>
        <div className="market-banner">
          <p>{isMarketFrozen && showFreezeBanner()} </p>
        </div>
        <div className="card1" style={{ background: "none" }}>
          {" "}
          <div className="card-header2">
            {" "}
            <div className="d-flex">
              {" "}
              <div className="left-section1">{userName}</div>{" "}
              <div className="right-section1">
                {" "}
                <h3 className="h3">Credit</h3>{" "}
                <p>
                  {" "}
                  Available:<span>{credits}</span>{" "}
                </p>{" "}
                <p>
                  {" "}
                  In-Play Value:<span>0</span>{" "}
                </p>{" "}
                <p>
                  {" "}
                  Overall +/- :<span>0</span>{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="d-flex">
              {" "}
              <div className="left-section1">My Team</div>{" "}
              <div className="right-market1">
                {" "}
                <button className="button" onClick={()=>navigate('/market')}>View Market</button>{" "}
              </div>
            </div>{" "}
          </div>{" "}
          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            centered
            size="lg"
          >
            {" "}
            <Modal.Header>
              {" "}
              <Modal.Title>
                {" "}
                <h5 className="modal-h5">
                  {" "}
                  To Buy A Player Click The Buy Button(s).{" "}
                </h5>{" "}
                <h4 className="modal-h1">Player Selection</h4>{" "}
                <div>
                  {" "}
                  <p className="modal-p">
                    {" "}
                    Sort by: <input placeholder="Value (high to low)" />{" "}
                  </p>{" "}
                </div>{" "}
              </Modal.Title>{" "}
            </Modal.Header>{" "}
            <Modal.Body
              className="custom-scrollbar"
              style={{ maxHeight: "350px", overflowY: "scroll" }}
            >
              {" "}
              <table style={{ backgroundColor: "transparent", width: "100%" }}>
                {" "}
                <thead>
                  {" "}
                  <tr>
                    {" "}
                    <td>Image</td>
                    <th>Players (Shares Held)</th> <th>Value</th> <th>Trade</th>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody>
                  {Array.isArray(players) && players.length > 0 ? (
                    players.map((player) => (
                      <tr key={player._id}>
                        <td>
                          <img
                            src={`http://35.200.147.33/api/images/${player.profile_image}`}
                            alt="Player Profile"
                            className="profile_image"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td>{player.name}</td>
                        <td>{player.value}</td>
                        <td>
                          {player.selected ? (
                            <span>Selected</span>
                          ) : (
                            <button
                              className="modal-button"
                              onClick={() =>
                                handleBuyPlayer(
                                  player._id,
                                  selectedIcons.indexOf(null)
                                )
                              }
                            >
                              Buy
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No players available</td>
                    </tr>
                  )}
                </tbody>
              </table>{" "}
            </Modal.Body>{" "}
          </Modal>{" "}
          <Modal
            show={confirmModal}
            onHide={handleConfirmClose}
            centered
            size="lg"
          >
            {" "}
            <Modal.Body style={{ backgroundColor: "white" }}>
              {" "}
              <table>
                {" "}
                <thead>
                  {" "}
                  <tr>
                    {" "}
                    <th className="confirm-th">Name</th>{" "}
                    <th className="confirm-th">Value per share</th>{" "}
                    <th className="confirm-th">Total shares</th>{" "}
                    <th className="confirm-th">Total Cost</th>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody>
                  {" "}
                  {selectedPlayers.map((player) => {
                    const shares = playerShares[player._id] || 0;
                    const totalCost = shares * player.value;
                    const totalTeamCost = selectedPlayers.reduce(
                      (acc, player) =>
                        acc + (playerShares[player._id] || 0) * player.value,
                      0
                    );
                    const percentage = totalTeamCost
                      ? ((totalCost / totalTeamCost) * 100).toFixed(2)
                      : 0;
                    return (
                      <tr key={player._id}>
                        {" "}
                        <td className="confirm-td">{player.name}</td>
                        <td className="confirm-td">{player.value}</td>
                        <td className="confirm-td">
                          {" "}
                          <input
                            type="number"
                            value={shares}
                            onChange={(e) =>
                              handleSharesChange(
                                player._id,
                                parseInt(e.target.value, 10)
                              )
                            }
                            className="input-field"
                            placeholder="Enter shares"
                            min="0"
                          />{" "}
                        </td>
                        <td className="confirm-td">
                          <span>{totalCost.toFixed(2)}</span>{" "}
                          <span
                            style={{
                              color: percentage > 20 ? "red" : "green",
                              fontSize: "0.9em",
                            }}
                          >
                            ({percentage}%){" "}
                          </span>{" "}
                        </td>{" "}
                      </tr>
                    );
                  })}{" "}
                  <tr>
                    {" "}
                    <td className="confirm-td">
                      {" "}
                      <strong>Total</strong>{" "}
                    </td>{" "}
                    <td className="confirm-td" style={{ color: "#28a745" }}>
                      {" "}
                      {selectedPlayers
                        .reduce((acc, player) => acc + player.value, 0)
                        .toFixed(2)}{" "}
                    </td>{" "}
                    <td className="confirm-td">
                      {" "}
                      {selectedPlayers.reduce(
                        (acc, player) => acc + (playerShares[player._id] || 0),
                        0
                      )}{" "}
                    </td>{" "}
                    <td className="confirm-td">
                      {" "}
                      {selectedPlayers
                        .reduce(
                          (acc, player) =>
                            acc +
                            (playerShares[player._id] || 0) * player.value,
                          0
                        )
                        .toFixed(2)}{" "}
                    </td>{" "}
                  </tr>{" "}
                </tbody>{" "}
              </table>{" "}
            </Modal.Body>{" "}
            <Modal.Footer
              style={{
                backgroundColor: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {" "}
              <div
                style={{ fontSize: "16px", color: "#000" }}
                className="footer-div"
              >
                {" "}
                Total value of purchase:{" "}
                <span style={{ color: "#000", fontWeight: "bold" }}>
                  {selectedPlayers
                    .reduce(
                      (acc, player) =>
                        acc + (playerShares[player._id] || 0) * player.value,
                      0
                    )
                    .toFixed(2)}{" "}
                  Credits{" "}
                </span>{" "}
              </div>{" "}
              <button
                className="btn3"
                onClick={confirmTeam}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                {" "}
                Confirm Team{" "}
              </button>{" "}
            </Modal.Footer>{" "}
          </Modal>{" "}
          <div className="card-body1">
            {" "}
            <div className="body-div1">
              {" "}
              <div className="d-flex flex-wrap">
                {" "}
                <div className="d-flex justify-content-between w-100">
                  {" "}
                  {selectedIcons.slice(0, 4).map((icon, index) => (
                    <div key={index} className="icon1" onClick={handleShow}>
                      {" "}
                      {icon ? (
                        <>
                          {" "}
                          <div className="player-container">
                            {" "}
                            <img
                              src={`http://35.200.147.33/api/images/${icon.image}`}
                              alt="Player Profile"
                              className="player-image"
                            />{" "}
                            <div className="player-info">
                              {" "}
                              <p className="player-name">{icon.name}</p>{" "}
                              <p className="player-value">{icon.value}</p>{" "}
                            </div>
                          </div>{" "}
                        </>
                      ) : (
                        <i className="fa-solid fa-plus plusicon"></i>
                      )}{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
                <div className="d-flex justify-content-between w-100 mt-2">
                  {" "}
                  {selectedIcons.slice(4, 8).map((icon, index) => (
                    <div key={index} className="icon1" onClick={handleShow}>
                      {" "}
                      {icon ? (
                        <>
                          {" "}
                          <div
                            className="player-container"
                            style={{ marginTop: "20px" }}
                          >
                            {" "}
                            <img
                              src={`http://35.200.147.33/api/images/${icon.image}`}
                              alt="Player Profile"
                              className="player-image"
                            />{" "}
                            <div className="player-info">
                              {" "}
                              <p className="player-name">{icon.name}</p>{" "}
                              <p className="player-value">{icon.value}</p>{" "}
                            </div>{" "}
                          </div>{" "}
                        </>
                      ) : (
                        <i className="fa-solid fa-plus plusicon"></i>
                      )}{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="card-body3">
            {" "}
            <div className="body-div1">
              {" "}
              <div className="icon-grid">
                {" "}
                {selectedIcons.map((icon, index) => (
                  <div key={index} className="icon1" onClick={handleShow}>
                    {" "}
                    {icon ? (
                      <>
                        {" "}
                        <div className="player-container">
                          {" "}
                          <img
                            src={`http://35.200.147.33/api/images/${icon.image}`}
                            alt="Player Profile"
                            className="player-image"
                          />{" "}
                          <div className="player-info">
                            {" "}
                            <p className="player-name1">{icon.name}</p>{" "}
                            <p className="player-value">{icon.value}</p>{" "}
                          </div>{" "}
                        </div>{" "}
                      </>
                    ) : (
                      <i className="fa-solid fa-plus plusicon"></i>
                    )}{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="card-footer2">
            {" "}
            <div className="footer">
              {" "}
              <div className="footer-firstline">
                {" "}
                <div className="footer-sub">
                  {" "}
                  <h4>Choose Your Team Name</h4>{" "}
                  <input
                    placeholder="Tennis Fan 11"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />{" "}
                </div>{" "}
                <div className="footer-sub1">
                  <h5>
                    {" "}
                    Max Budget <span>30.00</span>{" "}
                  </h5>{" "}
                  <h4>Select Your Team Avatar</h4>{" "}
                  <div
                    className="profile-image-box"
                    onClick={handleImageClick}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      textAlign: "center",
                      width: "60px",
                      height: "60px",
                      border: "1px solid gray",
                    }}
                  >
                    {" "}
                    {file ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <p style={{ display: "none" }}>
                        Click to upload a profile image
                      </p>
                    )}{" "}
                  </div>{" "}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    accept="image/*"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="footer-first1">
                {" "}
                <button className="btn2" onClick={handleConfirm}>
                  {" "}
                  Confirm ?{" "}
                </button>{" "}
              </div>{" "}
              <div className="d-flex">
                {" "}
                <div className="first1">
                  {" "}
                  <h4>{selectedIcons.filter(Boolean).length}/8</h4>{" "}
                  <p className="p1">selections</p>{" "}
                  <p className="p1">{totalSpent.toFixed(2)} spent</p>
                </div>{" "}
                <div className="second1">
                  {" "}
                  {selectedIcons.map((_, index) => (
                    <div
                      key={index}
                      className="circle"
                      style={{
                        backgroundColor: selectedIcons[index] ? "green" : "red",
                      }}
                    ></div>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </>
    </div>
  );
}

export default Building;
