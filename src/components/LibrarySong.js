import React from "react";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    // On ajoute le state active.
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
    //On vérifie si la musique est entrain de jouer :
  };

  return (
    <div
      onClick={songSelectHandler}
      //On utilise les backticks `` pour pouvoir écrire du javascript à côté de notre class
      //En javascript on check on si la song est active (dans le state) et si c'est active alors on change la classe pour selected
      className={`library-song ${song.active ? "selected" : ""} `}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
