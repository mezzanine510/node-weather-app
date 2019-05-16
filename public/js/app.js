console.log('Client side javascript is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');


const searchStatus = document.getElementById('search-status');
const temperature = document.getElementById('temperature');
const tempLocation = document.getElementById('temperature-location');
const tempSummary = document.getElementById('temperature-summary');

weatherForm.addEventListener('submit', (error)=> {
    error.preventDefault();

    searchStatus.style.opacity = '1';
    searchStatus.style.color = '#03be03';
    temperature.style.opacity = '0';
    tempLocation.style.opacity = '0';
    tempSummary.style.opacity = '0';

    searchStatus.textContent = 'Getting the weather...';
    
    fetch(`/weather?address=${ search.value }`)
    .then((response) => {
        response.json().then((data) => {
            console.log('data: ', data);
            if (data.error) {
                searchStatus.textContent = data.error;
                searchStatus.style.color = 'red';
            }
            else {
                // searchStatus.textContent = 'Location found!';

                temperature.textContent = `${ data.temperature }°`;
                tempLocation.textContent = data.location;
                tempSummary.textContent = data.summary;
                
                searchStatus.style.opacity = '0';
                temperature.style.opacity = '1';
                tempLocation.style.opacity = '1';
                tempLocation.style.color = '#03be03';
                tempSummary.style.opacity = '1';
            }
        });
    });
});