console.log('Client side javascript is loaded!');

// fetch('http://localhost:3000/weather?address=san%20francisco').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         }
//         else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    messageOne.style.color = '#184875';
    messageOne.style.fontWeight = 'normal';
    messageOne.textContent = 'Getting the weather...';
    messageTwo.textContent = '';
    
    fetch(`/weather?address=${ search.value }`)
    .then((response) => {
        console.log(response);
        response.json().then((data) => {
            if (data.error) {
                messageOne.style.color = 'red';
                messageOne.textContent = data.error;
            }
            else {
                messageOne.style.color = '#03be03';
                messageOne.style.fontWeight = 'bold';
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});