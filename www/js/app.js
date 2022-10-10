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
      //function getKomik
      function getKomik(vcari1 = "", idKategori) {
        app.request.post(
          "https://ubaya.fun/hybrid/160420035/komiku/komik.php", { "cari": vcari1, "idKategori": idKategori },
          function (data) {
            var arr = JSON.parse(data);
            var komiks = arr['data'];

            for (var i = 0; komiks.length; i++) {
              var komik_inside = [];
              komik_inside.push({
                id: komiks[i]['komik_id'],
                judul: komiks[i]['judul'],
                sinopsis: komiks[i]['sinopsis'],
                viewer: komiks[i]['viewer'],
                poster: komiks[i]['poster']
              });
              komik_inside.forEach((t, idx) => {
                $$("#ul_listkomik").append(
                  "<div class='col-50'><div class='card'>" +
                  "<div class='card-header'>" + t.judul +
                  "</div><div class='card-content'>" +
                  "<img src='" + t.poster + "' width='100%'>" +
                  "</div><div class='card-footer'><a href='/bacakomik/" + idx + "'>Baca</a></div></div></div>");
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
      })
    },
  },
});