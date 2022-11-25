let dataManga, url, total = 6, offset = 0, search="";
let testing = document.getElementById("testing");

url = urlData(offset)
getData(url);


function getValue() {
    total = document.getElementById("number").value;
    console.log(total)
    url = urlData(offset, total, search)
    getData(url);
    return total;
}

function searchMangaByTitle(){
    search = document.getElementById("search").value;
    offset=0;
    url = urlData(offset, total, search);
    getData(url);
    console.log(search);
}

function prev() {
    offset -= Number(total);
    url = urlData(offset, total, search)
    getData(url);
    // console.log(offset)
    return url;

}

function next() {
    offset += Number(total);
    url = urlData(offset, total, search)
    getData(url);
    // console.log(offset)
    return url;
}

function urlData(offset = 1, limit = 6, search="") {
    url = `https://api.mangadex.org/manga?offset=${offset}&limit=${limit}&includes[]=cover_art&contentRating[]=safe&title=${search}`;
    return url;
}

function potong(str, jumlahKata) {
    return str.split(" ").splice(0, jumlahKata).join(" ");
}



async function getData(url) {
    await fetch(url)
        .then((res) => { return res.json() })
        .then((data) => { dataManga = data })


    let n = '';
    for (let i = 0; i < dataManga.data.length; i++) {
        let title = dataManga.data[i].attributes.title.en;
        if (Object.keys(dataManga.data[i].attributes.description).length != 0) {
            description = dataManga.data[i].attributes.description.en
            if(!description){
                description = "No Description"
            }
        } else {
            description = "No Description"
        }
        for (let j = 0; j < dataManga.data[i].relationships.length; j++) {
            if (dataManga.data[i].relationships[j].type == 'cover_art') {
                let urlm = "https://uploads.mangadex.org/covers/" + dataManga.data[i].id + "/" + dataManga.data[i].relationships[j].attributes.fileName;
                n += `<div class="card">
                                <h3 class="manga-title">${title}</h3>
                                    <div class="card-body">
                                    <img src="${urlm}" alt="${title}">
                                    <p class="desc"> ${ desc = (!description) ? description: potong(description, 15)} ...</p>
                                    </div>
                              </div>`
            }
        }
    }
    testing.innerHTML = n;
}



