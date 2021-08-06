function searchMovie() {
    $("#movie-list").html(" ");

    // menggunakan ajax
    $.ajax({
        // alamat
        url: "http://omdbapi.com",
        // method
        type: "get",
        // tipe data yang dikembalikan
        dataType: "json",
        // params / data
        data: {
            "apikey": "420f0a5a",
            // ambil value input
            "s": $("#search-input").val()
        },
        success: function (result) {
            // jika berhasil
            if (result.Response == "True") {
                let movies = result.Search;
                $.each(movies, function (i, data) {
                    $("#movie-list").append(`
                    <div class=col-md-3>
                    <div class="card mb-3">
                        <img src="` + data.Poster + `" class="card-img-top" width="200px">
                        <div class="card-body">
                            <h5 class="card-title">` + data.Title + `</h5>
                            <h6> Year realeased : ` + data.Year + ` </h6>
                            <h6 class="card-subtitle mb-2 text-muted">` + data.Type + `</h6>
                            <a href="#" class ="card-link seeDetail" data-toggle="modal"
                            data-target="#exampleModal" data-id="` + data.imdbID + `"> See Detail </a>
                        </div>
                    </div>
                    </div>`);

                    $("#search-input").val("");
                });
            } else {
                $("#movie-list").html(
                    `<div class="col">
                    <h1 class="text-center">` + result.Error + `</h1>`
                );
            }
        }
    });
}

$("#search-button").on("click", function (params) {
    searchMovie();
});

// saat tompol dilepas
$("#search-input").on("keyup", function (e) {
    // keycode untuk enter adalah 13
    if (e.keyCode === 13) {
        searchMovie();
    }
});

// menangani jika elemnent yang tidak ada sejak awal / dalam html
// carikan elemt movie list, ketika elemt yang namanya seeDetail, jalankan func
$("#movie-list").on("click", ".seeDetail", function () {

    $.ajax({
        // alamat
        url: "http://omdbapi.com",
        // method
        type: "get",
        // tipe data yang dikembalikan
        dataType: "json",
        // params / data
        data: {
            "apikey": "420f0a5a",
            // ambil data dari data-id
            // this = tombol yang sedang diklik (detail)
            "i": $(this).data("id")
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $(".modal-body").html(`
                <div class="container-fluid">
                    <div class=row>
                        <div class="col-md-4">
                            <img src="` + movie.Poster + `" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group" >
                                <h3><li class="list-group-item"> ` + movie.Title + `</li></h3>
                                <li class="list-group-item">Released : ` + movie.Released + `</li>
                                <li class="list-group-item">Genre    : ` + movie.Genre + `</li>
                                <li class="list-group-item">Director : ` + movie.Director + ` </li> 
                                <li class="list-group-item">Actors   : ` + movie.Actors + ` </li>
                            </ul>
                        </div>
                    </div>
                </div>
                `);
            }
        }
    });

})