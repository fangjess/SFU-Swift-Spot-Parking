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

    const handleSubmit = () => {
    submittedPlate = licensePlate; // Store the entered license plate
    submittedLot = lot; 
    submittedstartTime = startTime;
    submittedendTime = endTime;
    submittedlotFullness = lotFullness;
    submittedtypeParking = typeParking;
    //alert(`License Plate Submitted: ${submittedPlate, submittedLot}`);
    };

  </script>
  
  <style>
    /* Add some basic styling */
    body {
      font-family: 'Times New Roman', Times, serif, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
  
    header {
      background-color: #CC0633 ;
      color: white;
      padding: 1rem;
      text-align: center;
    }
  
    main {
      padding: 8rem;
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
    <p>{entryfileds}</p>
    <div>
        <input
          type="text" 
          placeholder="License Plate" 
          bind:value={licensePlate} 
        />
        <input
        type="text" 
        placeholder="Lot" 
        bind:value={lot} 
        />
        <input
        type="text" 
        placeholder="Start Time" 
        bind:value={startTime} 
        />
        <input
        type="text" 
        placeholder="End Time" 
        bind:value={endTime} 
        />
        <input
        type="text" 
        placeholder="Lot Fullness" 
        bind:value={lotFullness} 
        />
        <input
        type="text" 
        placeholder="Parking Type" 
        bind:value={typeParking} 
        />

        <button on:click={handleSubmit}>Submit</button>
    </div>
    
    
    {#if submittedPlate, submittedLot, submittedstartTime, submittedendTime, submittedlotFullness, submittedtypeParking}
    <p>Your license plate: {submittedPlate}</p>
    <p>Your lot: {submittedLot}</p>
    <p>Your start time: {submittedstartTime}</p>
    <p>Your end time: {submittedendTime}</p>
    <p>Your lot fullness: {submittedlotFullness}</p>
    <p>Your type parking: {submittedtypeParking}</p>
    {/if}
    
  </main>
  
  <footer>
    <p>&copy; 2024 Your Name. All rights reserved.</p>
  </footer>
  