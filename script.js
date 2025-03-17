// // http://api.weatherapi.com/v1/current.json?key=0977526d30e34b5a911124301251603&q=Mumbai&aqi=no


// const temperatureField =document.querySelector(".temp");
// const locationField =document.querySelector(".time_location p");
// const dateandTimeField =document.querySelector(".time_location ");
// const conditionField =document.querySelector(".condition p");
// const searchField =document.querySelector(".search_area");
// const form = document.querySelector("form")


// form.addEventListener('submit',searchForLocation)


// let target = 'Lucknow'
// const fetchResults = async (targetLocation) => {
//     let url = `http://api.weatherapi.com/v1/current.json?key=0977526d30e34b5a911124301251603&q=${targetLocation}&aqi=no`
//     const res = await fetch(url)
//     const data = await res.json()

//     console.log(data)

//     let locationName = data.location.name
//     let time = data.location.localtime

//     let temp = data.current.temp_c

//     let condition = data.current.condition

//     updateDetails(temp,locationName,time,condition)
// }

// function updateDetails(temp,locationName,time,condition){
//     temperatureField.innerText = temp
//     locationField.innerText = locationName
//     dateandTimeField.innerText = time
//     conditionField.innerText = condition.text

// }


// function searchForLocation(e) {
//     e.preventDefault()

//     target = searchField.value

//     fetchResults(target)

// }
// fetchResults(target)

const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelectorAll(".time_location p")[1];
const conditionField = document.querySelectorAll(".condition p")[1];
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form"); // Fixed selector

form.addEventListener('submit', searchForLocation);

let target = 'Lucknow';

const fetchResults = async (targetLocation) => {
    try {
        let url = `http://api.weatherapi.com/v1/current.json?key=0977526d30e34b5a911124301251603&q=${targetLocation}&aqi=no`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        console.log(data);

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

function updateDetails(temp, locationName, time, condition) {
    let [splitDate, splitTime] = time.split(' '); // Correctly splits date and time
    let currentDay = getDayName(new Date(splitDate).getDay()); // Ensures proper day retrieval

    temperatureField.innerText = temp + "°C"; // Adding unit
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${currentDay}, ${splitDate} - ${splitTime}`; // Correct format
    conditionField.innerText = condition.text;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

// Initial fetch
fetchResults(target);

function getDayName(number) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[number]; // Simplified day retrieval
}
