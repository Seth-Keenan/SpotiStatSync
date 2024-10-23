import React, { useState, useEffect } from 'react';

const LogIn = () => {
  const CLIENT_ID = "-";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);

    if (token) {
      fetchUserProfile(token);
    }
  }, [token]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("User Profile Data:", data); // Log user profile data
      setUser(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token"); // Clear token from local storage
    setUser(null);
  };

  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
  };

  return (
    <div className="login-container">
      {!token ? (
        <button onClick={handleLogin}>
          Login to Spotify
        </button>
      ) : (
        <div>
          <h1>Welcome, {user?.display_name}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LogIn;