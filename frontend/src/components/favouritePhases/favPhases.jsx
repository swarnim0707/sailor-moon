import'../layout/global.css'
import { useState, useEffect } from 'react'

function FavPhases() {

  const [favPhasesDates, setFavPhasesDates] = useState({});

  // This flag will change everytime the list is
  // edited causing the useEffect hook to run again
  const [saveChangesFlag, setSaveChangesFlag] = useState(0);
  const [favPhasesListState, setFavPhasesListState] = useState({});
  const [editMode, setEditMode] = useState(false);
  // To enable/disable the save button
  const [compareUnsavedList, setCompareUnsavedList] = useState({})
  const [latestSHA, setLatestSHA] = useState("");

  useEffect(() => {
    let favPhasesList = [];
    fetch("https://sailor-moon-backend.onrender.com/favPhases/readFavPhases")
    .then((response) => response.json())
    .then((data) => {
      setFavPhasesListState(data.data);
      setCompareUnsavedList(data.data);
      setLatestSHA(data.sha);
      favPhasesList = Object.keys(data.data).filter(phase => data.data[phase]);
      const baseUrl = "https://sailor-moon-backend.onrender.com/favPhases/favPhasesList";
      console.log(`Fetching API data with the following URL: ${baseUrl}`);
      fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({phasesList: favPhasesList}),
      })
      .then((response) => response.json())
      .then((data) => {
        setFavPhasesDates(data.dates);
        console.log(`Fetched data is ${JSON.stringify(data)}`);
      })
      })
    
    
  }, [saveChangesFlag]);

  // Toggle selection of phases in edit mode
  const togglePhase = (phase) => {
    setFavPhasesListState((prevState) => ({
      ...prevState,
      [phase]: !prevState[phase], // Toggle true/false
    }));
  };

  // Save edited favourite list

  function editFavList() {
    const baseUrl = "https://sailor-moon-backend.onrender.com/favPhases/editFavPhases";
    console.log(`Fetching API data with the following URL: ${baseUrl}`);
      fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({data: favPhasesListState, sha: latestSHA}),
      })
      .then((response) => response.json())
      .then((data) => {
        setSaveChangesFlag(saveChangesFlag + 1);
      })
  }

  return (
    <>
      {
        !editMode ? (
          <> 
            <button className="edit-button" onClick={() => {
              setEditMode(true)
            }}>
              <b>Edit your favourite phases!</b>
            </button>
            <h4 className="phase-list">
              <b>Here are your favourite phases and their upcoming dates!</b>
              <br/>
              <ul>
                {Object.entries(favPhasesDates).map(([phase, date]) => (
                  <li key={phase}>
                    <b><i>{phase}: {date}</i></b>
                </li>
                ))}
              </ul>
            </h4>
          </>
          
        ) : (
          <>
            <h4 className="phase-list static-flex">
              <b>Select your favourite moon phases!</b>
              <ul>
                  {Object.entries(favPhasesListState).map(([phase, selected]) => (
                    <li key={phase} className={selected ? "selected-phase" : "unselected-phase"} onClick={() => togglePhase(phase)}>
                      {phase}
                  </li>
                  ))}
                </ul>
            </h4>
            <div className="edit-buttons">
              <button onClick={() => setEditMode(false)}>
                <b>Back</b>
              </button>
              <button disabled={JSON.stringify(compareUnsavedList)===JSON.stringify(favPhasesListState)} onClick={() => {
                editFavList();
                setEditMode(false);
                setCompareUnsavedList(favPhasesListState)
                }}>
                <b>Save</b>
              </button>
            </div>
            
          </>
          
        )
      
      }
        
    </>
      
  )
}

export default FavPhases;