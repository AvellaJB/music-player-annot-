import react from "react";
//Avant de pouvoir importer les icons et font nous avons installer avec npm font awesome
//grâce aux commandes présentes sur le site : https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
//Pour pouvoir faire appel à des taf HTML dans notre code React on ajouter useRef qui premet de récupérer dans nos fonction
//les éléments HTML dont on a besoin
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//faPLay correspond au bouton play, on accèdre via {} aux éléments présents dans la library font awesome.
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
  activeLibraryHandler,
}) => {
  //Mise à jour de la library quand on fait suivant sur le player :

  //Event Handlers
  //Fonction de play pause de la musique
  const playSongHandler = () => {
    //Ici la fonction commence par play la musique, elle a récupéré la balise html grace à useRef
    audioRef.current.play();
    //mais si on veux que ça pause il faut prévoir à la fois la fonction pause
    if (isPlaying) {
      audioRef.current.pause();
      //mais il faut aussi changer le state de la musique par son opposé
      //comme ça si la musique joue, elle se pause, mais si elle est en pause alors elle joue.
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //Cette fonction va gérer le slider.
  const dragHandler = (e) => {
    //Le audioref permet de donné une target value à notre musqiue lorsqu'on change le slider.
    audioRef.current.currentTime = e.target.value;

    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((songs) => songs.id === currentSong.id);
    if (direction === "skip-forward") {
      //Ici on utilise un modulus (%) qui retourne le restant dans une soustraction
      // 5 % 2 = 3
      // Ce qui permet de revenir au début de la liste de musique et que ça crash pas.
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    //Quand on va backwards ça fonctionne pas jusqu'au bout parce que le modulus retourne
    //un index de -1 quand on arrive à après la première chanson.
    if (direction === "skip-back") {
      //la fonction suivante indique qu'une fois l'index arrivé à -1, on le set à song.lenght
      // soit le nombre total de song (8) et on retire 1 car notre index commence à 0
      //Il y a bien 8 musique, numéroté de 0 à 7.
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        //Le return permet de bien lancer la fonction, sinon c'est celle du dessous qui se lance
        //et elle crash à -1
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  // Add the Styles

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime || 0}
            type="range"
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        {/*Ici on corrige le bug du NaNNaN lorsqu'on change rapidemment de musique, on lui dit de mettre 0
        en attendant de la durée de la musique charge*/}
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        {/*Utilisation de l'icon, on fait appel au component FontAwesomeIcon puis
      on va chercher le props Faplay*/}
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          /*Ici on utilise isPlaying pour savoir si notre musique play. 
          On a un if simple, ? true : false, si isPlaying is true alors pause
        sinon faplay*/
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      {/*Ici on a ajouté la REF qui nous permet de récupérer la balise HTML dans notre JSX au dessus*/}
    </div>
  );
};

export default Player;
