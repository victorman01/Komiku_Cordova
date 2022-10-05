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
      // Check login user
      $$(document).on('page:afterin', function (e, page) {
        if (!localStorage.username) {
          page.router.navigate('/login/');
        } else {
          html('Hello ' + localStorage.username)
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
      })
    },
  },
});