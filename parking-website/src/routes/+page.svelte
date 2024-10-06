<script lang="ts">
    import {
        addParkingRecord,
        getAllParking,
        newAPrkingLot,
        onParkingLotChange,
        removeParkingRecord,
        reportFullness,
    } from "$lib/firebase";
    import ParkingInfo from "$lib/ParkingInfo.svelte";
    import type { ParkingLot } from "$lib/types";
    import { initializeApp } from "firebase/app";
    import { onMount } from "svelte";

    // You can add any reactive data here
    let title = "SFU Swift Spot";
    let selectedLotForReporting = "";
    let lotFullness = 0;

    let userName = "Default";
    let selectedLotForSignup = "";
    let startTime = "";
    let endTime = "";

    const parkingName = ["North Lot", "East Lot", "South Lot", "West Parkade"];

    let parkingLots: ParkingLot[] = [];
    onMount(async () => {
        // runs wwhen the page loads
        onParkingLotChange((newLots) => {
            parkingLots = newLots;
        });

        // load reminder time if tthere is one
        if (localStorage.getItem("startTime")){
            startingTime = new Date( Date.parse(localStorage.getItem("startTime")!))
            
        }

        if (localStorage.getItem("reminderTime")){
            reminderTime = parseInt(localStorage.getItem("reminderTime")!)
        }
    });

    let inputTime = 0;
    let reminderTime = 0;
    let startingTime = new Date()
    function saveReminderTime(){
        reminderTime = inputTime;
        startingTime = new Date();
        //@ts-ignore
        localStorage.setItem("startTime", startingTime);
        localStorage.setItem("reminderTime", ""+reminderTime)
    }
</script>

<header>
    <h1>{title}</h1>
</header>

<main class="hor" style="gap:3rem; justify-content:center">
    <form
        on:submit={() => {
            if (!(selectedLotForReporting && lotFullness)) {
                return;
            }
            reportFullness(selectedLotForReporting, lotFullness);
        }}
    >
        <p>Please enter the following fields:</p>
        <label for="lot">Parking lot: </label>
        <select name="lot" id="lot" bind:value={selectedLotForReporting}>
            <option value="North Lot">North Lot</option>
            <option value="East Lot">East Lot</option>
            <option value="South Lot">South Lot</option>
            <option value="West Parkade">West Parkade</option>
        </select>

        <label for="fullness">Lot fullness: </label>

        <select name="fullness" id="fullness" bind:value={lotFullness}>
            <option value="0">Empty</option>
            <option value="1">Partially Empty</option>
            <option value="2">Half Full</option>
            <option value="3">Almost Full</option>
            <option value="4">Full</option>
        </select>
        <input type="submit" value="Submit" />
    </form>

    <form>
        Sign in to parking lot
        <div class="hor">
            <span>Username</span><input type="text" bind:value={userName} />
        </div>
        <div class="hor">
            <span>Parking Lot:</span>
            <select name="lot" id="lot" bind:value={selectedLotForSignup}>
                <option value="North Lot">North Lot</option>
                <option value="East Lot">East Lot</option>
                <option value="South Lot">South Lot</option>
                <option value="West Parkade">West Parkade</option>
            </select>
        </div>

        <div class="hor">
           <span>Reminder:</span> <input type="number" bind:value={inputTime}>
        </div>
 

        <div class="hor" style="gap:1rem">
            <button on:click={()=>{
                saveReminderTime()
                addParkingRecord(selectedLotForSignup, userName)
            }}>Sign In</button>
            <button style="background-color: #cc0633;" on:click={()=>{
                reminderTime = 0;
                removeParkingRecord(selectedLotForSignup, userName);
                console.log(startTime);
            }}>Sign Out</button>
        </div>
       {#if reminderTime >0}
       <p>Reminder: Your parking expires in { Math.round(reminderTime- ((new Date() ).getTime() - startingTime.getTime()) / (3600000))} hours.</p>
       {/if}
    </form>
</main>

<div class="hor">
    
{#each parkingLots as parking (parking.name)}
<ParkingInfo {parking}></ParkingInfo>
{/each}

</div>
<!-- <button on:click={()=>{
    parkingName.forEach(item=>newAPrkingLot(item))
}}>asdsadas</button> -->

<footer>
    <p>&copy; 2024 Jessica Emily Gursimrit Paria. All rights reserved.</p>
</footer>

<style>
    .hor {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;

        justify-content: left;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        max-width: 200px;
    }
    /* Add some basic styling */
    body {
      font-family: 'Times New Roman', Times, serif, sans-serif;
      background-color: #f9f9f9;
      background-image: url('img_girl.jpg');
      margin: 0;
      padding: 0;
    }

    header {
        background-color: #cc0633;
        color: white;
        padding: 1rem;
        text-align: center;
    }

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

    button,
    input[type="submit"] {
        padding: 0.1rem 1rem;
        font-size: 1rem;
        background-color: #4caf50;
        color: white;
        border: none;
        cursor: pointer;
        transition: transform 0.4s ease-out;
    }

    button,
    input[type="submit"]:hover {
        transform: scale(1.1);
    }

    footer {
      background-color: #CC0633 ;
      color: white;
      text-align: center;
      padding: 1rem;
      bottom: 0;
      width: 100%;
    }
</style>
