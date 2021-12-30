import React from "react";

//Ici on viens ajotuer à notre fonction en paramètre le props currentsong
//qui est envoyé depuis App.js qui est le parent.
const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      {/*Une fois que le props est passé dans notre fonction on peux récupérer les infos du props directement
      et donc remplacer par un objet contenant la data qu'on cherche*/}
      <img src={currentSong.cover} alt={currentSong.name}></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
