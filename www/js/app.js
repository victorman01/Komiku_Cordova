var $$ = Dom7;
var device = Framework7.getDevice();
var app = new Framework7({
  name: 'Komiku', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element

  id: 'io.framework7.myapp', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }

      //function getKategori
      function getKategori(vcari) {
        app.request.post(
          "https://ubaya.fun/hybrid/160420035/komiku/kategori.php", { "cari": vcari },
          function (data) {
            var arr = JSON.parse(data);
            var kategoris = arr['data'];
            for (var i = 0; i <= kategoris.length; i++) {
              $$("#ul_listkategori").append("<li><a href='/komik/" + kategoris[i]["kategori_id"] + "'>" + kategoris[i]["name"] + "</a></li > ");
            }
          }
        );
      };

      //Function addView
      function addview(idKomik) {
        app.request.post("https://ubaya.fun/hybrid/160420035/komiku/addview.php", { 'idKomik': idKomik },
          function (data) {
            var arr = JSON.parse(data);
            var hasil = arr['result'];
            if (hasil == 'success') {
              //reload page
            }
          })
      }

      //Function favoritedKomik
      function favoritedKomik(user_id, komik_id) {
        app.request.post("https://ubaya.fun/hybrid/160420035/komiku/favoritekomik.php", { "user_id": user_id, "komik_id": komik_id },
          function (data) {
            var arr = JSON.parse(data);
            var favKomik = arr['data'];
            for (var i = 0; i < favKomik.length; i++) {
              var favoritedKomik = [];
              favoritedKomik.push({
                id: favKomik[i]['komik_id'],
                judul: favKomik[i]['judul'],
                viewer: favKomik[i]['viewer'],
                poster: favKomik[i]['poster'],
                rating: favKomik[i]['rating']
              })
              favoritedKomik.forEach((t, idx) => {
                $$("#favoritedKomik").append(
                  "<div class='col-50'><div class='card'>" +
                  "<div class='card-header'> <strong>" + t.judul +
                  "<div style='font-weight:normal'><p>Rating: " + t.rating + "/10<i class='f7-icons' style='color:yellow; font-size:18px'>star_fill</i></p></div></strong></div><div class='card-content'>" +
                  "<img src='" + t.poster + "' width='100%'>" +
                  "</div>" +
                  "<div class='card-footer'><div class='left'><a class='button button-raised' href='/bacakomik/" + t.id + "'>Read</a></div>" +
                  "<div class='right' id='viewer-text'><i class='f7-icons' style='font-size:18px'>eye</i>" + t.viewer + "</div><a class='col button open-rating button-raised'><i class='f7-icons size-20'>star_fill</i></a></div></div></div > ");
              });
            }
          })
      }

      //Function isFavKomik
      function isFavKomik(komik_id, user_id) {
        app.request.post("https://ubaya.fun/hybrid/160420035/komiku/checkfavkomik.php", { "komik_id": komik_id, "user_id": user_id },
          function (data) {
            var arr = JSON.parse(data);
            var status = arr['result'];
            if (status == 'success') {
              $$('#btnfav').html(' ')
              $$('#btnfav').append("<a><i class='f7-icons'>heart_fill</i></a>");
            } else if (status == 'error') {
              $$('#btnfav').html(' ')
              $$('#btnfav').append("<a><i class='f7-icons'>heart</i></a>");
            }
          })
      }

      //Function FavKomik
      function favKomik(komik_id, user_id) {
        app.request.post("https://ubaya.fun/hybrid/160420035/komiku/favkomik.php", { "komik_id": komik_id, "user_id": user_id },
          function (data) {
            var arr = JSON.parse(data);
            var status = arr['result'];
            if (status == "success") {
              app.dialog.alert("Favorited")
              $$('#btnfav').html(' ')
              $$('#btnfav').append("<a><i class='f7-icons'>heart_fill</i></a>");
            }
            else if (status == 'error') {
              app.request.post("https://ubaya.fun/hybrid/160420035/komiku/unfavkomik.php", { "komik_id": komik_id, "user_id": user_id },
                function (data) {
                  arr = JSON.parse(data);
                  var status = arr['result'];
                  if (status == "success") {
                    app.dialog.alert("Unfavorited")
                    $$('#btnfav').html(' ')
                    $$('#btnfav').append("<a><i class='f7-icons'>heart</i></a>");
                  }
                })
            }
          })
      }

      //Function isiKomiks
      function isiKomiks(idKomik) {
        app.request.post("https://ubaya.fun/hybrid/160420035/komiku/isikomik.php",
          {
            "id_Komik": idKomik
          },
          function (data) {
            var arr = JSON.parse(data);
            var content = arr['data'];
            for (var i = 0; content.length; i++) {
              var gambars = [];
              gambars.push({
                gambar: content[i]['gambar'],
              });
              gambars.forEach((t, idx) => {
                $$("#bacakomik").append("" +
                  "<img src='" + t.gambar + "' width='100%'>"
                );
              })
            }
          })
      }

      //Function detailKomik
      function detailKomik(idKomik) {
        var details = [];
        app.request.post("https://ubaya.fun/hybrid/160420035/komiku/isikomik.php",
          {
            "id_Komik": idKomik
          },
          function (data) {
            var arr = JSON.parse(data);
            var content = arr['data'];
            $$('#detail-komik').html(" ")
            for (var i = 0; i < 1; i++) {
              details.push({
                judul: content[i]['judul'],
                sinopsis: content[i]['sinopsis'],
                published: content[i]['published'],
                author: content[i]['author']
              });
              for (i = 0; i <= content.length; i++) {
                judul = details[i].judul;
                sinopsis = details[i].sinopsis;
                author = details[i].author;
                published = details[i].published
                $$('#title-komik').append("<div>" + judul + "</div>");
                $$('#detail-komik').append("<div class='block-title'>Detail Comic</div>" +
                  "<div class='list accordion-list'><ul><li class='accordion-item'><a class='item-content item-link' href='#'>" +
                  "<div class='item-inner'><div class='item-title'>Author</div></div></a><div class='accordion-item-content'><div class='block'>" +
                  "<p>" + author + "</p></div></div></li><li class='accordion-item'><a class='item-content item-link' href='#'>" +
                  "<div class='item-inner'><div class='item-title'>Publish Date</div></div></a><div class='accordion-item-content'><div class='block'>" +
                  "<p>" + published + "</p></div></div></li><li class='accordion-item'><a class='item-content item-link' href='#'>" +
                  "<div class='item-inner'><div class='item-title'>Categories</div></div></a><div class='accordion-item-content'><div class='block'>" +
                  "<p id='kategorikomik'></p></div></div></li><li class='accordion-item'><a class='item-content item-link' href='#'>" +
                  "<div class='item-inner'><div class='item-title'>Synopsis Comic</div></div></a><div class='accordion-item-content'><div class='block'>" +
                  "<p>" + sinopsis + "</p></div></div></li>");
              }
            }
          })
      }

      //Function showKategoriKomik
      function showKategoriKomik(komik_id) {
        app.request.post(
          "https://ubaya.fun/hybrid/160420035/komiku/showkategori.php", { "komik_id": komik_id },
          function (data) {
            var arr = JSON.parse(data);
            kategori = arr['data'];
            for (var i = 0; kategori.length; i++) {
              katergoris = kategori[i]["name"]
              if (i == (kategori.length - 1)) {
                $$('#kategorikomik').append(katergoris);
              }
              else {
                $$('#kategorikomik').append(katergoris + ", ");
              }
            }
          }
        )
      }

      //function getKomik
      function getKomik(vcari1 = "", idKategori) {
        app.request.post(
          "https://ubaya.fun/hybrid/160420035/komiku/komik.php", { "cari": vcari1, "idKategori": idKategori },
          function (data) {
            var arr = JSON.parse(data);
            var komiks = arr['data'];
            for (var i = 0; i <= komiks.length; i++) {
              var komik_inside = [];
              komik_inside.push({
                id: komiks[i]['komik_id'],
                judul: komiks[i]['judul'],
                viewer: komiks[i]['viewer'],
                poster: komiks[i]['poster'],
                rating: komiks[i]['rating']
              });
              komik_inside.forEach((t, idx) => {
                $$("#ul_listkomik").append(
                  "<div class='col-50'><div class='card'>" +
                  "<div class='card-header'> <strong>" + t.judul +
                  "<div style='font-weight:normal'><p>Rating: " + t.rating + "/10<i class='f7-icons' style='color:yellow; font-size:18px'>star_fill</i></p></div></strong></div><div class='card-content'>" +
                  "<img src='" + t.poster + "' width='100%'>" +
                  "</div>" +
                  "<div class='card-footer'><div class='left'><a class='button button-raised' href='/bacakomik/" + t.id + "'>Read</a></div>" +
                  "<div class='right' id='viewer-text'><i class='f7-icons' style='font-size:18px'>eye</i>" + t.viewer + "</div><a href='#' data-popup='.my-popup' class='popup-open col button button-raised'><i class='f7-icons size-20'>star_fill</i></a></div></div></div>");
              });
            }
          }
        );
      };

      // Check login user
      $$(document).on('page:afterin', function (e, page) {
        if (!localStorage.username) {
          page.router.navigate('/login/');
        } else {
          $$('#txtWelcome').html('Hello, ' + localStorage.name);
        }
      });

      $$(document).on('page:init', function (e, page) {
        $$('#log-out').on('click', function () {
          localStorage.removeItem('username');
          localStorage.removeItem('name');
          localStorage.removeItem('id');
          page.router.navigate('/login/');
        })

        if (page.name == 'login') {
          $$('#btnsignin').on('click', function () {
            app.request.post('https://ubaya.fun/hybrid/160420035/komiku/login.php',
              {
                "username": $$("#username").val(),
                "password": $$("#password").val()
              },
              function (data) {
                var arr = JSON.parse(data);
                var result = arr['result'];
                if (result == 'success') {
                  localStorage.id = arr['user_id'];
                  localStorage.name = arr['name'];
                  localStorage.username = arr['username'];
                  page.router.back('/');
                } else app.dialog.alert('Username atau password salah');
              });
          });
        }

        if (page.name == "kategori") {
          getKategori();
          $$('#btncari').on('click', function () {
            $$("#ul_listkategori").html(" ");
            getKategori($$('#txtcari').val());
          })
        }

        if (page.name == "komik") {
          $$("#pop-up-rating").append(" <!-- POP UP RATING -->" +
            "<div class= 'popup my-popup'>" +
            "<div class='view'>" +
            "<div class='page'>" +
            "<div class='navbar'>" +
            "<div class='navbar-bg'></div>" +
            "<div class='navbar-inner'>" +
            "<div class='title'>Rating</div>" +
            "<div class='right'>" +
            "<!-- Link to close popup -->" +
            "<a class='link popup-close'>Close</a>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<li>" +
            "<div class='item-content item-input'>" +
            "<di class='item inner'>" +
            "<div class='item title item-label'>Your Rating</div>'" +
            "<div class='item input-wrap'>" +
            "<input type='text' name='name' placeholder='Your rating'/>" + "</div>" + "</di>" + "</div>" + "</li>" + "</div>" + "</div></div>")
          $$("#ul_listkomik").html(" ");
          if (page.router.currentRoute.params.id != null) {
            var idKategori = page.router.currentRoute.params.id;
          }
          getKomik("", idKategori);
          $$('#btncari1').on('click', function () {
            $$("#ul_listkomik").html(" ");
            getKomik($$('#txtcari1').val(), idKategori);
          })
        }

        if (page.name == "bacakomik") {
          $$('#bacakomik').html(" ");
          $$('#title-komik').html(" ");
          var id_Komik = page.router.currentRoute.params.id;
          isiKomiks(id_Komik);
          detailKomik(id_Komik);
          showKategoriKomik(id_Komik);
          addview(id_Komik);
          isFavKomik(id_Komik, localStorage.id);
          $$('#btnfav').on('click', function () {
            favKomik(id_Komik, localStorage.id);
          })
        }

        if (page.name == "favouritedKomik") {
          $$('#favoritedKomik').html(' ');
          favoritedKomik(localStorage.id)
        }
      })
    },
  },
});