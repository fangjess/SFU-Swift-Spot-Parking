<script>
    // You can add any reactive data here
    let title = "SFU Parking Services";
    let entryfileds = "Please enter the following fields:";
    let licensePlate = "";
    let lot = "";
    let startTime = "";
    let endTime = "";
    let lotFullness = "";
    let typeParking = "";
    let submittedPlate = "";
    let submittedLot = "";
    let submittedstartTime = "";
    let submittedendTime = "";
    let submittedlotFullness = "";
    let submittedtypeParking = "";
    let lots = {
        North: { ratings: [], mode: null },
        East: { ratings: [], mode: null },
        West: { ratings: [], mode: null },
        South: { ratings: [], mode: null}
    };

    // Function to handle new ratings for the selected lot
    function submitRating() {
        lots[submittedLot].ratings.push(submittedlotFullness);
        calculateMode(submittedLot);
    }

    // Function to calculate the mode for a specific lot
    function calculateMode(lot) {
        const ratings = lots[lot].ratings;
        if (ratings.length === 0) {
            lots[lot].mode = null;
            return;
        }

        let frequency = {};
        let maxCount = 0;
        let mode = null;

        // Calculate frequency and find the mode for the selected lot
        ratings.forEach((value) => {
            frequency[value] = (frequency[value] || 0) + 1;
            if (frequency[value] > maxCount) {
                maxCount = frequency[value];
                mode = value;
            }
        });

        lots[lot].mode = mode;
    }

    const handleSubmit = () => {
    submittedPlate = licensePlate; // Store the entered license plate
    submittedLot = lot; 
    submittedstartTime = startTime;
    submittedendTime = endTime;
    submittedlotFullness = lotFullness;
    submittedtypeParking = typeParking;
    //alert(`License Plate Submitted: ${submittedPlate, submittedLot}`);
    submitRating();
    };

  </script>
  
  <style>
    /* Add some basic styling */
    main {
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 8rem;
      text-align: center;
    }
  
    header {
      background-color: #CC0633 ;
      color: white;
      padding: 1rem;
      text-align: center;
    }

    button {
    padding: 0.1rem 1rem;
    font-size: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    }

    button:hover {
    background-color: #45a049;
    }
  
    footer {
      background-color: #CC0633 ;
      color: white;
      text-align: center;
      padding: 1rem;
      bottom: 0;
      width: 90%;
    }
  </style>
  
  <!-- Structure of the page -->
  <header>
    <h1>{title}</h1>
  </header>
  
  
  <main>
    <h3>Current Lot Fullness</h3>
      <p>North: {lots.North.mode !== null ? lots.North.mode : 'No data yet'}</p>
      <p>East: {lots.East.mode !== null ? lots.East.mode : 'No data yet'}</p>
      <p>West: {lots.West.mode !== null ? lots.West.mode : 'No data yet'}</p>
      <p>South: {lots.South.mode !== null ? lots.South.mode : 'No data yet'}</p>
    <p>{entryfileds}</p>
    <div>
        <label 
        for="lot">Parking lot:
        </label>
        <select name="lot" id="lot" bind:value={lot} >
          <option value="North">North Lot</option>
          <option value="East">East Lot</option>
          <option value="South">South Lot</option>
          <option value="West">West Parkade</option>
        </select>
        <label 
        for="start">Start time:
        </label>
        <input 
        type="time" 
        id="start" 
        name="start"
        bind:value={startTime}
        />
        <label 
        for="start">End time:
       </label>
        <input 
        type="time" 
        id="end" 
        name="end"
        bind:value={endTime}
        />
        <label 
        for="fullness">Lot fullness:
       </label>
        <select name="fullness" id="fullness" bind:value={lotFullness}>
          <option value="1">1 - Empty</option>
          <option value="2">2 - Partially Empty</option>
          <option value="3">3 - Half Full</option>
          <option value="4">4 - Partially Full</option>
          <option value="5">5 - Full</option>
        </select>

        <button on:click={handleSubmit}>Submit</button>
    </div>
    
    
    
    {#if submittedLot, submittedstartTime, submittedendTime, submittedlotFullness}
    <p>Your lot: {submittedLot}</p>
    <p>Your start time: {submittedstartTime}</p>
    <p>Your end time: {submittedendTime}</p>
    <p>Your lot fullness: {submittedlotFullness}</p>
    {/if}
    
  </main>
  
  <footer>
    <p>&copy; 2024 Your Name. All rights reserved.</p>
  </footer>
  