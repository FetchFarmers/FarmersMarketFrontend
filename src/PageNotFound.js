import React from 'react';

const MESSAGES = [
  {
    message: "Oops, looks like the cows took a shortcut 🐄🐮🌽",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNjZWYwMzIxODgxMjk5MDM3ZDNkMWVhOWUxYjFjZTExZDE1Yjc1NSZjdD1n/XncE2zmvthjyg/giphy.gif"
  },
  {
    message: "Yikes! The goats ate this page 🐐🌾🌻",
    gifUrl: "https://media.giphy.com/media/qOIFUdyWRbeVhfAh5b/giphy.gif"
  },
  {
    message: "The bees must have stolen this page 🐝🌻🌼",
    gifUrl: "https://media.giphy.com/media/SSUyICBgb3tYI/giphy-downsized-large.gif"
  },
  {
    message: "We lost this page in the pumpkin patch 🎃🍁🍂",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTM3NjczNzcyNGRiY2VkNGU5NThiNmQwYmU1YzZmN2NhMjIxMzJjNiZjdD1n/J00IKrtdVPnbwywcvN/giphy.gif"
  },
  {
    message: "Sorry, this page is hiding in the corn maze 🌽🌽🌽",
    gifUrl: "https://media.giphy.com/media/wrW1xNeCns7S0/giphy.gif"
  },
  {
    message: "Oh no! The turkeys ran off with this page 🦃🌻🌽",
    gifUrl: "https://media.giphy.com/media/lnK7yGyQaCMJVfdGZr/giphy-downsized-large.gif"
  },
  {
    message: "Sorry, this page is lost in the apple orchard 🍎🍏🌳",
    gifUrl: "https://media.giphy.com/media/ysSCIY215u80w/giphy.gif"
  },
  {
    message: "Oh dear, the pigs got into this page 🐷🐽🌽",
    gifUrl: "https://media.giphy.com/media/RvHVx9wB3VvKo/giphy.gif"
  },
  {
    message: "Sorry, the sheep are counting this page instead of loading it 🐑🐏🌾",
    gifUrl: "https://media.giphy.com/media/u5o8PyNVp5Go0/giphy-downsized-large.gif"
  },
  {
    message: "This page is busy growing like our crops 🌱🌻🍅",
    gifUrl: "https://media.giphy.com/media/3og0ILgFOEXIL8Bsn6/giphy.gif"
  },
  {
    message: "Oops! Looks like we lost our harvest! 🌽🥦🍅",
    gifUrl: "https://media.giphy.com/media/l0IylexlBwLj0Xi92/giphy.gif"
  },
];

export default function PageNotFound() {
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    const { message, gifUrl } = MESSAGES[randomIndex];
    
    return (
      <div>
        <h1 className="notfound-message">{message}</h1>
        <img className="notfound-gif" src={gifUrl} alt="404 page not found" />
      </div>
    );
  }