const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container');
const countryDetails = document.getElementById('country-details');
const spinner = document.getElementById('spinner')
const errorDiv = document.getElementById('error');

searchBtn.addEventListener('click', function () {
    const search = searchInput.value;
    if (search === '') {
        errorDiv.innerText = "Search field cannot be empty";
        return;
    }
    // clear dom
    countryContainer.innerHTML = '';
    countryDetails.innerHTML = '';

    // console.log(search);
    const url = 'https://restcountries.eu/rest/v2/name/' + search
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data))
        .finally(() => searchInput.value === "");

});

function showData(countryArray) {
    {
        if (countryArray.status === 404) {
            errorDiv.innerText = 'No Result Found';
        } else {
            errorDiv.innerText = '';
        }
        // console.log(data);
        countryArray.forEach(item => {
            console.log(item.name);
            const div = document.createElement('div')
            div.classList.add('col-md-3')
            div.innerHTML = `

            <div class="rounded overflow-hidden border p-2">
            <img
              src="${item.flag}"
              class="w-100"
              alt=""
            />
          </div>
          <!-- Body -->
          <div
            class="
              py-2
              d-flex
              justify-content-between
              align-items-center
              d-md-block
              text-md-center
            "
          >
            <h1>${item.name}</h1>
            <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
          </div>

            `
            countryContainer.appendChild(div);
        })
    }
}



function showDetails(alpha3Code) {
    fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
        .then(res => res.json())
        .then(data => {
            countryDetails.innerHTML = `
            <div class="col-md-12">
                <h1>${data.name}</h1>
                <p>Capital:${data.capital}</p>
                <p>${data.currencies[0].name}</p>
            </div>
            `
        });
}







// data = Object
// data.currencies = Array
// data.currencies[0] = Object
// data.currencies[0].name