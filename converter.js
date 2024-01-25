

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");




for (let select of dropdowns) {
    for (curr_code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = curr_code;
        newOption.value = curr_code;
        if (select.name === "from" && curr_code === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && curr_code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target)
    })
}


const updateFlag = (element) => {

    let curr_code = element.value;
    let country_code = countryList[curr_code];
    let newSrc = `https://flagsapi.com/${country_code}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let amt = document.querySelector("form input");
    let amtVal = amt.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amt.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${rate * amtVal} ${toCurr.value}`


})