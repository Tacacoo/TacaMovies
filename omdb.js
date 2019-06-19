(function () {
    $(init);//init

    function init() {
        var titulo = $('#title');//input text
        var btnsearch = $('#btnSearch');//btnBuscar
        var cards = $('#imgList');//parrafo 1
        var cards2 = $('#imgList2');//parrafo 2
        btnsearch.click(evt_search);
        evt_InitSearch();
        clearAll();

        function evt_search() { //obtener datos
            var titleFld = titulo.val();
            var url = "http://www.omdbapi.com/?apikey=3ec23e8f&s=" + titleFld;
            $.ajax({
                url: url,
                success: renderMovies //enviar datos para ser mostrados
            });
        }
        function renderMovies(response) {//mostrar datos
            var movieList = $('#movieList');
            movieList.empty();
            for (var n in response.Search) {
                var movie = response.Search[n];
                if (movie.Poster !== "N/A") {
                    var a = $('<a></a>');
                    var li = $('<li class="list-group-item"></li>');
                    var img = $('<input id="placehold" type="image" src="' + movie.Poster + '" width="50px" placeholder="' + movie.imdbID + '">');
                    li.append(img);
                    a.append(movie.Title);
                    li.append(a);
                    movieList.append(li);
                }
                else {
                    var a = $('<a></a>');
                    var li = $('<li class="list-group-item"></li>');
                    var img = $('<input id="placehold" type="image" src="https://lecicmaderas.com/wp-content/uploads/2017/05/imagen-no-disponible.jpg" width="50px" placeholder="' + movie.imdbID + '">');
                    li.append(img);
                    a.append(movie.Title);
                    li.append(a);
                    movieList.append(li);
                }

            }

        }

        function evt_InitSearch() {  //obtener datos de peliculas pra mostras al iniciar la pagina
            var number = Math.floor((Math.random() * 16) + 1);
            var titles = Array("Avengers", "Toys", "Spider", "Iron", "Medal", "Soldier", "War", "Captain", "Terminator", "Rock", "Fast", "Lord", "Find", "Cero", "One", "Red", "Black");
            var series = Array("The Walking Dead", "Vikings", "Game of Thrones", "Doctor", "Grey's", "Lucifer", "the simpsons", "Breaking Bad", "Stranger Things", "Sherlock", "Daredevil", "Veep", "Blacklist", "La rosa de Guadalupe", "Black Mirror", "House of Cards", "The big bang theory");
            var vowel = titles[number];
            var vowel2 = series[number];
            var url = "http://www.omdbapi.com/?apikey=3ec23e8f&s=" + vowel; // Contenido
            var url2 = "http://www.omdbapi.com/?apikey=3ec23e8f&s=" + vowel2 + "&type=series"; // Series
            $.ajax({
                url: url,
                success: cardMoviesNew
            });

            $.ajax({
                url: url2,
                success: cardMoviesSeries
            });

        }

        function cardMoviesNew(response) {
            for (var m in response.Search) { //recorrer el objeto retornado
                var movie = response.Search[m];
                if (movie.Poster !== "N/A") {
                    var img = $('<input id="placelist" type="image" src="' + movie.Poster + '" class="image-grid" placeholder="' + movie.imdbID + '">');
                    var a = $('<a href="#"></a>');
                    a.append(img);
                    cards.append(a);
                }
                else {
                    var img = $('<input id="placelist" type="image" src="https://lecicmaderas.com/wp-content/uploads/2017/05/imagen-no-disponible.jpg" class="image-grid" placeholder="' + movie.imdbID + '">');
                    var a = $('<a href="#"></a>');
                    a.append(img);
                    cards.append(a);
                }
            }
        }

        function cardMoviesSeries(response) {     // validamos la api retorna el url sino no para agregarle una de que la imagen no se encientra disponible.      
            for (var m in response.Search) { //recorrer el objeto retornado
                var movie = response.Search[m]; //obtenemos el objeto
                if (movie.Poster !== "N/A") {
                    var img = $('<input id="placelist2" type="image"  src="' + movie.Poster + '" class="image-grid" placeholder="' + movie.imdbID + '">'); //creamos con jquery elementos para agregarlos cn append
                    var a = $('<a href="#"></a>');
                    a.append(img);
                    cards2.append(a);
                }
                else {
                    var img = $('<input id="placelist2" type="image" src="https://lecicmaderas.com/wp-content/uploads/2017/05/imagen-no-disponible.jpg" class="image-grid2" placeholder="' + movie.imdbID + '">');
                    var a = $('<a href="#"></a>');
                    a.append(img);
                    cards2.append(a);
                }
            }
        }

        function clearAll() {
            titulo.val("");
        }

        $('#movieList').click(function () {
            var imdb = $('#placehold').attr('placeholder');
            loadModal(imdb);
            $('#modal').modal();


        });

        $('#imgList').click(function () {
            var imdb = $('#placelist').attr('placeholder');
            loadModal(imdb);
            $('#modal').modal();


        });

        $('#imgList2').click(function () {
            var imdb = $('#placelist2').attr('placeholder');
            loadModal(imdb);
            $('#modal').modal();


        });


        function loadModal(imdb) { //obtener datos
            var url = "http://www.omdbapi.com/?apikey=3ec23e8f&i=" + imdb;
            $.ajax({
                url: url,
                success: loadModalCard //enviar datos para ser mostrados
            });
        }

        function loadModalCard(respons) {//mostrar datos
            var divModal = $('.divModal');
            alert("Titulo: "+respons.Title+"\n Genero: "+respons.Genre+"\n Resumen: "+respons.Plot);
            for (var n in response.Search) {
                var movie = respons.Search[n];
                var h2 = $('<h2>' + movie.Title + '</h2>');
                var img = $('<input type="image" src="' + movie.Poster + '" width="50px">');
                var gnre = $('<p>' + movie.Genre + '</p>');
                var plt = $('<p>' + movie.Plot + '</p>');
                var dir = $('<p>' + movie.Director + '</p>');
                var actr = $('<p>' + movie.Actors + '</p>');
                var div = $('<div id="paginacion" class="container-modal"></div>');
                div.appendTo(h2);
                div.append(img);
                div.append(gnre);
                div.append(plt);
                div.append(dir);
                div.append(actr);
                divModal.append(div);
            }

        }
    }
})();


