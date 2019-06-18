(function () {
    $(init);//init

    function init() {
        var titulo = $('#title');
        var btnsearch = $('#btnSearch');
        btnsearch.click(evt_search);
        evt_InitSearch();
        clearAll();

        function evt_search() {
            var titleFld = titulo.val();
            var url = "http://www.omdbapi.com/?apikey=3ec23e8f&s=" + titleFld;
            $.ajax({
                url: url,
                success: renderMovies
            });
        }

        function renderMovies(response) {
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

        function evt_InitSearch() {
            var number = Math.floor(Math.random() * 4) + 1;
            var vowels = Array("a", "e", "i", "o", "u");
            var vowel = "Rambo";
            var year = 2008;
            var url = "http://www.omdbapi.com/?apikey=3ec23e8f&s=" + vowel + "&y=" + year;
            $.ajax({
                url: url,
                success: cardMovies
            });
        }

        function cardMovies(response) {
            var cards = $('#imgList');
            for (var m in response.Search) {
                var movie = response.Search[m];
                var img = $('<img src="' + movie.Poster + '" width="50px">');
                cards.append(img);
            }
        }

        function clearAll() {
            titulo.val("");
        }
    }
})();
