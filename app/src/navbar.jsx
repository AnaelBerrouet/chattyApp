import React from 'react';

const numUsersStyle = {
  float: 'right',
  margin: '20px'
}

function Navbar({numUsers}) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span style={numUsersStyle}>{numUsers} Users Online</span>
    </nav>
  );
}

export default Navbar;