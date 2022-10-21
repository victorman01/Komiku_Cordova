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
            var kategori = arr['data'];
            for (var i = 0; kategori.length; i++) {
              $$("#ul_listkategori").append("<li><a href='/komik/" + kategori[i]['kategori_id'] + "'>" + kategori[i]['name'] + "</a ></li > ");
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
              })
              favoritedKomik.forEach((t, idx) => {
                $$("#favoritedKomik").append(
                  "<div class='col-50'><div class='card'>" +
                  "<div class='card-header'> <strong>" + t.judul +
                  "</strong></div><div class='card-content'>" +
                  "<img src='" + t.poster + "' width='100%'>" +
                  "</div><div class='card-footer'><a href='/bacakomik/" + t.id + "'>Read</a>" +
                  "<div class='right' id='viewer-text'><i class='f7-icons size-20'>eye</i>" + t.viewer + "</div></div ></div ></div > ");
              });
            }
          })
      }

      //Function checkFavKomik
      function isFavKomik(user_id, komik_id) {
        app.request.post("https://ubaya.fun/hybrid/160420035/komiku/checkfav.php"), { "user_id": user_id, "komik_id": komik_id },
          function (data) {
            var arr = JSON.parse(data);
            var isFavKomik = arr['result'];
            if (isFavKomik == 'success') {
              $$('#btnfav').html(' ')
              $$('#btnfav').append("<a id='unfavouritechk'><i class='f7-icons'>heart_fill</i></a>");
            } else {
              $$('#btnfav').html(' ')
              $$('#btnfav').append("<a id='favouritechk'><i class='f7-icons'>heart</i></a>");
            }
          }
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
              $$('#btnfav').append("<a id='unfavouritechk'><i class='f7-icons'>heart_fill</i></a>");
            }
          })
      }
      //Function unFavKomik
      function unFavKomik(komik_id, user_id) {
        app.request.post("https://ubaya.fun/hybrid/160420035/komiku/unfavmovie.php", { "komik_id": komik_id, "user_id": user_id },
          function (data) {
            var arr = JSON.parse(data);
            var status = arr['result'];
            if (status == 'success') {
              app.dialog.alert("Unfavorited");
              $$('#btnfav').html(' ')
              $$('#btnfav').append("<a id='favouritechk'><i class='f7-icons'>heart</i></a>");
            }
          })
      }

      // //Function showRating
      // function showRating(vuser_id, vkomik_id) {
      //   app.request.post("https://ubaya.fun/hybrid/160420035/komiku/komik.php", { "user_id": vuser_id, "komik_id": vkomik_id },
      //     function (data) {
      //       var arr = JSON.parse(data);
      //       var ratings = arr['data'];
      //       var total = 0;
      //       var jumlah = 0;
      //       var rating = [];
      //       for (var i = 0; ratings.length; i++) {
      //         rating.push({
      //           rate: ratings[i]['rate'],
      //         })
      //         total += rating[i].rate;
      //         jumlah++;
      //       }
      //       hasil = total / jumlah;
      //     })
      // }

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
            var sinopsis = null;
            for (var i = 0; i < 1; i++) {
              details.push({
                judul: content[i]['judul'],
                sinopsis: content[i]['sinopsis'],
              });
              for (i = 0; i <= content.length; i++) {
                var judul = details[i].judul;
                sinopsis = details[i].sinopsis;
                $$('#title-komik').append("<div>" + judul + "</div>");
                $$('#detail-komik').append("<div class='block-title'>Detail Komik</div>" +
                  "<div class='list accordion-list'><ul><li class='accordion-item'><a class='item-content item-link' href='#'>" +
                  "<div class='item-inner'><div class='item-title'>Kategori</div></div></a><div class='accordion-item-content'><div class='block'>" +
                  "<p id='kategorikomik'></p></div></div></li><li class='accordion-item'><a class='item-content item-link' href='#'>" +
                  "<div class='item-inner'><div class='item-title'>Sinopsis komik</div></div></a><div class='accordion-item-content'><div class='block'>" +
                  "<p>" + sinopsis + "</p></div></div></li></ul>");
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
            var kategori = arr['data'];
            for (var i = 0; i <= kategori.length; i++) {
              if (i == (kategori.length - 1))
                $$('#kategorikomik').append(kategori[i]["name"]);
              else
                $$('#kategorikomik').append(kategori[i]["name"] + ", ");
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
              });
              komik_inside.forEach((t, idx) => {
                $$("#ul_listkomik").append(
                  "<div class='col-50'><div class='card'>" +
                  "<div class='card-header'> <strong>" + t.judul +
                  "</strong></div><div class='card-content'>" +
                  "<img src='" + t.poster + "' width='100%'>" +
                  "</div><div class='card-footer'><a href='/bacakomik/" + t.id + "'>Read</a>" +
                  "<div class='right' id='viewer-text'><i class='f7-icons size-20'>eye</i>" + t.viewer + "</div></div ></div ></div > ");
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
          isFavKomik(localStorage.id, id_Komik);
          $$('#btnfav').on('click', function () {
            favKomik(id_Komik, localStorage.id);
          })
          $$('#btnfav').on('click', function () {
            unFavKomik(id_Komik, localStorage.id);
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