import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const CLIENT_ID = "-";
  const REDIRECT_URI = "-";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);

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

  const searchArtists = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${searchKey}&type=artist`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("Search Artists Data:", data); // Log search artists data
      setArtists(data.artists.items);
    } catch (error) {
      console.error("Error searching artists:", error);
    }
  };

  const fetchArtistDetails = async (id) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("Artist Details Data:", data); // Log artist details data
      setSelectedArtist(data);
    } catch (error) {
      console.log("Error fetching artist details:", error);
    }
  };

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id} onClick={() => fetchArtistDetails(artist.id)}>
        {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
        <div>
          <p><a href={artist.uri}>{artist.name}</a></p>
          <p>Followers: {Intl.NumberFormat().format(artist.followers.total)}</p>
          <p>Genre: {artist.genres.join(', ')}</p>
          <p>Popularity: {artist.popularity}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="app">
      <header className="app-header">
        Spoti Sync
      </header>

      <nav>
        <ul className='login'>
        {!token ? (
          <button onClick={() => window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&show_dialog=true`}>
          Login to Spotify
          </button>
          ) : null
        }
        </ul>
      </nav>

      <body>
        {token && (
          <>
            <nav>
              <li className='login'>
                <h1>Spoti Sync</h1>
                {user && <div>Logged in as {user.display_name}</div>}
                <button onClick={logout}>Logout</button>
              </li>
            </nav>

            <form onSubmit={searchArtists}>
              <input
                type="text"
                onChange={e => {
                  setSearchKey(e.target.value);
                  console.log("Search Updated:", e.target.value); // Log the input value to the console
                }}
              />

              <button type="submit">Search</button>
            </form>
            
            <div className='artists'>
              {renderArtists()}
            </div>
            {selectedArtist && (
              <div className='artist'>
                <h2>{selectedArtist.name}</h2>
              </div>
            )}
          </>
        )}
      </body>
    </div>
  );
}

export default App;