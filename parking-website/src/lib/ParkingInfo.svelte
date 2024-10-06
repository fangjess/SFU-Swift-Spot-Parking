<script lang="ts">
    import type { ParkingLot } from "./types";

    export let parking: ParkingLot;

    const fullnessToString = ["Empty", "Partially empty", "Hlaf full", "Almost full", "Full"];

    function getParkingStatus(fullness: number[]){
        let maxIndex = 0;
        let maxval = 0;
        for(let i =0; i < fullness.length; i++ ){
            if(fullness[i] > maxval){
                maxval = fullness[i];
                maxIndex = i;
            }
        }
        return fullnessToString[maxIndex];
    }

</script>


<div class="parkingLot">
    <p id="name">{parking.name}: </p>
    <p>Description: {parking.description}</p>
    <p id="fullness">Fullness: {getParkingStatus(parking.fullness)}</p>
    <p id="capacity">Capacity: {parking.current}/{parking.total}</p>
</div>



<style>
    #name {
        font-weight: bold;
    }
    .parkingLot {
        max-width: 400px;
        width: fit-content;
        padding: 1rem;
        border: red 2px solid;
        border-radius: 0.5rem;
        margin: 0.5rem;
    }
</style>