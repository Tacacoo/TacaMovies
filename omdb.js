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
            var i = 0;
            var movieList = $('#movieList');
            movieList.empty();
            for (var n in response.Search) {
                var movie = response.Search[n];
                if (movie.Poster !== "N/A") {
                    var li = $('<li id="placehold'+i+'" class="list-group-item"></li>');
                    var img = $('<input id="place" type="image" src="' + movie.Poster + '" width="50px" placeholder="' + movie.Title + '">');
                    li.append(img);
                    li.append(movie.Title);
                    movieList.append(li);
                }
                else {
                    var li = $('<li id="placehold'+i+'" class="list-group-item"></li>');
                    var img = $('<input id="place" type="image" src="https://lecicmaderas.com/wp-content/uploads/2017/05/imagen-no-disponible.jpg" width="50px" placeholder="' + movie.imdbID + '">');
                    li.append(img);
                    li.append(movie.Title);
                    movieList.append(li);
                }
                $('#placehold'+i+'').click(function () {
                    var imdb = $('#place').attr('placeholder');
                    alert(""+imdb);
                    loadModal(imdb);
                    $('#modal').modal();                   
                });
                i++;
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
            var i = 0;
            for (var m in response.Search) { //recorrer el objeto retornado
                var movie = response.Search[m];
                if (movie.Poster !== "N/A") {
                    var img = $('<input id="placelist'+i+'" type="image" src="' + movie.Poster + '" class="image-grid" placeholder="' + movie.Title + '">');
                    cards.append(img);
                }
                else {
                    var img = $('<input id="placelist'+i+'" type="image" src="https://lecicmaderas.com/wp-content/uploads/2017/05/imagen-no-disponible.jpg" class="image-grid" placeholder="' + movie.imdbID + '">');
                    cards.append(img);
                }
                $('#placelist'+i+'').click(function () {
                    var imdb = $('#placelist'+i+'').attr('placeholder');
                    loadModal(imdb);
                    $('#modal').modal();
                });
                i++;
            }

        }

        function cardMoviesSeries(response) {     // validamos la api retorna el url sino no para agregarle una de que la imagen no se encientra disponible.      
            var i = 0;
            for (var m in response.Search) { //recorrer el objeto retornado
                var movie = response.Search[m]; //obtenemos el objeto
                if (movie.Poster !== "N/A") {
                    var img = $('<input id="placelist2'+i+'" type="image"  src="' + movie.Poster + '" class="image-grid" placeholder="' + movie.Title + '">'); //creamos con jquery elementos para agregarlos cn append
                    var a = $('<a href="#"></a>');
                    a.append(img);
                    cards2.append(a);
                }
                else {
                    var img = $('<input id="placelist2'+i+'" type="image" src="https://lecicmaderas.com/wp-content/uploads/2017/05/imagen-no-disponible.jpg" class="image-grid2" placeholder="' + movie.imdbID + '">');
                    var a = $('<a href="#"></a>');
                    a.append(img);
                    cards2.append(a);
                }
                $('#placelist2'+i+'').click(function () {
                    var imdb = $('#placelist2'+i+'').attr('placeholder');
                    loadModal(imdb);
                    $('#modal').modal();
                });
                i++;
            }

        }

        function clearAll() {
            titulo.val("");
        }

        function loadModal(imdb) { //obtener datos
            var url = "http://www.omdbapi.com/?apikey=3ec23e8f&s=" + imdb;
            alert(""+imdb);
            $.ajax({
                url: url,
                success: loadModalCard //enviar datos para ser mostrados
            });
        }

        function loadModalCard(response) {//mostrar datos en el modal
            for (var m in response.Search) { //recorrer el objeto retornado
                var movie = response.Search[0];
            $('#modal-title').html(""+movie.Title);
            $('#img-modal').attr("scr",movie.Poster);
            $('#modal-gender').html(""+movie.Title);
            $('#modal-dir').html(""+movie.Directors);
            $('#modal-act').html(""+movie.Actors);
            $('#modal-plot').html(""+movie.Plot);
            $('#modal-lang').html(""+movie.Lang);
        }
    }
        var banner = $('.moviegrid');
        var img = $('<input type="image" class="banner-img" id="banner" src="src/Movies.png">');
        banner.append(img);
    }
})();