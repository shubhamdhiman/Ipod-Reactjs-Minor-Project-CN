import { useEffect, useState } from "react";
import '../assets/css/App.css';
import Controller from './Controller';
import Display from './Display';
import ZingTouch from 'zingtouch';

// Setting global variables
let index = 0,
  range = 0,
  visibility = true,
  selectItem;

function App() {
  //Using use state hooks for List items
  const [list, setList] = useState([
    { listItem: "Playlist", flag: true, id: 0 },
    { listItem: "Songs", flag: false, id: 1 },
    { listItem: "Games", flag: false, id: 2 },
    { listItem: "Workout", flag: false, id: 3 },
    { listItem: "Settings", flag: false, id: 5 },
  ]);

  // use state hooks for activeItem
  const [activeItem, setActiveItem] = useState([]);

  // use effect hooks
  useEffect(() => {
    // select circular button
    let circularButton = document.getElementById("circular-btn");
    let activeRegion = new ZingTouch.Region(circularButton); //create touch Region
    activeRegion.bind(circularButton, "rotate", function (event) {
      // console.log("Event Detail",Math.floor(event.detail.distanceFromLast))
      range += Math.floor(event.detail.distanceFromLast);
      

      if (range > 70) {
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, flag: true };
            } else {
              return { ...item, flag: false };
            }
          });
        });
        index++;
        range = 0;

        if (index === 6 ) {
          index = 0;
        }
      } else if (range < -100) {
        index--;

        if (index < 0) {
          index = 5;
        }
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, flag: true };
            } else {
              return { ...item, flag: false };
            }
          });
        });
        range = 0;
      }
    });
  }, []);

  //Handle selective listItem ok button position at center inside the circural button
  const handleSelect = () => {
    if(document.getElementsByClassName('hide').length===1){
      return;
    }
    selectItem = list.filter((item) => item.flag === true);
    const title = selectItem[0].listItem;

    if (title === "Songs") {
      setActiveItem({
        ...selectItem,
        src: "https://preview.redd.it/love-youtube-musics-home-screen-ui-it-really-is-superior-v0-j40ed9qkyim91.jpg?width=640&crop=smart&auto=webp&s=72c2cb56d714bb4733d2ebf1f45ba059e8029f0e",
      });
    }  else if (title === "Workout") {
      setActiveItem({
        ...selectItem,
        src: "https://www.abraxasnu.com/wp-content/uploads/2016/06/chest-workout-1000x600.jpg",
      });
    } else if (title === "Games") {
      setActiveItem({
        ...selectItem,
        src: "https://assets.mspimages.in/gear/wp-content/uploads/2023/01/actio-games.jpg",
      });
    } else if (title === "Playlist") {
      setActiveItem({
        ...selectItem,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2mV3Mf9LguXBduzV2RhUaExAxQbuUu5S0OXVepgg_Ft4U4jYbXmUsGcuG7OjFI1nWJno&usqp=CAU",
      });
    } else if (title === "Settings") {
      setActiveItem({
        ...selectItem,
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ic_settings_48px.svg/1200px-Ic_settings_48px.svg.png",
      });
    }

    visibility = false;
  };

  // handle menu button (it's uses for previous path)
  const handleMenu = () => {
    let sideMenu = document.getElementById("side-menu");
    if(visibility){
      sideMenu.classList.toggle('hide');
    }
    visibility = true;
    setActiveItem([]);
  };

  //Render Function
  return (
    <>
    <div className="App">
      {/* Display component */}
      <Display list={list} visibility={visibility} activeItem={activeItem}/>
      {/* Control Component */}
      <Controller handleSelect={handleSelect} handleMenu={handleMenu}/>
    </div>
    </>
  );
  
}

export default App;