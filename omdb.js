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
                var a = $('<a href="#"></a>');
                var li = $('<li class="list-group-item"></li>');
                var img = $('<img src="' + movie.Poster + '" width="50px"></img>');
                a.append(img);
                a.append(movie.Title);
                li.append(a);
                movieList.append(li);
            }

        }

        function evt_InitSearch() {  //obtener datos de peliculas pra mostras al iniciar la pagina
            var number = Math.floor(Math.random() * 4) + 1;
            var vowels = Array("a", "e", "i", "o", "u");
            var vowel = "Rambo";
            var vowela = "Game of Thrones";
            var year = 2008;
            var url = "http://www.omdbapi.com/?apikey=3ec23e8f&s=" + vowel + "&y=" + year;// Estrenos
            var url2 = "http://www.omdbapi.com/?apikey=3ec23e8f&s=" + vowela + "&type=series";// Series
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
                var img = $('<img src="' + movie.Poster + '" class="image-grid">');
                cards.append(img);
            }
        }
        function cardMoviesSeries(response) {           
            for (var m in response.Search) { //recorrer el objeto retornado
                var movie = response.Search[m];
                var img = $('<img src="' + movie.Poster + '" class="image-grid">');
                cards2.append(img);
            }
        }

        function clearAll() {
            titulo.val("");
        }
    }
})();

/*http://www.omdbapi.com/?t=Game of Thrones&Season=1*/
