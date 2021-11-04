
const url = "https://cuaca-gempa-rest-api.vercel.app";
const gempa = "quake";
const cuaca ="weather";
const NTB = "jawa-timur"
const DataCuaca = `${url}/${cuaca}`;
const DataCuacaNTB = `${url}/${cuaca}/${NTB}`;
const DataGempa = `${url}/${gempa}`;
const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

function getKoordinat(){
    title.innerHTML = "Info Koordinat Daerah Jawa Timur";
    fetch(DataCuacaNTB)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data.areas);
            let matchs ="";
            let i = 1;
            resJson.data.areas.forEach(match => {
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.description} </td>
                    <td>${match.coordinate} </td> 
                    <td>${match.domain} </td> 
                    <td>${match.latitude} </td>  
                    <td>${match.longitude} </td>   
                </tr>
                `;
                i++;
            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Nama Daerah</th>
                            <th>Koordinat</th>
                            <th>Daerah</th>
                            <th>Garis Lintang</th>
                            <th>Garis Bujur</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getGempaTerkini(){
    title.innerHTML = "Informasi Gempa";
    fetch(DataGempa)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            contents.innerHTML = `
            <table>
                <thead>
                <tr>
                    <th>Detail Gempa </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Dirasakan</td>
                    <td>${resJson.data.dirasakan}</td>
                </tr>
                <tr>
                    <td>Waktu</td>
                    <td>${resJson.data.jam}</td>
                </tr>
                <tr>
                    <td>Potensi</td>
                    <td>${resJson.data.potensi}</td>
                </tr>
                <tr>
                    <td>Kedalaman</td>
                    <td>${resJson.data.kedalaman}</td>
                </tr>
                <tr>
                    <td>Lintang</td>
                    <td>${resJson.data.lintang}</td>
                </tr>
                <tr>
                    <td>Kekuatan</td>
                    <td>${resJson.data.magnitude}</td>
                </tr>
                <tr>
                    <td>Pusat</td>
                    <td>${resJson.data.wilayah}</td>
                </tr>
                <tr>
                    <td>Peta</td>
                    <td><img src="${resJson.data.shakemap}"></td>
                </tr>
                </tbody>
            </table>
            `;

        }).catch(err => {
            console.error(err);
        })
}
function loadPage(page) {
    switch (page) {
        case "jatim":
            getKoordinat();
            break;
        case "gempa":
            getGempaTerkini();
            break;  
    }
}
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "gempa";
    loadPage(page);
});
