const results = document.getElementById("results")

let myWatchList = JSON.parse(localStorage.getItem("myWatchList"))

function onClicked(Id) {
    if (myWatchList.includes(Id)) {
        myWatchList = myWatchList.filter((item) => item !== Id )
    }
    
    getMovielist()
    localStorage.setItem("myWatchList", JSON.stringify(myWatchList))
}

async function postData(imdbID) {
    const resp = await fetch(`https://www.omdbapi.com/?apikey=19e68f4b&i=${imdbID}`)
    const data = await resp.json()
    
    results.innerHTML = `
            <div class="post">    
                <img class="result-image" src="${data.Poster !== "N/A" ? data.Poster : "./img/Icon.svg"}" />
                <div class="text">
                    <div class="heading">
                        <h2 class="title">${data.Title}</h2>
                        <img class="star" src="./img/Star.svg" />
                        <p class="rating">${data.imdbRating}</p>
                    </div>
                    <div class="info">
                        <p class="runtime">${data.Runtime}</p>
                        <p class="genre">${data.Genre}</p>
                        <p class="watchlist" onClick="onClicked('${data.imdbID}')" ><img class="pluss" src="./img/Minus-icon.svg" />Watchlist</p>
                    </div>
                    <div class="plot">
                        <p>${data.Plot}
                    </div>
                </div>
            </div>
            ${results.innerHTML}
        `
}

function getMovielist() {
    
    if (myWatchList.length === 0) {
        results.innerHTML = '<h3 class="empty-list">Your watchlist is looking a little empty...</h3>'
    } else {
        results.innerHTML = ""
    
        for (let i=0; i<myWatchList.length; i++) {
                postData(myWatchList[i])
        }
    }
}

getMovielist()