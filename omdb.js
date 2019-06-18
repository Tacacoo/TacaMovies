(function () {
    $(init);//init

    function init() {
        var titulo = $('#title');//input text
        var btnsearch = $('#btnSearch');//btnBuscar
        var cards = $('#imgList');//parrafo 1
        var cards2 = $('#imgList2');//parrafo 2
        var arrayCards = Array()
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
                if(movie.Poster!=="N/A"){             
                    var a = $('<a href="#"></a>');
                    var li = $('<li class="list-group-item"></li>');
                    var img = $('<img src="' + movie.Poster + '" width="50px"></img>');
                    a.append(img);
                    a.append(movie.Title);
                    li.append(a);
                    movieList.append(li);
                }
                else{

                    var a = $('<a href="#"></a>');
                    var li = $('<li class="list-group-item"></li>');
                    var img = $('<img src="https://www.cocin-cartagena.es/wp-content/uploads/2018/12/ImagenNoDisponible.png" width="50px"></img>');
                    a.append(img);
                    a.append(movie.Title);
                    li.append(a);
                    movieList.append(li);
                }
                
            }

        }

        function evt_InitSearch() {  //obtener datos de peliculas pra mostras al iniciar la pagina
            var number = Math.floor((Math.random() * 17) + 1);
            var titles = Array("Avengers", "Toys", "Spider", "Iron", "Medal","Soldier","War","Captain","Terminator","Rambo","Rock","Fast","Lord","Find","Cero","One","Red","Black");
            var series = Array("The Walking Dead", "Vikings", "Game of Thrones", "Doctor", "Grey's","Lucifer","the simpsons","Breaking Bad","spongebob","Stranger Things","Sherlock","Daredevil","Veep","Blacklist","La rosa de Guadalupe","Black Mirror","House of Cards","The big bang theory");
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
                if(movie.Poster!=="N/A"){
                    var img = $('<img src="' + movie.Poster + '" class="image-grid">');
                var a = $('<a href="#"></a>');
                a.append(img);
                cards.append(a);
                }
                else{               
                var img = $('<img src="https://www.cocin-cartagena.es/wp-content/uploads/2018/12/ImagenNoDisponible.png" class="image-grid">');
                var a = $('<a href="#"></a>');
                a.append(img);
                cards.append(a);
                }
            }
        }
        
        function cardMoviesSeries(response) {           
            for (var m in response.Search) { //recorrer el objeto retornado
                var movie = response.Search[m];
                if(movie.Poster!=="N/A"){
                var img = $('<img src="' + movie.Poster + '" class="image-grid">');
                var a = $('<a href="#"></a>');
                a.append(img);
                cards2.append(a);
                }
                else{
                var img = $('<img src="https://www.cocin-cartagena.es/wp-content/uploads/2018/12/ImagenNoDisponible.png" class="image-grid">');
                var a = $('<a href="#"></a>');
                a.append(img);
                cards2.append(a);
                }
            }
        }

        function clearAll() {
            titulo.val("");
        }
    }
})();

/*http://www.omdbapi.com/?t=Game of Thrones&Season=1*/
