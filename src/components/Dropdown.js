import React from 'react';

function Dropdown({ users, onSelect }) {
  const handleSelectChange = (event) => {
    const userId = event.target.value;
    if (userId) {
      onSelect(userId);
    }
  };

  return (
    <div className="dropdown">
      <select onChange={handleSelectChange}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
