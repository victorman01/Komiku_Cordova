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
            var komiku = arr['data'];
            for (var i = 0; komiku.length; i++) {
              $$("#ul_listkategori").append("<li><a href='/komik/" + komiku[i]['genre_id'] + "'>" + komiku[i]['genre_name'] + "</a ></li > ");
            }
          }
        );
      };
      //function getKomik
      function getKomik(vcari1 = "", idGenre) {
        app.request.post(
          "https://ubaya.fun/hybrid/160420035/komiku/komik.php", { "cari": vcari1, "idGenre": idGenre },
          function (data) {
            var arr = JSON.parse(data);
            var komiks = arr['data'];
            for (var i = 0; komiks.length; i++) {
              $$("#ul_listkomik").append("<li><a href='/bacakomik/" + komiks[i]['movie_id'] + "'>" + komiks[i]['title'] + "</a ></li > ");
            }
          }
        );
      };
      // Check login user
      $$(document).on('page:afterin', function (e, page) {
        if (!localStorage.username) {
          page.router.navigate('/login/');
        } else {
          $$('#txtWelcome').html('Hello, ' + localStorage.username);
        }
      });
      $$(document).on('page:init', function (e, page) {
        $$('#log-out').on('click', function () {
          localStorage.removeItem('username');
          page.router.navigate('/login/');
        })
        if (page.name == 'login') {
          $$('#btnsignin').on('click', function () {
            app.request.post('https://ubaya.fun/hybrid/160420035/komiku/login.php',
              {
                "user_id": $$("#username").val(),
                "user_password": $$("#password").val()
              },
              function (data) {
                var arr = JSON.parse(data);
                var result = arr['result'];
                if (result == 'success') {
                  localStorage.username = $$("#username").val();
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
            var idGenre = page.router.currentRoute.params.id;
          }
          getKomik("", idGenre);
          $$('#btncari1').on('click', function () {
            $$("#ul_listkomik").html(" ");
            getKomik($$('#txtcari1').val(), idGenre);
          })
        }
      })
    },
  },
});