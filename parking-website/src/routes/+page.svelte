<script lang="ts">
    import { getAllParking } from "$lib/firebase";
    import ParkingInfo from "$lib/ParkingInfo.svelte";
    import type { ParkingLot } from "$lib/types";
    import { onMount } from "svelte";

    // You can add any reactive data here
    let title = "SFU Parking Services";
    let licensePlate = "";
    let lot = "";
    let startTime = "";
    let endTime = "";
    let lotFullness = "";
    let typeParking = "";

    let submittedLot = "";

    let submittedlotFullness = "";


    const parkingName = ["North Lot", "East Lot", "South Lot", "West Parkade"];

    let parkingLots : ParkingLot[] = [];
    onMount(async ()=>{
       // runs wwhen the page loads
       parkingLots = await getAllParking()   ;
    })

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
        if (mode == 1) {
            mode = "Empty";
        } else if (mode == 2) {
            mode = "Partially Empty";
        } else if (mode == 3) {
            mode = "Half Full";
        } else if (mode == 4) {
            mode = "Partially Full";
        } else {
            mode = "Full";
        }
        lots[lot].mode = mode;
    }

    const handleSubmit = () => {
      
    
    };

</script>


<header>
    <h1>{title}</h1>
</header>

<main>
 
    <form >
        <p>Please enter the following fields:</p>
        <label for="lot">Parking lot: </label>
        <select name="lot" id="lot" bind:value={lot}>
            <option value="North">North Lot</option>
            <option value="East">East Lot</option>
            <option value="South">South Lot</option>
            <option value="West">West Parkade</option>
        </select>
        <label for="start">Start time: </label>
        <input type="time" id="start" name="start" bind:value={startTime} />
        <label for="start">End time: </label>

        <input type="time" id="end" name="end" bind:value={endTime} />

        <label for="fullness">Lot fullness: </label>


        <select name="fullness" id="fullness" bind:value={lotFullness}>
            <option value="1">1 - Empty</option>
            <option value="2">2 - Partially Empty</option>
            <option value="3">3 - Half Full</option>
            <option value="4">4 - Partially Full</option>
            <option value="5">5 - Full</option>
        </select>
<input type="button" value="Submit">

    </form>

   
</main>

{#each parkingLots as parking (parking.name) }
    <ParkingInfo {parking}></ParkingInfo>
{/each}

<footer>
    <p>&copy; 2024 Jessica Emily Gursimrit Paria. All rights reserved.</p>
</footer>



<style>

    form {
        display:flex;
        flex-direction: column;
        gap:0.25rem;

        max-width: 200px;
    }
    /* Add some basic styling */
    main {
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 2rem;
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    header {
        background-color: #cc0633;
        color: white;
        padding: 1rem;
        text-align: center;
    }

    input[type=button] {
        padding: 0.1rem 1rem;
        font-size: 1rem;
        background-color: #4caf50;
        color: white;
        border: none;
        cursor: pointer;
        transition: transform 0.4s ease-out;
    }

    input[type=button]:hover {
        background-color: #45a049;
        transform: scale(1.1);
    }

    footer {
        background-color: #cc0633;
        color: white;
        text-align: center;
        padding: 1rem;
        bottom: 0;
        width: 100%;
    }
</style>
