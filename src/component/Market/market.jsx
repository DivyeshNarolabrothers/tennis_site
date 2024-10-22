import React, { useEffect, useRef, useState } from "react";
import "../Market/market.css";
import { Button, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Market() {
  const [show, setShow] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState(Array(8).fill(null)); // Track selected profile images
  const [selectedPlayers, setSelectedPlayers] = useState([]); // Track selected players for confirmation
  const [confirmModal, setConfirmModal] = useState(false); // For confirmation modal
  const [openModal, setOpenModal] = useState(false);
  const [playerShares, setPlayerShares] = useState({});
  const [totalSpent, setTotalSpent] = useState(0);
  const [teamName, setTeamName] = useState(""); // State for team name
  const [isMarketFrozen, setIsMarketFrozen] = useState(false);
  const [freezeMessage, setFreezeMessage] = useState("");
  const [overallValue, setOverallValue] = useState(0);
  const [userName, setUserName] = useState("");
  const [inPlayValue, setInPlayValue] = useState(0);
  const [credits, setCredits] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [teamProfileImage, setTeamProfileImage] = useState("");

  const navigate = useNavigate();

  const handlePostData = (e, playerId) => {
    const { value } = e.target;
    setPlayerShares((prevShares) => ({
      ...prevShares,
      [playerId]: Number(value), // Ensure it's a number
    }));
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

  const fetchMarketStatus = async () => {
    try {
      const Token = localStorage.getItem("user_token");
      const response = await axios.get(
        "http://35.200.147.33:9999/users/market-status",
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
        await fetchPlayersAndMarkSelected();
        await fetchSelectedTeamList();
        await fetchUserValues();
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

  const fetchPlayersAndMarkSelected = async () => {
    const Token = localStorage.getItem("user_token");

    try {
      // Step 1: Fetch all players from the API
      const playersResponse = await axios.get(
        "http://35.200.147.33:9999/users/players",
        { headers: { user_token: Token } }
      );

      // Step 2: Fetch selected team data from the second API
      const decodedToken = JSON.parse(atob(Token.split(".")[1]));
      const userId = decodedToken._id;

      const selectedTeamResponse = await axios.get(
        `http://35.200.147.33:9999/users/selected-teamlist/${userId}`,
        { headers: { user_token: Token } }
      );

      // Check for valid responses
      if (
        playersResponse.data &&
        Array.isArray(playersResponse.data.data) &&
        selectedTeamResponse.data &&
        selectedTeamResponse.data.status
      ) {
        const teamPlayers = selectedTeamResponse.data.team.players;
        const valueDifferences = selectedTeamResponse.data.valueDifferences;

        // Create a map for quick lookup of valueDifference by player_id
        const valueDifferenceMap = valueDifferences.reduce((acc, diff) => {
          acc[diff.player_id] = diff.valueDifference;
          return acc;
        }, {});

        // Step 3: Map all players, attaching the selected player details and valueDifference if available
        const allPlayers = playersResponse.data.data.map((player) => {
          const selectedPlayer = teamPlayers.find(
            (teamPlayer) => teamPlayer._id === player._id
          );

          // Get valueDifference from the map, if available
          const valueDifference = valueDifferenceMap[player._id] || null;

          // Return player object with additional selected, share_quantity, and valueDifference fields
          return {
            ...player,
            selected: !!selectedPlayer, // Mark player as selected if exists
            share_quantity: selectedPlayer
              ? selectedPlayer.share_quantity
              : null,
            valueDifference: valueDifference !== null ? valueDifference : null, // Attach valueDifference if found
            value: player.value || 0, // Ensure value is set, defaulting to 0 if not found
          };
        });

        // Step 4: Update the state with the fetched players
        setPlayers(allPlayers);
        console.log(allPlayers); // Check the log to ensure `value` and `valueDifference` are set correctly
      } else {
        console.error(
          "Unexpected response format",
          playersResponse.data,
          selectedTeamResponse.data
        );
      }
    } catch (error) {
      console.error("Error fetching players or selected team list:", error);
    }
  };

  // Assuming you have teamPlayers available in your component state or props
  useEffect(() => {
    const teamPlayers = []; // Replace with actual logic to get teamPlayers
    fetchPlayersAndMarkSelected(teamPlayers);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirmClose = () => setConfirmModal(false);
  const handleConfirmShow = () => setConfirmModal(true);
  const handleOpenShow = () => setOpenModal(true);
  const handleOpenClose = () => setOpenModal(false);

  const handleBuyPlayer = (playerId, iconIndex) => {
    // Check if the market is frozen
    if (isMarketFrozen) {
      showAutoError("Market is frozen! Player purchases are disabled.");
      return;
    }

    // Find the selected player from the players array
    const selectedPlayer = players.find((player) => player._id === playerId);
    if (!selectedPlayer) {
      return; // Exit if the player is not found
    }

    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player._id === playerId ? { ...player, selected: true } : player
      )
    );

    // Calculate the new total spent after the purchase
    const newTotalSpent = totalSpent + selectedPlayer.value;

    // Check if the new total exceeds the limit
    if (newTotalSpent > 30) {
      alert("Total value of selected players cannot exceed 30.");
      return;
    }

    // Update the selected players state to mark the player as selected
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player._id === playerId ? { ...player, selected: true } : player
      )
    );

    // Update the selected icons to include the newly selected player
    setSelectedIcons((prevIcons) => {
      const newSelectedIcons = [...prevIcons];
      newSelectedIcons[iconIndex] = {
        name: selectedPlayer.name,
        value: selectedPlayer.value,
        share_quantity: selectedPlayer.share_quantity,
        profile_image: selectedPlayer.profile_image, // Set the player image
        valueDifference: selectedPlayer.valueDifference || 0, // Set value difference if available
      };
      return newSelectedIcons;
    });

    // Add the selected player to the list of selected players
    setSelectedPlayers((prevSelectedPlayers) => {
      if (!prevSelectedPlayers.some((p) => p._id === playerId)) {
        return [...prevSelectedPlayers, selectedPlayer];
      }
      return prevSelectedPlayers;
    });

    // Update the total spent state
    setTotalSpent((prevTotal) => prevTotal + selectedPlayer.value);
    handleClose(); // Close the modal after selection
  };

  const handleSellButtonClick = (icon) => {
    setSelectedPlayer(icon); // Set the player to be sold
    setOpenModal(true); // Open the modal
  };

  const handleSellConfirm = async () => {
    const Token = localStorage.getItem("user_token");
    const decodedToken = JSON.parse(atob(Token.split(".")[1]));
    const userId = decodedToken._id; // Get user ID directly from decoded token

    try {
      // Determine how many shares to sell
      const quantityToSell =
        playerShares[selectedPlayer._id] ||
        playerShares[selectedPlayer.player_id] ||
        selectedPlayer.share_quantity ||
        1;

      // Prepare the request body
      const requestBody = {
        playerId: selectedPlayer.player_id, // Use the selected player's ID
        share_quantity: quantityToSell,
        removePlayers: [], // Initialize as empty array
      };

      // Check if the player should be removed
      if (selectedPlayer.share_quantity - quantityToSell <= 0) {
        requestBody.removePlayers.push(selectedPlayer._id); // Add player ID to removePlayers
      }

      // API call to sell the player
      const response = await axios.patch(
        `http://35.200.147.33:9999/users/sell-player/${userId}`, // Ensure this endpoint is correct
        requestBody,
        {
          headers: {
            user_token: Token,
            "Content-Type": "application/json",
          },
        }
      );
      await fetchSelectedTeamList();
      handleOpenClose();
      // Check if the sell was successful
      if (response.data.success) {
        // Update the state based on the response
        const newSelectedIcons = selectedIcons
          .map((icon) => {
            if (icon._id === selectedPlayer._id) {
              const updatedShareQuantity = icon.share_quantity - quantityToSell;
              return {
                ...icon,
                share_quantity:
                  updatedShareQuantity > 0 ? updatedShareQuantity : 0,
              };
            }
            return icon;
          })
          .filter((icon) => icon.share_quantity > 0); // Remove players with zero shares

        // Update the selected icons
        setSelectedIcons(newSelectedIcons);

        // Recalculate totalSpent
        const newTotalSpent = newSelectedIcons.reduce((acc, icon) => {
          return acc + icon.value * icon.share_quantity; // Assume each icon has a value
        }, 0);

        setTotalSpent(newTotalSpent); // Update the totalSpent state
      } else {
        alert("Error selling player: " + response.data.message);
      }
    } catch (error) {
      console.error("Error selling player:", error);
      alert("An error occurred while selling the player: " + error.message);
    } finally {
      setOpenModal(false); // Close the modal
      setTotalSpent((prevTotal) => prevTotal - selectedPlayer.value);
    }
  };

  const confirmTeam = async () => {
    try {
      const Token = localStorage.getItem("user_token");
      const decodedToken = JSON.parse(atob(Token.split(".")[1]));
      const userId = decodedToken._id;

      // Collect players and their share quantities
      const addPlayers = Object.entries(playerShares).map(
        ([player_id, share_quantity]) => ({
          playerId: player_id,
          share_quantity,
        })
      );

      const response = await axios.post(
        `http://35.200.147.33:9999/users/updateTeam/${userId}`,
        { addPlayers },
        {
          headers: {
            user_token: Token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Team confirmed:", response.data);

      // Fetch the updated selected team list
      showAutoCloseAlert(response.data.message);
      await fetchSelectedTeamList(); // Call the function to fetch the updated team list
      handleConfirmClose(); // Close the modal after confirming
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        showAutoError(
          "The market is currently frozen. Please wait until it's unfrozen."
        );
      } else {
        showAutoError("Network error. Please try again later.");
      }
    }
  };

  const fetchSelectedTeamList = async () => {
    try {
      const Token = localStorage.getItem("user_token");
      const decodedToken = JSON.parse(atob(Token.split(".")[1]));
      const userId = decodedToken._id;

      // Fetch the selected team list for the user
      const response = await axios.get(
        `http://35.200.147.33:9999/users/selected-teamlist/${userId}`,
        {
          headers: { user_token: Token },
        }
      );

      // Check if the response contains a successful status
      if (response.data.status) {
        const team = response.data.team;
        setTeamName(team.name);

        // Set the team profile image
        const baseUrl = "http://35.200.147.33:9999/images/"; // Adjust this URL to your actual image base URL
        setTeamProfileImage(`${baseUrl}${team.profile_image}`);
        await fetchUserValues();
        // Handle value differences and set selected icons
        const icons = response.data.valueDifferences || [];
        setSelectedIcons((prev) => {
          const newIcons = Array(8).fill(null);
          for (let i = 0; i < Math.min(icons.length, 8); i++) {
            newIcons[i] = icons[i]; // Fill only up to 8 icons
          }

          // Extract player IDs from the team players list
          const teamPlayerIds = response.data.team.players.map((p) => p._id);

          // Fetch all players and mark selected players
          fetchPlayersAndMarkSelected(teamPlayerIds);

          return newIcons;
        });
      }
    } catch (error) {
      console.error("Error fetching selected team list:", error);
    }
  };

  // Call the fetchSelectedTeamList on component mount
  useEffect(() => {
    fetchSelectedTeamList();
  }, []);

  const fetchUserValues = async () => {
    const Token = localStorage.getItem("user_token");

    if (Token) {
      const decodedToken = JSON.parse(atob(Token.split(".")[1]));
      const userId = decodedToken._id;

      // Fetch the in-play value from the API
      axios
        .get(`http://35.200.147.33:9999/users/user/in-play-value/${userId}`, {
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
        .get(`http://35.200.147.33:9999/users/user/overall/${userId}`, {
          headers: { user_token: Token },
        })
        .then((response) => {
          setOverallValue(response.data.grand_total_value); // Set the overall value
        })
        .catch((error) => {
          console.error("Error fetching overall values:", error);
        });
    }
  };

  useEffect(() => {
    fetchUserValues();
  }, []);

  console.log(players);
  const handlePlayerClick = (player) => {
    if (player) {
      setSelectedPlayer(player); // Set the clicked player as selected
      setConfirmModal(true); // Open modal
    }
  };

  return (
    <div className="container">
      <>
        <div className="market-banner">
          <p>{isMarketFrozen && showFreezeBanner()} </p>
        </div>

        <div className="card1" style={{ background: "none" }}>
          <div className="card-header1">
            <div className="d-flex">
              <div className="left-section1">{userName}</div>
              <div className="right-section1">
                <h3 className="h3">Credit</h3>
                <p>
                  Available:<span>{credits}</span>
                </p>
                <p>
                  In-Play Value:<span>{inPlayValue}</span>
                </p>
                <p>
                  Overall +/- :<span>{overallValue}</span>
                </p>
              </div>
            </div>
            <div className="d-flex">
              <div className="left-section1">The Market</div>
              <div className="right-market1">
                <button className="button" onClick={() => navigate("/myteam")}>
                  My Team
                </button>
              </div>
            </div>
          </div>
          
          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            centered
            size="lg"
          >
            <Modal.Header>
              <Modal.Title>
                <h5 className="modal-h5">
                  To Buy A Player Click The Buy Button(s).
                </h5>
                <h4 className="modal-h1">Player Selection</h4>
                <div>
                  <p className="modal-p">
                    Sort by:
                    <input placeholder="Value (high to low)" />
                  </p>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="custom-scrollbar"
              style={{ maxHeight: "350px", overflowY: "scroll" }}
            >
              <table style={{ backgroundColor: "transparent", width: "100%" }}>
                <thead>
                  <tr>
                    <th>Players (Shares Held)</th>
                    <th>Value</th>
                    <th>Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(players) && players.length > 0 ? (
                    players.map((player) => (
                      <tr key={player._id}>
                        <td>
                          <span
                            className={`circle ${
                              player.selected ? "green-circle" : ""
                            }`}
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              display: player.selected
                                ? "inline-block"
                                : "none",
                              margin: "0px 8px",
                            }}
                          ></span>
                          {player.name}
                          {player.selected && player.share_quantity ? (
                            <span style={{ marginLeft: "8px", color: "#ccc" }}>
                              ({player.share_quantity})
                            </span>
                          ) : null}
                        </td>
                        <td>
                          {/* Display player's individual value */}
                          {player.value || 0}{" "}
                          {/* Display value difference if it exists */}
                          {player.valueDifference !== null && (
                            <span
                              style={{
                                color:
                                  player.valueDifference > 0
                                    ? "green"
                                    : player.valueDifference < 0
                                    ? "red"
                                    : "green",
                              }}
                            >
                              (
                              {player.valueDifference > 0
                                ? `+${player.valueDifference}`
                                : player.valueDifference}
                              )
                            </span>
                          )}
                          {player.share_quantity > 0 && (
                            <div style={{ display: "flex", marginTop: "5px" }}>
                              <div
                                style={{ marginLeft: "35%", color: "white" }}
                              >
                                {player.value * player.share_quantity}
                              </div>
                              <div
                                style={{
                                  color:
                                    player.valueDifference > 0
                                      ? "green"
                                      : "red",
                                }}
                              >
                                (
                                {player.valueDifference
                                  ? player.valueDifference *
                                    player.share_quantity
                                  : 0}
                                )
                              </div>
                            </div>
                          )}
                        </td>

                        <td>
                          <>
                            <button
                              className="modal-button buy-button"
                              onClick={() => {
                                handleBuyPlayer(
                                  player._id,
                                  selectedIcons.indexOf(null)
                                );
                                setSelectedPlayer(player);
                                setConfirmModal(true);
                              }}
                            >
                              Buy
                            </button>
                            <button
                              className="modal-button transfer-button"
                              style={{ marginLeft: "10px" }}
                              onClick={() => {
                                handleSellConfirm(
                                  player._id,
                                  selectedIcons.indexOf(null)
                                );
                                setOpenModal(true);
                              }}
                            >
                              Sale
                            </button>
                          </>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No players available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Modal.Body>
          </Modal>

          {selectedPlayer && (
            <Modal
              show={confirmModal}
              onHide={handleConfirmClose}
              centered
              size="lg"
            >
              <Modal.Body style={{ backgroundColor: "white" }}>
                <table>
                  <thead>
                    <tr>
                      <th className="confirm-th">Name</th>
                      <th className="confirm-th">Value per share</th>
                      <th className="confirm-th">Total shares</th>
                      <th className="confirm-th">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="confirm-td">{selectedPlayer.name}</td>
                      <td className="confirm-td">{selectedPlayer.value}</td>
                      <td className="confirm-td">
                        <Form.Control
                          type="number"
                          placeholder="Enter number of shares"
                          value={
                            playerShares[selectedPlayer._id] ||
                            playerShares[selectedPlayer.player_id] ||
                            selectedPlayer.share_quantity ||
                            0
                          }
                          onChange={(e) =>
                            handlePostData(
                              e,
                              selectedPlayer._id || selectedPlayer.player_id
                            )
                          }
                          name="share_quantity"
                        />
                      </td>
                      <td className="confirm-td">
                        {(
                          selectedPlayer.value *
                          (playerShares[selectedPlayer._id] ||
                            playerShares[selectedPlayer.player_id] ||
                            selectedPlayer.share_quantity ||
                            1)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Modal.Body>

              <Modal.Footer
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ fontSize: "16px", color: "#000" }}
                  className="footer-div"
                >
                  Total value of purchase:{" "}
                  <span style={{ color: "#000", fontWeight: "bold" }}>
                    {(
                      selectedPlayer.value *
                      (playerShares[selectedPlayer._id] ||
                        playerShares[selectedPlayer.player_id] ||
                        selectedPlayer.share_quantity ||
                        1)
                    ).toFixed(2)}{" "}
                    Credits
                  </span>
                </div>
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
                  Confirm Team
                </button>
              </Modal.Footer>
            </Modal>
          )}
          {selectedPlayer && (
            <Modal show={openModal} onHide={handleOpenClose} centered size="lg">
              <Modal.Body style={{ backgroundColor: "white" }}>
                <table>
                  <thead>
                    <tr>
                      <th className="confirm-th">Name</th>
                      <th className="confirm-th">Value per share</th>
                      <th className="confirm-th">Total shares</th>
                      <th className="confirm-th">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="confirm-td">{selectedPlayer.name}</td>
                      <td className="confirm-td">{selectedPlayer.value}</td>
                      <td className="confirm-td">
                        <Form.Control
                          type="number"
                          placeholder="Enter number of shares"
                          value={
                            playerShares[selectedPlayer._id] ||
                            playerShares[selectedPlayer.player_id] ||
                            selectedPlayer.share_quantity ||
                            0
                          }
                          onChange={(e) =>
                            handlePostData(
                              e,
                              selectedPlayer._id || selectedPlayer.player_id
                            )
                          }
                          name="share_quantity"
                        />
                      </td>
                      <td className="confirm-td">
                        {(
                          selectedPlayer.value *
                          (playerShares[selectedPlayer._id] ||
                            playerShares[selectedPlayer.player_id] ||
                            selectedPlayer.share_quantity ||
                            1)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Modal.Body>

              <Modal.Footer
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ fontSize: "16px", color: "#000" }}
                  className="footer-div"
                >
                  Total value of purchase:{" "}
                  <span style={{ color: "#000", fontWeight: "bold" }}>
                    {(
                      selectedPlayer.value *
                      (playerShares[selectedPlayer._id] ||
                        playerShares[selectedPlayer.player_id] ||
                        selectedPlayer.share_quantity ||
                        1)
                    ).toFixed(2)}{" "}
                    Credits
                  </span>
                </div>
                <button
                  className="btn3"
                  onClick={handleSellConfirm}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Confirm Team
                </button>
              </Modal.Footer>
            </Modal>
          )}

          <div className="card-body1">
            <div className="body-div1">
              <div className="d-flex flex-wrap">
                <div className="d-flex justify-content-between w-100">
                  {selectedIcons.slice(0, 4).map((icon, index) => (
                    <div key={index} className="icon1">
                      {icon ? (
                        <div className="player-container">
                          <img
                            src={`http://35.200.147.33:9999/images/${icon.profile_image}`}
                            alt="Player Profile"
                            className="player-image"
                            onClick={() => handlePlayerClick(icon)}
                          />
                          <div className="player-buttons">
                            <button
                              className="btn-buy"
                              onClick={() => handlePlayerClick(icon)}
                            >
                              Buy
                            </button>
                            <button
                              className="btn-sell"
                              onClick={() => handleSellButtonClick(icon)}
                            >
                              Sell
                            </button>
                          </div>
                          <div className="player-info">
                            <div
                              className="d-flex"
                              style={{ marginBottom: "0" }}
                            >
                              <p
                                className="player-name"
                                style={{ fontSize: "16px", fontWeight: "bold" }}
                              >
                                {icon.name}
                              </p>
                              <span
                                style={{ fontSize: "20px", paddingLeft: "5px" }}
                              >
                                *
                              </span>
                              <p
                                className="player-share-quantity"
                                style={{
                                  marginLeft: "5px",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                }}
                              >
                                {icon.share_quantity}
                              </p>
                            </div>
                            <div
                              className="d-flex"
                              style={{ paddingLeft: "10px" }}
                            >
                              <p
                                className="player-value"
                                style={{ fontSize: "14px", color: "white" }}
                              >
                                {icon.value}
                              </p>

                              <p
                                className="player-value-difference"
                                style={{
                                  fontSize: "14px",
                                  marginLeft: "5px",
                                  color:
                                    icon.valueDifference < 0 ? "red" : "green",
                                }}
                              >
                                ({icon.valueDifference > 0 ? "+" : ""}
                                {icon.valueDifference})
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <i
                          className="fa-solid fa-plus plusicon"
                          onClick={() => {
                            handlePlayerClick(icon); // Call the first function
                            handleShow(); // Call the second function
                          }}
                        ></i>
                      )}
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between w-100 mt-5">
                  {selectedIcons.slice(4, 8).map((icon, index) => (
                    <div key={index} className="icon1">
                      {icon ? (
                        <div
                          className="player-container"
                          style={{ marginTop: "20px" }}
                        >
                          <img
                            src={`http://35.200.147.33:9999/images/${icon.profile_image}`}
                            alt="Player Profile"
                            className="player-image"
                            onClick={() => {
                              handlePlayerClick(icon);
                            }}
                          />
                          <div className="player-buttons">
                            <button
                              className="btn-buy"
                              onClick={() => {
                                handlePlayerClick(icon);
                              }}
                            >
                              Buy
                            </button>
                            <button
                              className="btn-sell"
                              onClick={() => handleSellButtonClick(icon)}
                            >
                              Sell
                            </button>
                          </div>
                          <div className="player-info">
                            <div
                              className="d-flex"
                              style={{ marginBottom: "0" }}
                            >
                              <p
                                className="player-name"
                                style={{ fontSize: "16px", fontWeight: "bold" }}
                              >
                                {icon.name}
                              </p>
                              <span
                                style={{ fontSize: "20px", paddingLeft: "5px" }}
                              >
                                *
                              </span>
                              <p
                                className="player-share-quantity"
                                style={{
                                  marginLeft: "5px",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                }}
                              >
                                {icon.share_quantity}
                              </p>
                            </div>
                            <div
                              className="d-flex"
                              style={{ paddingLeft: "10px" }}
                            >
                              <p
                                className="player-value"
                                style={{ fontSize: "14px", color: "white" }}
                              >
                                {icon.value}
                              </p>
                              <p
                                className="player-value-difference"
                                style={{
                                  fontSize: "14px",
                                  marginLeft: "5px",
                                  color:
                                    icon.valueDifference > 0 ? "green" : "red",
                                }}
                              >
                                ({icon.valueDifference > 0 ? "+" : ""}
                                {icon.valueDifference})
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <i
                          className="fa-solid fa-plus plusicon"
                          onClick={() => {
                            handlePlayerClick(icon);
                            handleShow();
                          }}
                        ></i>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card-body2">
            <div className="body-div1">
              <div className="icon-grid">
                {selectedIcons.map((icon, index) => (
                  <div key={index} className="icon1">
                    {icon ? (
                      <>
                        <div
                          className="player-container"
                          style={{ marginTop: "20px" }}
                        >
                          <img
                            src={`http://35.200.147.33:9999/images/${icon.profile_image}`}
                            alt="Player Profile"
                            className="player-image"
                            onClick={() => {
                              handlePlayerClick(icon);
                            }}
                          />
                          <div className=" player-buttons">
                            <button
                              className="btn-buy"
                              onClick={() => {
                                handlePlayerClick(icon);
                              }}
                            >
                              Buy
                            </button>
                            <button
                              className="btn-sell"
                              onClick={() => handleSellButtonClick(icon)}
                            >
                              Sell
                            </button>
                          </div>

                          <div className="player-info">
                            <div
                              className="d-flex"
                              style={{ marginBottom: "0" }}
                            >
                              <p
                                className="player-name"
                                style={{ fontSize: "10px", fontWeight: "bold" }}
                              >
                                {icon.name}
                              </p>
                              <span
                                style={{ fontSize: "10px", paddingLeft: "5px" }}
                              >
                                *
                              </span>
                              <p
                                className="player-share-quantity"
                                style={{
                                  marginLeft: "5px",
                                  fontSize: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                                {icon.share_quantity}
                              </p>
                            </div>
                            <div
                              className="d-flex"
                              style={{ paddingLeft: "10px" }}
                            >
                              <p
                                className="player-value"
                                style={{ fontSize: "10px", color: "white" }}
                              >
                                {icon.value}
                              </p>
                              <p
                                className="player-value-difference"
                                style={{
                                  fontSize: "10px",
                                  marginLeft: "5px",
                                  color:
                                    icon.valueDifference > 0 ? "green" : "red",
                                }}
                              >
                                ({icon.valueDifference > 0 ? "+" : ""}
                                {icon.valueDifference})
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <i
                        className="fa-solid fa-plus plusicon"
                        onClick={() => {
                          handlePlayerClick(icon); // Call the first function
                          handleShow(); // Call the second function
                        }}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card-footer1">
            <div className="footer">
              <div className="footer-firstline">
                <div className="footer-sub">
                  <h4>Choose Your Team Name</h4>
                  {/* <input
                  placeholder="Tennis Fan 11"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)} // Update team name state
                /> */}
                  <input
                    placeholder="Tennis Fan 11"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)} // Update team name state
                  />
                </div>
                <div className="footer-sub1">
                  <h5>
                    Max Budget <span>30.00</span>
                  </h5>
                  <h4>Select Your Team Avatar</h4>

                  <img
                    src={teamProfileImage}
                    alt="Team Avatar"
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      textAlign: "center",
                      width: "60px",
                      height: "60px",
                      border: "1px solid gray",
                    }}
                  />
                </div>
              </div>

              <div className="d-flex">
                <div className="first1">
                  <h4>{selectedIcons.filter(Boolean).length}/8</h4>
                  <p className="p1">selections</p>
                  <p className="p1">{totalSpent.toFixed(2)} spent</p>
                </div>
                <div className="second1">
                  {selectedIcons.map((_, index) => (
                    <div
                      key={index}
                      className="circle1"
                      style={{
                        backgroundColor: selectedIcons[index] ? "green" : "red", // Set color based on selection
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Market;
