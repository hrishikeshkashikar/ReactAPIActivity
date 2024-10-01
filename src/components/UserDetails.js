import React from 'react';

function UserDetails({ user }) {
  if (!user) {
    return <div className="user-details">No user selected</div>;
  }

  const latitude = parseFloat(user.address.geo.lat);
  const longitude = parseFloat(user.address.geo.lng);
  let region = '';

  if (latitude > 0 && longitude > 0) {
    region = 'North and West (Orange)';
  } else if (latitude > 0 && longitude < 0) {
    region = 'North and East (Purple)';
  } else if (latitude < 0 && longitude > 0) {
    region = 'South and West (Green)';
  } else {
    region = 'South and East (Red)';
  }

  return (
    <div className="user-details">
      <h2>{user.name} (id: {user.id})</h2>
      <p>Email: {user.email}</p>
      <p>Address: {user.address.street}, {user.address.city}</p>
      <p>Region: {region}</p>
    </div>
  );
}

export default UserDetails;
