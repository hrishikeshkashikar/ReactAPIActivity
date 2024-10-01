import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUserSelect = async (userId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setSelectedUser(response.data);
      localStorage.setItem('selectedUser', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const getLocationInfo = (lat, lng) => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (latitude > 0 && longitude > 0) return { text: 'North and West', color: 'orange' };
    if (latitude > 0 && longitude < 0) return { text: 'North and East', color: 'purple' };
    if (latitude < 0 && longitude > 0) return { text: 'South and West', color: 'green' };
    return { text: 'South and East', color: 'red' };
  };

  const locationInfo = selectedUser
    ? getLocationInfo(selectedUser.address.geo.lat, selectedUser.address.geo.lng)
    : null;

  return (
    <div className="app">
      <div className="top-bar">
        {locationInfo && (
          <div className="location-box" style={{ backgroundColor: locationInfo.color }}>
            {locationInfo.text}
          </div>
        )}
        <div className="user-box">
          {selectedUser ? `${selectedUser.username} (id: ${selectedUser.id})` : 'User Not Selected'}
        </div>
      </div>
      <div className="content">
        <div className="dropdown-container">
          <div 
            className="dropdown-header" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Select User
            <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`}></span>
          </div>
          {isDropdownOpen && (
            <ul className="dropdown-list">
              {users.map(user => (
                <li key={user.id} onClick={() => handleUserSelect(user.id)}>
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="user-details">
          {selectedUser && (
            <>
              <h2>{selectedUser.name}</h2>
              <div className="user-info">
                <p>id: {selectedUser.id}</p>
                <p>name: {selectedUser.name}</p>
                <p>username: {selectedUser.username}</p>
                <p>email: {selectedUser.email}</p>
                <div className="location-info">
                  <p>Latitude: {selectedUser.address.geo.lat}</p>
                  <p>Longitude: {selectedUser.address.geo.lng}</p>
                  <div className="location-box" style={{ backgroundColor: locationInfo.color }}>
                    {locationInfo.text}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;