$(document).ready(function() {
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
                    movieList.append(movieHtml(movie));
                }
                else {
                    
                    movieList.append(movieHtml(movie));
                }
            }

        }
        
        $(document).ready(function() {
           
            $('#movieList').on('click','.placehold',function(event){
                let tag = $(event.currentTarget);
                loadModal(tag.data().name);
                $('#modal').modal(); 
            });
          });

        function movieHtml(movie){
            let element = `
            <li class="placehold" data-name="${movie.Title}">
                    <img src="${movie.Poster}" width="50px" onerror="this.onerror=null;this.src='https://lecicmaderas.com/wp-content/uploads/2017/05/imagen-no-disponible.jpg';">
                    <p>${movie.Title}</p>
                </li>
            `;
            return element
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
                    var img = $('<input id="placelist" type="image" src="' + movie.Poster + '" class="image-grid" placeholder="' + movie.Title + '">');
                    cards.append(img);
                }
                else {
                    var img = $('<input id="placelist" type="image" src="https://lecicmaderas.com/wp-content/uploads/2017/05/imagen-no-disponible.jpg" class="image-grid" placeholder="' + movie.imdbID + '">');
                    cards.append(img);
                }
            }

        }

        function cardMoviesSeries(response) {     // validamos la api retorna el url sino no para agregarle una de que la imagen no se encientra disponible.      
            for (var m in response.Search) { //recorrer el objeto retornado
                var movie = response.Search[m]; //obtenemos el objeto
                if (movie.Poster !== "N/A") {
                    var img = $('<input id="placelist2'+i+'" type="image"  src="' + movie.Poster + '" class="image-grid" placeholder="' + movie.Title + '">'); //creamos con jquery elementos para agregarlos cn append
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

        function loadModal(imdb) { //obtener datos
            var apiKey = '3ec23e8f';
            let request = $.ajax({
                url: "http://www.omdbapi.com",
                method: "GET",
                data: { 
                    apikey : apiKey,
                    t : imdb
                },
                dataType: "json"
              });
               
              request.done(function( json ) {// se va ejecutar una vez ya que el ajax se resuelva 
    
                if (json.Response == 'True'){
                    loadModalCard(json);
                }
                else{
    
                }
              });
               
              request.fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
              });
        }

        function loadModalCard(json) {//mostrar datos en el modal
            $('#img-modal').attr('src',json.Poster);
            $('#modal-title').html(json.Title);
            $('#modal-year').html(json.Year);
            $('#modal-rated').html(json.Rated);
            $('#modal-gender').html(json.Genre);
            $('#modal-released').html(json.Released);
            $('#modal-dir').html(json.Director);
            $('#modal-act').html(json.Actors);
            $('#modal-plot').html(json.Plot);
            $('#modal-lang').html(json.Language);
            $('#modal-awards').html(json.Awards);
            $('#modal-time').html(json.Runtime);

        
    }
        var banner = $('.moviegrid');
        var img = $('<input type="image" class="banner-img" id="banner" src="src/Movies.png">');
        banner.append(img);
    });