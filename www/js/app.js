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
          $$("#pop-up-rating").append(" <!-- POP UP RATING -->" +
            "<div class= 'popup my-popup'>" +
            "<div class='view'>" +
            "<div class='page'>" +
            "<div class='navbar'>" +
            "<div class='navbar-bg'></div>" +
            "<div class='navbar-inner'>" +
            "<div class='title'>Your Rating</div>" +
            "<div class='right'>" +
            "<!-- Link to close popup -->" +
            "<a class='link popup-close'>Close</a>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<br><li>" +
            "<div class='item-content item-input'>" +
            "<class='item inner'><br>" +
            "<a class='button button-raised' id='ratingUser1'><i class='f7-icons size-20'>star_fill</i></a>" +
            "<a class='button button-raised' id='ratingUser2'><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i></a>" +
            "<a class='button button-raised' id='ratingUser3'><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i></a>" +
            "<a class='button button-raised' id='ratingUser4'><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i></a>" +
            "<a class='button button-raised' id='ratingUser5'><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i></a>" +
            "<a class='button button-raised' id='ratingUser6'><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i></a>" +
            "<a class='button button-raised' id='ratingUser7'><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i></a>" +
            "<a class='button button-raised' id='ratingUser8'><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i></a>" +
            "<a class='button button-raised' id='ratingUser9'><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i></a>" +
            "<a class='button button-raised' id='ratingUser10'><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i><i class='f7-icons size-20'>star_fill</i></a></div></div></li></div></div></div>")
          $$('#bacakomik').html(" ");
          $$('#title-komik').html(" ");
          var id_Komik = page.router.currentRoute.params.id;
          isiKomiks(id_Komik);
          detailKomik(id_Komik);
          showKategoriKomik(id_Komik);
          addview(id_Komik);
          showChat(id_Komik);
          $$('#btnComment').on('click', function () {
            addChat(id_Komik, localStorage.id, $$('#Comment').val())
            $$('#Comment').val("")
            $$('#ul_listchat').html(' ')
            showChat(id_Komik);
          })
          isFavKomik(id_Komik, localStorage.id);
          $$('#btnfav').on('click', function () {
            favKomik(id_Komik, localStorage.id);
          })
          //#region btnrating 1-10 baca komik
          $$('#ratingUser1').on('click', function () {
            addRating(id_Komik, localStorage.id, 1)
          })
          $$('#ratingUser2').on('click', function () {
            addRating(id_Komik, localStorage.id, 2)
          })
          $$('#ratingUser3').on('click', function () {
            addRating(id_Komik, localStorage.id, 3)
          })
          $$('#ratingUser4').on('click', function () {
            addRating(id_Komik, localStorage.id, 4)
          })
          $$('#ratingUser5').on('click', function () {
            addRating(id_Komik, localStorage.id, 5)
          })
          $$('#ratingUser6').on('click', function () {
            addRating(id_Komik, localStorage.id, 6)
          })
          $$('#ratingUser7').on('click', function () {
            addRating(id_Komik, localStorage.id, 7)
          })
          $$('#ratingUser8').on('click', function () {
            addRating(id_Komik, localStorage.id, 8)
          })
          $$('#ratingUser9').on('click', function () {
            addRating(id_Komik, localStorage.id, 9)
          })
          $$('#ratingUser10').on('click', function () {
            addRating(id_Komik, localStorage.id, 10)
          })
          //#endregion
        }

        if (page.name == "favouritedKomik") {
          $$('#favoritedKomik').html(' ');
          favoritedKomik(localStorage.id)
        }
      })
    },
  },
});


function showReplay(komentar_id) {
  app.request.post("https://ubaya.fun/hybrid/160420035/komiku/showreply.php", { 'komentar_id': komentar_id },
    function (data) {
      $$('#ul_listreply').html(' ')
      var arr = JSON.parse(data)
      var replies = arr['data']
      for (var i = 0; i <= replies.length; i++) {
        $$('#ul_listreply').append('<li><p><b>' + replies[i]['name'] + '</b>: ' + replies[i]['komentar'] + '<div class="right" style="color:silver">' + replies[i]['date'] + '</div>' + '</p></li> ')
      }
    })
}
//function replyKomentar
function replyKomentar(komentar_id) {
  app.request.post("https://ubaya.fun/hybrid/160420035/komiku/replykomentar.php", {
    "komentar": $$('#Reply-' + komentar_id).val(), "user_id": localStorage.id, 'komentar_id': komentar_id
  },
    function (data) {
      var arr = JSON.parse(data)
      var status = arr['result']
      if (status == 'success') {
        $$('#Reply-' + komentar_id).val("")
        $$('#ul_listreply').html(' ')
        showReplay(komentar_id);
      }
    })
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
            "<div class='right' id='viewer-text'><i class='f7-icons' style='font-size:18px'>eye</i>" + t.viewer + "</div></div></div></div>");
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
        $$('#btnfav').append("<a><i class='f7-icons' style='color:red'>heart_fill</i></a>");
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
        $$('#btnfav').append("<a><i class='f7-icons' style='color:red'>heart_fill</i></a>");
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
            "<img style='max-height=500px' src='" + t.poster + "' width='100%'>" +
            "</div>" +
            "<div class='card-footer'><div class='left'><a class='button button-raised' href='/bacakomik/" + t.id + "'>Read</a></div>" +
            "<div class='right' id='viewer-text'><i class='f7-icons' style='font-size:18px'>eye</i>" + t.viewer + "</div></div></div></div>");
        });
      }
    }
  );
}

//function updateRatingOnKomik
function updateRatingOnKomik(komik_id) {
  app.request.post("https://ubaya.fun/hybrid/160420035/komiku/updateratingkomik.php", { "komik_id": komik_id },
    function (data) {
      var arr = JSON.parse(data);
      var result = arr['result']
      if (result == 'success') {
        //success
      }
    })
}

//function addRating
function addRating(komik_id, user_id, rate) {
  app.request.post("https://ubaya.fun/hybrid/160420035/komiku/addrating.php", { "komik_id": komik_id, "user_id": user_id, "rate": rate },
    function (data) {
      var arr = JSON.parse(data);
      var result = arr['result']
      if (result == 'success') {
        app.dialog.alert("Thanks for rating this comics")
        updateRatingOnKomik(komik_id)
      } else if (result == 'error') {
        app.request.post("https://ubaya.fun/hybrid/160420035/komiku/checkrating.php", { "komik_id": komik_id, "user_id": user_id },
          function (data) {
            var arr = JSON.parse(data);
            var ratings = arr['data']
            for (var i = 0; i <= ratings.length; i++) {
              var userRate = ratings[i]['rate']
              if (userRate == rate) {
                app.request.post("https://ubaya.fun/hybrid/160420035/komiku/deleterating.php", { "komik_id": komik_id, "user_id": user_id },
                  function (data) {
                    var arr = JSON.parse(data);
                    var result = arr['result']
                    if (result == 'success') {
                      app.dialog.alert('Your rating is deleted')
                      updateRatingOnKomik(komik_id)
                    }
                  })
              } else if (userRate != rate) {
                app.request.post("https://ubaya.fun/hybrid/160420035/komiku/updaterating.php", { "komik_id": komik_id, "user_id": user_id, 'rate': rate },
                  function (data) {
                    var arr = JSON.parse(data);
                    var result = arr['result']
                    if (result == 'success') {
                      app.dialog.alert('Thanks for changing rating this comics')
                      updateRatingOnKomik(komik_id)
                    }
                  })
              }
            }
          })
      }
    })
}

//function addChat
function addChat(komik_id, user_id, chat) {
  app.request.post("https://ubaya.fun/hybrid/160420035/komiku/addkomentar.php", { 'komik_id': komik_id, 'user_id': user_id, 'komentar': chat },
    function (data) {
      var arr = JSON.parse(data);
      var result = arr['result']
      if (result == 'success') {
        //nice
      }
    })
}

//function showChat
function showChat(komik_id) {
  app.request.post('https://ubaya.fun/hybrid/160420035/komiku/showkomentar.php', { 'komik_id': komik_id },
    function (data) {
      var arr = JSON.parse(data);
      var komentars = arr['data'];
      for (var i = 0; i <= komentars.length; i++) {
        var date = komentars[i]["date"];
        var id = komentars[i]['komentar_id'];
        $$('#ul_listchat').append(
          '<li class="accordion-item"><a class="item-content item-link" href="#" onClick="showReplay(' + id + ')">' +
          '<div class="item-inner">' +
          '<div class="item-title"><b>' + komentars[i]['name'] + "</b>: " + komentars[i]['komentar'] + '<div class="right" style="color:silver">' + date + '</div></div>' +
          '</div>' +
          '</a>' +
          '<div class="accordion-item-content">' +
          '<div class="block">' +
          "<div id='ul_listreply'></div>" +
          '<p><ul><li><div class="item-title item-label" style="font-size:20px">Your reply</div>' +
          '<input type="text" name="Reply" id="Reply-' + id + '" placeholder="Type your reply">' +
          '<a href="#" class="item-link list-button button button-raised" id="btnReply" onClick="replyKomentar(' + id + ')">SEND REPLY</a></li></p></div></div></ul>')
      }
    })
}