const countryOptionListA = document.getElementById("countryListA");
const countryOptionListB = document.getElementById("countryListB");
const myFormA = document.getElementById("myFormA");
const myFormB = document.getElementById("myFormB");
const date = "Date: " ;
const noDataFound= "No data found for this input";
const totalConfiremd = "Total confirmed: ";
const totalDeath = "Total death: ";
const totalRecoverd = "Total recoverd: ";
const nrCovidDeaths = "# of Covid19 deaths";
const nrCovidCases = "# of Covid19 comfirmed cases";
const arrayLabelPie= ["recovered", "deaths"];
const covid19 = "Covid19";
const line ="line";
const pie = "pie";
// Get the element with id="defaultOpen" and click on it
const b1 = document.getElementById("defaultOpenA");
const b2 = document.getElementById("defaultOpenB");
//Kan veranderen
let countryA;
let countryB;
//Indien je een chart uit chart.js wilt hergebruiken moet de deze globaal verwijderen en opnieuw aanmaken.
let c1A;
let c2A;
let c3A;
let c1B;
let c2B;
let c3B;

//Setup Van de app
b1.click();
b2.click();
loadGlobalData();
createCountryOptions();

//-----------------------------------------------------------------
//addEventListeners
countryListA.addEventListener("click", function (e) {
    document.getElementById("countryA").value = countryListA.value;
});

countryListB.addEventListener("click", function (e) {
    document.getElementById("countryB").value = countryListB.value;
});
//Country A
myFormA.addEventListener("submit", function (e) {
    countryA = document.getElementById("countryA").value
    let errorMessage = document.getElementById("errorMessageA");
    let c_date = document.getElementById("c_dateA");
    let c_totalConfirmed = document.getElementById("c_totalConfirmedA");
    let c_totalDeaths = document.getElementById("c_totalDeathsA");
    let c_recoverd = document.getElementById("c_recoverdA");
    e.preventDefault();
    let countryURL = "https://api.covid19api.com/total/dayone/country/" + countryA.toLowerCase();
    fetch(countryURL)
        .then((res) => res.json())
        .then((res) => {
            let lenght = res.length;
            let index = lenght - 1;
            let c_Confirmed = parseInt(res[index].Confirmed);
            let c_Deaths = parseInt(res[index].Deaths);
            errorMessage.innerText = "";
            c_date.innerText = date + res[index].Date.substring(0, 10);
            c_totalConfirmed.innerText = totalConfiremd + c_Confirmed.toLocaleString('nl-NL');
            c_totalDeaths.innerText = totalDeath + c_Deaths.toLocaleString('nl-NL');
            c_recoverd.innerText = totalRecoverd + (c_Confirmed - c_Deaths).toLocaleString('nl-NL');
            let arrayLabels = [];
            let arrayDataDeaths = [];
            let arrayDataConfirmed = [];

            for (let i = 0; i < lenght; i++) {
                arrayLabels.push(res[i].Date.substring(0, 10));
                arrayDataDeaths.push(parseInt(res[i].Deaths));
                arrayDataConfirmed.push(parseInt(res[i].Confirmed));
            }
            if (c1A) c1A.destroy();
            c1A = createChartObjById("myChart1A", line, arrayLabels, arrayDataDeaths, ["rgba(255, 99, 132)"], nrCovidDeaths);
            if (c2A) c2A.destroy();
            c2A = createChartObjById("myChart2A", line, arrayLabels, arrayDataConfirmed, ["rgba(255, 99, 132)"], nrCovidCases);
            if (c3A) c3A.destroy();
            c3A = createChartObjById("myChart3A", pie, arrayLabelPie, [(c_Confirmed - c_Deaths), c_Deaths], ["rgb(0,255,0)", "rgb(255, 0, 0)"], covid19);

        })
        .catch(function (error) {
            errorMessage.innerText = noDataFound;
            c_date.innerText = "";
            c_totalConfirmed.innerText = "";
            c_totalDeaths.innerText = "";
            c_recoverd.innerText = "";
            c1A.destroy();
            c2A.destroy();
            c3A.destroy();
        });
});

//Country B
myFormB.addEventListener("submit", function (e) {
    countryB = document.getElementById("countryB").value
    let errorMessage = document.getElementById("errorMessageB");
    let c_date = document.getElementById("c_dateB");
    let c_totalConfirmed = document.getElementById("c_totalConfirmedB");
    let c_totalDeaths = document.getElementById("c_totalDeathsB");
    let c_recoverd = document.getElementById("c_recoverdB");
    e.preventDefault();
    let countryURL = "https://api.covid19api.com/total/dayone/country/" + countryB.toLowerCase();
    fetch(countryURL)
        .then((res) => res.json())
        .then((res) => {
            let lenght = res.length;
            let index = lenght - 1;
            let c_Confirmed = parseInt(res[index].Confirmed);
            let c_Deaths = parseInt(res[index].Deaths);
            errorMessage.innerText = "";
            c_date.innerText = date + res[index].Date.substring(0, 10);
            c_totalConfirmed.innerText = totalConfiremd + c_Confirmed.toLocaleString('nl-NL');
            c_totalDeaths.innerText = totalDeath + c_Deaths.toLocaleString('nl-NL');
            c_recoverd.innerText = totalRecoverd + (c_Confirmed - c_Deaths).toLocaleString('nl-NL');
            let arrayLabels = [];
            let arrayDataDeaths = [];
            let arrayDataConfirmed = [];

            for (let i = 0; i < lenght; i++) {
                arrayLabels.push(res[i].Date.substring(0, 10));
                arrayDataDeaths.push(parseInt(res[i].Deaths));
                arrayDataConfirmed.push(parseInt(res[i].Confirmed));
            }
            if (c1B) c1B.destroy();
            c1B = createChartObjById("myChart1B", line, arrayLabels, arrayDataDeaths, ["rgba(255, 99, 132)"], nrCovidDeaths);
            if (c2B) c2B.destroy();
            c2B = createChartObjById("myChart2B", line, arrayLabels, arrayDataConfirmed, ["rgba(255, 99, 132)"], nrCovidCases);
            if (c3B) c3B.destroy();
            c3B = createChartObjById("myChart3B", pie, arrayLabelPie, [(c_Confirmed - c_Deaths), c_Deaths], ["rgb(0,255,0)", "rgb(255, 0, 0)"], covid19);
        })
        .catch(function (error) {
            errorMessageB.innerText = noDataFound;
            c_date.innerText = "";
            c_totalConfirmed.innerText = "";
            c_totalDeath.innerText = "";
            c_recoverd.innerText = "";
            c1B.destroy();
            c2B.destroy();
            c3B.destroy();
        });
});

//-------------------------------------------------------------------------------

//app functies
function loadGlobalData() {
    fetch("https://api.covid19api.com/summary", { method: 'GET' }).then(async function (response) {
        const obj = await response.json();
        return obj;
    }).then(function (obj) {

        //KPI
        const global = obj.Global;
        document.getElementById("date").innerText = "Date: " + global.Date.substring(0, 10);
        document.getElementById("newConfirmed").innerText = "New confirmed today: " + global.NewConfirmed.toLocaleString('nl-NL');;
        document.getElementById("newDeaths").innerText = "New deaths today: " + global.NewDeaths.toLocaleString('nl-NL');;
        let totalConfirmed = parseInt(global.TotalConfirmed);
        let totalDeaths = parseInt(global.TotalDeaths);
        document.getElementById("totalConfirmed").innerText = totalConfiremd + totalConfirmed.toLocaleString('nl-NL');
        document.getElementById("totalDeaths").innerText = totalDeath+ totalDeaths.toLocaleString('nl-NL');
        document.getElementById("totalRecoverd").innerText = totalRecoverd + (totalConfirmed - totalDeaths).toLocaleString('nl-NL');

        //Global Country Chart
        let arrayCountryLabel = [];
        let arrayCountyTotalDeaths = [];
        for (c in obj.Countries) {
            arrayCountryLabel.push(obj.Countries[c].Country);
            arrayCountyTotalDeaths.push(((obj.Countries[c].TotalDeaths / obj.Countries[c].TotalConfirmed)*100).toFixed(2));
        }
        createChartObjById("globalChart", "bar", arrayCountryLabel, arrayCountyTotalDeaths, ["rgba(255, 99, 132)"], "% of Covid19 deaths");

    }).catch(function (error) {
        console.log(error);
    });
}

function createChartObjById(chartId, chartType, arrayLabels, arrayData, backgroundColor, label) {
    let canvas = document.getElementById(chartId);
    chartObj = new Chart(canvas, {
        type: chartType,
        data: {
            labels: arrayLabels,
            datasets: [{
                label: label,
                data: arrayData,
                backgroundColor: backgroundColor,
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delay) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            }
        },
        options:{
            locale: "nl-NL"
        }
    })
    return chartObj;
}

function createCountryOptions() {
    let countryListAURL = "https://api.covid19api.com/countries";
    let countryList = [];
    fetch(countryListAURL)
        .then((res) => res.json())
        .then((res) => {
            let lenght = res.length;
            for (let i = 0; i < lenght; i++) {
                let c = res[i].Country;
                countryList.push(c);
            }
            countryList.sort();
            for (let i = 0; i < countryList.length; i++) {
                let c = countryList[i];
                let option = new Option(c, c);
                countryOptionListA.appendChild(option);
            }
            for (let i = 0; i < countryList.length; i++) {
                let c = countryList[i];
                let option = new Option(c, c);
                countryOptionListB.appendChild(option);
            }
        })
        .catch((error) => console.log(error));
}

function openPage(pageName, elmnt, color, group) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].id.slice(-1) === group) tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        if (tabcontent[i].id.slice(-1) === group) tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}
