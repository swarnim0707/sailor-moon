// import { useState, useEffect, useRef } from 'react';
// import moonLogo from '/src/assets/circular_moon_logo.png';
import { useEffect, useState } from 'react';
import'../layout/global.css'
import LunarPhase from './lunarPhase.jsx'

function Home() {
  const [greeting, setGreeting] = useState("");
  const [pictureLink, setPictureLink] = useState("")

  function updateGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }

  // useEffect(() => {
  //   const date = new Date();
  //   const year = date.getFullYear().toString();
  //   // Using NASA image API to get a picture of the moon
  //   const baseURL = `https://images-api.nasa.gov/search?q=moon&page=1&media_type=image&year_start=${year}&year_end=${year}`;
  //   fetch(baseURL)
  //   .then((response) => response.json())
  //   .then((favPhases) => {
  //     const pictures = favPhases.collection.items;
  //     // Taking a random picture from the list of pictures
  //     const pictureIndex = Math.floor(Math.random() * pictures.length);
  //     const link = pictures[pictureIndex].links[1].href;
  //     setPictureLink(link);
  //   })
  // }, [])

  useEffect(() => {
    const applicationId = '36aec70e-61fc-4f83-ae68-f0693717947d';
    const applicationSecret = '426922963364a0bce50e2f03923de6161f695ae4fc5f56d994aaa0506519c22fc0455d5979abb4b2736844190a276d149076c493d5495fc66993c514a2a04a30db054059d3884ce3424576cdb489f4f4309a45209332c8935ffd19bee739d947d416eb3986daf8de3261b892e4f5c55c';
    const authString = btoa(`${applicationId}:${applicationSecret}`);
    const baseURL = "https://api.astronomyapi.com/api/v2/studio/moon-phase";
    const today = new Date();
    fetch(baseURL, {
      method: "POST",
      headers: { "Authorization": `Basic ${authString}` },
      body: JSON.stringify(
        {
          "format": "png",
          "style": {
              "moonStyle": "default",
              "backgroundStyle": "stars",
              "backgroundColor": "red",
              "headingColor": "white",
              "textColor": "white"
          },
          "observer": {
              "latitude": 18.5204,
              "longitude": 73.8567,
              "date": today.toISOString().split("T")[0]
          },
          "view": {
              "type": "portrait-simple",
              "orientation": "north-up"
          }
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      setPictureLink(data.data.imageUrl);
      console.log(pictureLink);
    })
  })

  useEffect(() => {
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every 60 seconds
    return () => clearInterval(interval); // Cleanup when component unmounts
  }, [])

  return (
    <>
      <h4 className="greeting-text">
        <b><i>{greeting}, Shravani!<br />Today is <LunarPhase/> phase</i></b>
      </h4>
      <br/>
      <br/>
      <button onClick={() => window.open(pictureLink, "_blank")}>
        <b>Here's today's moon pic!
          <br/>
          (plis clickity click!)
        </b>
      </button>
    </>
    
      
  )
}

export default Home;
