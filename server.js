const http = require("http"); //Bu olmazsa site yok olur
const fs = require("fs"); // File system (DB DOLARSA DİYE)
const express = require("express"); //Bu olmazsa site yok olur
const morgan = require("morgan"); //DB Suportter
const mongoose = require("mongoose"); //DB
const app = express(); //Bu olmazsa site yok olur
const { MessageEmbed, WebhookClient } = require("discord.js");
const bodyParser = require("body-parser"); // Body Parser (Formlar için lazım)
const server = http.createServer(app); //Bu olmazsa site yok olur
const path = require("path"); //Patika (Statik için lazım)
const events = require("events"); //Online işlemler için şart
const EventEmitter = require("events").EventEmitter; //Event emitter
const em = new EventEmitter(); //Event emitter
const cookieParser = require("cookie-parser"); //Çerezleri kontrol etmek ve çerez eklemek için şart
const axios = require("axios");
app.use(cookieParser());
const port = 3000;
var tarih = new Date();

//Socket
var onlineUsers = 1;
const socketio = require("socket.io");
const io = new socketio.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//Web Socket
io.on("connection", (socket) => {
  onlineUsers++;
  console.log("Bir Kullanıcı Giriş yaptı");
  console.log(`Online Kullanıcı Sayısı : ${onlineUsers}`);

  socket.on("disconnect", () => {
    onlineUsers--;
    console.log("Bir Kullanıcı Çıkış yaptı");
  });

  socket.on("UrunEkle", (data) => {
    console.log(data);
  });
});

//Upload file
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/data");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});
const upload = multer({ storage: storage });
app.post("/stats", upload.single("uploaded_file"), function (req, res) {
  console.log(req.file, req.body);
});
//Body Parser
app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//Statik
app.use(express.static("public"));
app.set("src", "path/to/views");
app.use("/uploads", express.static("public/data"));
//MongoDB
const dbURL = process.env.db;
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    server.listen(port, () => {
      console.log("mongoDB Bağlantı kuruldu");
    });
  })
  .catch((err) => console.log(err));
//Colections
const Kullanicilar = require("./models/kullanicilar.js");
const Market = require("./models/market.js");
const Urunler = require("./models/urunler.js");
const Yorumlar = require("./models/yorumlar.js");
const Sepet = require("./models/sepet.js");
const Siparis = require("./models/siparis.js");
const Sikayet = require("./models/sikayet.js");
const Uyari = require("./models/uyari.js");
//View engine
app.set("view engine", "ejs");
//DB Support
app.use(morgan("dev"));
//Sayfalar
//Anasayfa
app.get("/", (req, res) => {
  var userId = req.cookies.id;
  Market.find().then((marketSonuc) => {
    Urunler.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .then((urunSonuc) => {
        Urunler.find()
          .count()
          .then((UrunSayiSonuc) => {
            Urunler.find({ kategori: "evesyalari" })
              .limit(4)
              .then((evEsyalariSonuc) => {
                Urunler.find({ kategori: "evesyalari" })
                  .count()
                  .then((evEsyalariSayiSonuc) => {
                    Urunler.find({ kategori: "meyveSebze" })
                      .limit(4)
                      .then((meyveSebzeSonuc) => {
                        Urunler.find({ kategori: "meyveSebze" })
                          .count()
                          .then((meyveSebzeSayiSonuc) => {
                            Urunler.find({ kategori: "kozmetik" })
                              .limit(4)
                              .then((kozmetikSonuc) => {
                                Urunler.find({ kategori: "kozmetik" })
                                  .count()
                                  .then((kozmetikSayiSonuc) => {
                                    Urunler.find({ kategori: "elektronik" })
                                      .limit(4)
                                      .then((elektronikSonuc) => {
                                        Urunler.find({ kategori: "elektronik" })
                                          .count()
                                          .then(
                                            (elektronlektronikSayiSonuc) => {
                                              if (userId != null) {
                                                Kullanicilar.findById(userId)
                                                  .then((kullaniciSonuc) => {
                                                    res.render(
                                                      __dirname +
                                                        "/src/signed/index.ejs",
                                                      {
                                                        title: "Anasayfa",
                                                        kullanici:
                                                          kullaniciSonuc,
                                                        urun: urunSonuc,
                                                        evesyalari:
                                                          evEsyalariSonuc,
                                                        meyvesebze:
                                                          meyveSebzeSonuc,
                                                        kozmetik: kozmetikSonuc,
                                                        elektronik:
                                                          elektronikSonuc,
                                                        urunsayi: UrunSayiSonuc,
                                                        evesyalarisayi:
                                                          evEsyalariSayiSonuc,
                                                        meyvesebzesayi:
                                                          meyveSebzeSayiSonuc,
                                                        kozmetiksayi:
                                                          kozmetikSayiSonuc,
                                                        elektroniksayi:
                                                          elektronikSayiSonuc,
                                                      }
                                                    );
                                                  })
                                                  .catch((err) => {
                                                    res.render(
                                                      __dirname +
                                                        "/src/pages/index.ejs",
                                                      {
                                                        title: "Anasayfa",
                                                        urun: urunSonuc,
                                                        evesyalari:
                                                          evEsyalariSonuc,
                                                        meyvesebze:
                                                          meyveSebzeSonuc,
                                                        kozmetik: kozmetikSonuc,
                                                        elektronik:
                                                          elektronikSonuc,
                                                        urunsayi: UrunSayiSonuc,
                                                        evesyalarisayi:
                                                          evEsyalariSayiSonuc,
                                                        meyvesebzesayi:
                                                          meyveSebzeSayiSonuc,
                                                        kozmetiksayi:
                                                          kozmetikSayiSonuc,
                                                        elektroniksayi:
                                                          elektronikSayiSonuc,
                                                      }
                                                    );
                                                  });
                                              } else {
                                                res.render(
                                                  __dirname +
                                                    "/src/pages/index.ejs",
                                                  {
                                                    title: "Anasayfa",
                                                    urun: urunSonuc,
                                                    evesyalari: evEsyalariSonuc,
                                                    meyvesebze: meyveSebzeSonuc,
                                                    kozmetik: kozmetikSonuc,
                                                    elektronik: elektronikSonuc,
                                                    urunsayi: UrunSayiSonuc,
                                                    evesyalarisayi:
                                                      evEsyalariSayiSonuc,
                                                    meyvesebzesayi:
                                                      meyveSebzeSayiSonuc,
                                                    kozmetiksayi:
                                                      kozmetikSayiSonuc,
                                                    elektroniksayi:
                                                      elektronikSayiSonuc,
                                                  }
                                                );
                                              }
                                            }
                                          );
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  });
});
app.get("/sepet/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Kullanicilar.findById(id)
    .then((kullaniciSonuc) => {
      Sepet.find({ kullaniciId: id }).then((sepetSonuc) => {
        Sepet.find({ kullaniciId: id })
          .count()
          .then((sepetSayiSonuc) => {
            Siparis.find({ kullanici: kullaniciSonuc.kullanici_adi }).then(
              (SiparisSonuc) => {
                Siparis.find({ kullanici: kullaniciSonuc.kullanici_adi })
                  .count()
                  .then((SiparisSayi) => {
                    if (userId != null) {
                      res.render(__dirname + "/src/signed/sepet.ejs", {
                        title: kullaniciSonuc.kullanici_adi + " Sepet",
                        sepet: sepetSonuc,
                        kullanici: kullaniciSonuc,
                        urunsayi: sepetSayiSonuc,
                        siparis: SiparisSonuc,
                        siparissayi: SiparisSayi,
                      });
                    } else {
                      res.redirect("/");
                    }
                  });
              }
            );
          });
      });
    })
    .catch((err) => {
      res.redirect("/");
    });
});
//Kategoriler
//Ev Eşyaları
app.get("/kategori/ev-esyalari", (req, res) => {
  var userId = req.cookies.id;
  Market.find().then((marketSonuc) => {
    Urunler.find()
      .sort({ createdAt: -1 })
      .then((urunSonuc) => {
        Urunler.find({ kategori: "evesyalari" }).then((evEsyalariSonuc) => {
          Urunler.find({ kategori: "evesyalari" })
            .count()
            .then((evEsyalariSonucSayi) => {
              if (userId != null) {
                Kullanicilar.findById(userId)
                  .then((kullaniciSonuc) => {
                    res.render(__dirname + "/src/signed/ev-esyalari.ejs", {
                      title: "Anasayfa",
                      kullanici: kullaniciSonuc,
                      urun: urunSonuc,
                      evesyalari: evEsyalariSonuc,
                      evesyalarisayi: evEsyalariSonucSayi,
                    });
                  })
                  .catch((err) => {
                    res.redirect("/");
                  });
              } else {
                res.render(__dirname + "/src/pages/ev-esyalari.ejs", {
                  title: "Anasayfa",
                  urun: urunSonuc,
                  evesyalari: evEsyalariSonuc,
                  evesyalarisayi: evEsyalariSonucSayi,
                });
              }
            });
        });
      });
  });
});
//Meyve Sebze
app.get("/kategori/meyve-sebze", (req, res) => {
  var userId = req.cookies.id;
  Market.find().then((marketSonuc) => {
    Urunler.find()
      .sort({ createdAt: -1 })
      .then((urunSonuc) => {
        Urunler.find({ kategori: "meyveSebze" }).then((meyveSebzeSonuc) => {
          Urunler.find({ kategori: "meyveSebze" })
            .count()
            .then((meyveSebzeSayiSonuc) => {
              if (userId != null) {
                Kullanicilar.findById(userId)
                  .then((kullaniciSonuc) => {
                    res.render(__dirname + "/src/signed/meyve-sebze.ejs", {
                      title: "Anasayfa",
                      kullanici: kullaniciSonuc,
                      urun: urunSonuc,
                      meyvesebze: meyveSebzeSonuc,
                      meyvesebzesayi: meyveSebzeSayiSonuc,
                    });
                  })
                  .catch((err) => {
                    res.redirect("/");
                  });
              } else {
                res.render(__dirname + "/src/pages/meyve-sebze.ejs", {
                  title: "Anasayfa",
                  urun: urunSonuc,
                  meyvesebze: meyveSebzeSonuc,
                });
              }
            });
        });
      });
  });
});
//Kozmetik
app.get("/kategori/kozmetik", (req, res) => {
  var userId = req.cookies.id;
  Market.find().then((marketSonuc) => {
    Urunler.find()
      .sort({ createdAt: -1 })
      .then((urunSonuc) => {
        Urunler.find({ kategori: "kozmetik" }).then((kozmetikSonuc) => {
          Urunler.find({ kategori: "kozmetik" })
            .count()
            .then((KozmetikSayiSonuc) => {
              if (userId != null) {
                Kullanicilar.findById(userId)
                  .then((kullaniciSonuc) => {
                    res.render(__dirname + "/src/signed/kozmetik.ejs", {
                      title: "Anasayfa",
                      kullanici: kullaniciSonuc,
                      urun: urunSonuc,
                      kozmetik: kozmetikSonuc,
                      kozmetiksayi: KozmetikSayiSonuc,
                    });
                  })
                  .catch((err) => {
                    res.redirect("/");
                  });
              } else {
                res.render(__dirname + "/src/pages/kozmetik.ejs", {
                  title: "Anasayfa",
                  urun: urunSonuc,
                  kozmetik: kozmetikSonuc,
                  kozmetiksayi: KozmetikSayiSonuc,
                });
              }
            });
        });
      });
  });
});
//Elektronik
app.get("/kategori/elektronik", (req, res) => {
  var userId = req.cookies.id;
  Market.find().then((marketSonuc) => {
    Urunler.find()
      .sort({ createdAt: -1 })
      .then((urunSonuc) => {
        Urunler.find({ kategori: "elektronik" }).then((elektronikSonuc) => {
          Urunler.find({ kategori: "elektronik" })
            .count()
            .then((elektronikSayiSonuc) => {
              if (userId != null) {
                Kullanicilar.findById(userId)
                  .then((kullaniciSonuc) => {
                    res.render(__dirname + "/src/signed/elektronik.ejs", {
                      title: "Anasayfa",
                      kullanici: kullaniciSonuc,
                      urun: urunSonuc,
                      elektronik: elektronikSonuc,
                      elektroniksayi: elektronikSayiSonuc,
                    });
                  })
                  .catch((err) => {
                    res.redirect("/");
                  });
              } else {
                res.render(__dirname + "/src/pages/elektronik.ejs", {
                  title: "Anasayfa",
                  urun: urunSonuc,
                  elektronik: elektronikSonuc,
                  elektroniksayi: elektronikSayiSonuc,
                });
              }
            });
        });
      });
  });
});
//Ürün sayfaları
app.get("/urun/:id", (req, res) => {
  var userId = req.cookies.id;
  var id = req.params.id;
  Urunler.findById(id).then((urunSonuc) => {
    Yorumlar.find({ urunId: id })
      .sort({ createdAt: -1 })
      .then((YorumSonuc) => {
        Yorumlar.find({ urunId: id })
          .count()
          .then((YorumSayi) => {
            if (userId != null) {
              Kullanicilar.findById(userId)
                .then((kullaniciSonuc) => {
                  res.render(__dirname + "/src/signed/urun.ejs", {
                    title: urunSonuc.baslik,
                    kullanici: kullaniciSonuc,
                    urun: urunSonuc,
                    yorum: YorumSonuc,
                    yorumsayi: YorumSayi,
                  });
                })
                .catch((err) => {
                  res.redirect("/");
                });
            } else {
              res.render(__dirname + "/src/pages/urun.ejs", {
                title: urunSonuc.baslik,
                urun: urunSonuc,
                yorum: YorumSonuc,
                yorumsayi: YorumSayi,
              });
            }
          });
      });
  });
});
//Sayfalar - Market
//Kullanıcı girişine yönlendir
app.get("/giris-yap", (req, res) => {
  res.render(__dirname + "/src/pages/giris.ejs", { title: "Giriş Yap" });
});
//Kullanıcı Kayıta yönlendir
app.get("/kayit-ol", (req, res) => {
  res.render(__dirname + "/src/pages/kayit.ejs", { title: "Kayıt Ol" });
});
//Market Görüntüleme
app.get("/market/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Market.findById(id).then((marketSonuc) => {
    Urunler.find({ marketId: marketSonuc._id })
      .sort({ createdAt: -1 })
      .then((urunlerSonuc) => {
        if (userId != null) {
          Kullanicilar.findById(userId)
            .then((kullaniciSonuc) => {
              res.render(__dirname + "/src/signed/market.ejs", {
                kullanici: kullaniciSonuc,
                market: marketSonuc,
                urun: urunlerSonuc,
                title: marketSonuc.isim,
              });
            })
            .catch((err) => {
              res.render(__dirname + "/src/pages/market.ejs", {
                market: marketSonuc,
                urun: urunlerSonuc,
                title: marketSonuc.isim,
              });
            });
        } else {
          res.render(__dirname + "/src/pages/market.ejs", {
            market: marketSonuc,
            urun: urunlerSonuc,
            title: marketSonuc.isim,
          });
        }
      });
  });
});
//Market Ürün Takip
app.get("/market/dashboard/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Kullanicilar.findById(userId).then((kullaniciSonuc) => {
    Urunler.find({ marketId: id }).then((urunlerSonuc) => {
      Market.findById(id).then((marketSonuc) => {
        Siparis.find({ marketId: id }).then((SiparisSonuc) => {
          Siparis.find({ marketId: id })
            .count()
            .then((SiparisSayi) => {
              Uyari.find({ marketId: id }).then((UyariSonuc) => {
                Uyari.find({ marketId: id }).then((UyariSayi) => {
                  if (kullaniciSonuc.marketId == id) {
                    console.log(UyariSonuc);
                    res.render(__dirname + "/src/market/dashboard.ejs", {
                      uyarisayi: UyariSayi,
                      uyarilar: UyariSonuc,
                      siparissayi: SiparisSayi,
                      kullanici: kullaniciSonuc,
                      urun: urunlerSonuc,
                      market: marketSonuc,
                      siparisler: SiparisSonuc,
                      title: marketSonuc.isim + " Dashboard",
                    });
                  } else {
                    res.redirect("/");
                  }
                });
              });
            });
        });
      });
    });
  });
});
//Admin Dashboard
app.get("/admin/dashboard", (req, res) => {
  var userId = req.cookies.id;
  Kullanicilar.findById(req.cookies.id).then((KullaniciSonuc) => {
    if (KullaniciSonuc.admin == "true") {
      Urunler.find()
        .sort({ createdAt: -1 })
        .then((UrunlerSonuc) => {
          Market.find()
            .sort()
            .then((MarketSonuc) => {
              Kullanicilar.find()
                .sort()
                .then((KullanicilarSonuc) => {
                  Kullanicilar.find({ marketAdmin: "true" })
                    .sort()
                    .then((MarketSahipleri) => {
                      Siparis.find()
                        .sort()
                        .then((SiparisSonuc) => {
                          Siparis.find()
                            .count()
                            .then((SiparisCountSonuc) => {
                              Sikayet.find()
                                .sort()
                                .then((SikayetSonuc) => {
                                  res.render(
                                    __dirname + "/src/admin/dashboard.ejs",
                                    {
                                      title: "Admin Dashboard",
                                      kullanici: KullaniciSonuc,
                                      urun: UrunlerSonuc,
                                      market: MarketSonuc,
                                      kullanicilar: KullanicilarSonuc,
                                      marketSahip: MarketSahipleri,
                                      onlineKullanici: onlineUsers,
                                      siparisler: SiparisSonuc,
                                      siparissayi: SiparisCountSonuc,
                                      sikayet: SikayetSonuc,
                                    }
                                  );
                                  console.log(KullaniciSonuc.kullanici_adi);
                                });
                            });
                        });
                    });
                });
            });
        });
    } else {
      res.redirect("/");
    }
  });
});
//Market Ekleme
app.post("/market/ekle", (req, res) => {
  var market = new Market({
    isim: req.body.isim,
    logo: req.body.logo,
  });
  market.save().then((Sonuc) => {
    res.redirect("/admin/dashboard");
  });
});
//Kullanıcı Silme
app.post("/kullanici/sil/:id", (req, res) => {
  var id = req.params.id;
  Kullanicilar.findByIdAndDelete(id).then((Sonuc) => {
    res.redirect("/admin/dashboard/");
  });
});
//Kullanıcı Düzenle
//User Side
app.get("/kullanici/ayarlar/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Kullanicilar.findById(id).then((kullaniciSonuc) => {
    if (kullaniciSonuc._id == userId) {
      res.render(__dirname + "/src/signed/settings.ejs", {
        title: "Kullanıcı Ayarları",
        kullanici: kullaniciSonuc,
      });
    } else {
      res.send("Güvenlik Uyarısı");
    }
  });
});
//Admin Side
app.post("/kullanici/duzenleme/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Kullanicilar.findById(id).then((Sonuc) => {
    Kullanicilar.findById().then((AdminSonuc) => {
      res.render(__dirname + "/src/admin/kullanici-duzenle.ejs", {
        title: Sonuc.kullanici_adi + " düzenle",
        kullanici: AdminSonuc,
        kullanicilar: Sonuc,
      });
    });
  });
});
//Admin
app.post("/kullanici/duzenle/:id", (req, res) => {
  var id = req.params.id;
  Kullanicilar.findByIdAndUpdate(id, {
    kullanici_adi: req.body.kullanici_adi,
    sifre: req.body.sifre,
    email: req.body.email,
    admin: req.body.admin,
    marketAdmin: req.body.marketAdmin,
    marketId: req.body.marketId,
    market: req.body.market,
  }).then((Sonuc) => {
    res.redirect("/admin/dashboard");
  });
});
//User
app.post("/kullanici/duzenleme/user/:id", (req, res) => {
  Kullanicilar.findOne(
    { kullanici_adi: req.body.kullanici_adi },
    (err, kullanici) => {
      if (kullanici) {
        res.send(
          `Bu kullunıcı adı kullanılmakta <a href="/kullanici/ayarlar/${req.cookies.id}">Geri Dön</a>`
        );
      } else {
        var id = req.params.id;
        Kullanicilar.findByIdAndUpdate(id, {
          kullanici_adi: req.body.kullanici_adi,
          sifre: req.body.sifre,
          email: req.body.email,
          admin: req.body.admin,
          marketAdmin: req.body.marketAdmin,
          marketId: req.body.marketId,
          market: req.body.market,
        }).then((Sonuc) => {
          console.log("anan");
          res.redirect("/kullanici/ayarlar/" + Sonuc._id);
        });
      }
    }
  );
});
//Markete Ürün ekleme
app.post("/urun/ekle/:id", upload.single("uploaded_file"), (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Kullanicilar.findById(userId).then((kullaniciSonuc) => {
    Market.findById(id).then((marketSonuc) => {
      var urun = new Urunler({
        fiyat: req.body.fiyat,
        baslik: req.body.baslik,
        aciklama: req.body.urunaciklama,
        marketId: id,
        market: marketSonuc.isim,
        kategori: req.body.kategori,
        foto: req.file.filename,
        stok: req.body.stok,
      });
      urun.save().then((urunSonuc) => {
        res.redirect("/market/dashboard/" + id);
      });
    });
  });
});
//Konum Ekleme
app.post("/adres-ekle/:id", (req, res) => {
  var id = req.params.id;
  Kullanicilar.findByIdAndUpdate(id, {
    adres: req.body.il + "," + req.body.ilce + "," + req.body.mah,
    tel: req.body.telno,
  }).then((KullaniciSonuc) => {
    res.redirect("/sepet/" + id);
  });
});
//Marketten Ürün kaldırma
app.post("/urun/sil/:id", (req, res) => {
  var id = req.params.id;
  Kullanicilar.findById(req.cookies.id).then((kullaniciSonuc) => {
    Sepet.find({ urunId: id })
      .count()
      .then((SepetSil) => {
        Siparis.find({ urunId: id })
          .count()
          .then((SiparisSil) => {
            Urunler.findByIdAndDelete(id).then((urunSonuc) => {
              Yorumlar.find({ urunId: id })
                .count()
                .then((YorumSil) => {
                  for (var i = 0; i < SepetSil; i++) {
                    Sepet.findOneAndDelete({ urunId: id }).then(
                      (SepetSilMesaj) => {
                        console.log(`${i}.Sepete Eklenen Silindi`);
                      }
                    );
                  }
                  for (var i = 0; i < SiparisSil; i++) {
                    Siparis.findOneAndDelete({ urunId: id }).then(
                      (SiparisSilMesaj) => {
                        console.log(`${i}.Ürün Sipariş Silindi`);
                      }
                    );
                  }
                  for (var i = 0; i < YorumSil; i++) {
                    Yorumlar.findOneAndDelete({ urunId: urunSonuc._id }).then(
                      (Mesaj) => {
                        console.log(`${i}.Yorum Silindi`);
                      }
                    );
                  }
                  res.redirect("/market/dashboard/" + kullaniciSonuc.marketId);
                });
            });
          });
      });
  });
});
//Markette ki ürünü güncelleme
app.post("/urun/duzenleme/:id", (req, res) => {
  var id = req.params.id;
  Kullanicilar.findById(req.cookies.id).then((kullaniciSonuc) => {
    Urunler.findById(id).then((urunSonuc) => {
      res.render(__dirname + "/src/market/urun-duzenle.ejs", {
        urun: urunSonuc,
        kullanici: kullaniciSonuc,
        title: urunSonuc.baslik + " Düzenle",
      });
    });
  });
});
app.post("/urun/duzenle/:id", (req, res) => {
  var id = req.params.id;
  Kullanicilar.findById(req.cookies.id).then((kullaniciSonuc) => {
    Market.findById(kullaniciSonuc.marketId).then((marketSonuc) => {
      Urunler.findByIdAndUpdate(id, {
        fiyat: req.body.fiyat,
        baslik: req.body.baslik,
        aciklama: req.body.urunaciklama,
        kategori: req.body.kategori,
        stok: req.body.stok,
      }).then((urunSonuc) => {
        res.redirect("/market/dashboard/" + urunSonuc.marketId);
      });
    });
  });
});
//Ürün arama
app.post("/urun/arama", (req, res) => {
  var sonuc = req.body.arama;
  var userId = req.cookies.id;
  Market.find().then((marketSonuc) => {
    Urunler.find({ baslik: sonuc })
      .sort({ createdAt: -1 })
      .then((urunSonuc) => {
        Urunler.find({ baslik: sonuc })
          .count()
          .then((urunSonucSayi) => {
            if (userId != null) {
              Kullanicilar.findById(userId)
                .then((kullaniciSonuc) => {
                  res.render(__dirname + "/src/signed/arama.ejs", {
                    title: "Anasayfa",
                    kullanici: kullaniciSonuc,
                    urun: urunSonuc,
                    urunsayi: urunSonucSayi,
                  });
                })
                .catch((err) => {
                  res.redirect("/");
                });
            } else {
              res.render(__dirname + "/src/pages/arama.ejs", {
                title: "Anasayfa",
                urun: urunSonuc,
                urunsayi: urunSonucSayi,
              });
            }
          });
      });
  });
});
//Ürün takip
app.post("/siparis-et/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Sepet.findById(id).then((SepetSonuc) => {
    Market.findById(SepetSonuc.marketId).then((MarketSonuc) => {
      Kullanicilar.findById(userId).then((KullaniciSonuc) => {
        var siparis = new Siparis({
          marketId: MarketSonuc._id,
          urun: SepetSonuc.urun,
          urunId: SepetSonuc.urunId,
          kullanici: KullaniciSonuc.kullanici_adi,
          adres: KullaniciSonuc.adres,
          sepetId: id,
          durum: "iletildi",
          market: MarketSonuc.isim,
          marketId: MarketSonuc._id,
          tarih: `${tarih.getFullYear()}-${tarih.getMonth()}-${tarih.getDate()} ${tarih.getHours()}:${tarih.getMinutes()}`,
        });
        siparis.save().then((Sonuc) => {
          Sepet.findByIdAndUpdate(id, {
            durum: "iletildi",
          }).then((SepetSonucc) => {
            res.redirect("/sepet/" + userId);
          });
        });
      });
    });
  });
});
//Sipariş Gönderildi (SİLİNDİ)
app.post("/siparis/sil/:id", (req, res) => {
  var id = req.params.id;
  Siparis.findByIdAndDelete(id).then((Sonuc) => {
    Urunler.findById(Sonuc.urunId).then((UrunSonuc) => {
      Sepet.findByIdAndDelete(Sonuc.sepetId).then((SepetSonuc) => {
        console.log("Ürün ulaştırıldı ve Sepetten kaldırıldı");
      });
      var stok = UrunSonuc.stok;
      stok--;
      Urunler.findByIdAndUpdate(Sonuc.urunId, {
        stok: stok,
      }).then((Guncelle) => {
        console.log("Stok Güncellendi");
      });
    });
    res.redirect("/market/dashboard/" + Sonuc.marketId);
  });
});
//Sipariş İptal
app.post("/siparis/iptal/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Siparis.findByIdAndDelete(id).then((Sonuc) => {
    Sepet.findByIdAndUpdate(Sonuc.sepetId, {
      durum: "false",
    }).then((Yonlendir) => {
      res.redirect(`/sepet/${userId}`);
    });
  });
});
//Ürünü Sepete ekleme
app.post("/sepete/ekle/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Urunler.findById(id).then((urunSonuc) => {
    var sepet = new Sepet({
      marketId: urunSonuc.marketId,
      market: urunSonuc.market,
      urun: urunSonuc.baslik,
      urunId: urunSonuc._id,
      fiyat: urunSonuc.fiyat,
      kullaniciId: userId,
    });
    sepet.save().then((sonuc) => {
      res.redirect("/sepet/" + userId);
    });
  });
});
//Sepetten çıkarma
app.post("/sepetten/kaldir/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Sepet.findByIdAndDelete(id).then((sonuc) => {
    Siparis.findOneAndDelete({ sepetId: id }).then((Sil) => {
      res.redirect("/sepet/" + userId);
    });
  });
});

app.post("/sepeti/temizle", (req, res) => {
  var userId = req.cookies.id;
  Kullanicilar.findById(userId).then((Sonuc) => {
    Sepet.find({ kullaniciId: Sonuc._id })
      .count()
      .then((Sil) => {
        Siparis.find({ kullanici: Sonuc.kullanici_adi })
          .count()
          .then((SilSiparis) => {
            for (var i = 0; i < SilSiparis; i++) {
              Siparis.findOneAndDelete({ kullanici: Sonuc.kullanici_adi }).then(
                (MesajSiparis) => {
                  console.log(`${i}.Sipariş Silindi`);
                }
              );
            }
            for (var i = 0; i < Sil; i++) {
              Sepet.findOneAndDelete({ kullaniciId: Sonuc._id }).then(
                (Mesaj) => {
                  console.log(`${i}.Sepetteki ürün Silindi`);
                }
              );
            }
            res.redirect("/sepet/" + userId);
          });
      });
  });
});
//Kayıt Olmak
app.post("/kayit", (req, res) => {
  Kullanicilar.findOne(
    { kullanici_adi: req.body.username },
    (err, kullanici) => {
      if (kullanici) {
        res.send(
          'Bu kullunıcı adı kullanılmakta <a href="/kayit-ol">Geri Dön</a>'
        );
      } else {
        var kullanici = new Kullanicilar({
          kullanici_adi: req.body.username,
          sifre: req.body.sifre,
          email: req.body.email,
          adres: "false",
          liyakat: 100,
          $push: { begeni: "BEĞENİ YOK" },
        });
        kullanici.save().then((KullaniciSonuc) => {
          res.cookie("id", KullaniciSonuc._id);
          res.redirect("/");
        });
      }
    }
  );
});
//Kullanıcı girişi
app.post("/giris", (req, res) => {
  var sifre = req.body.sifre;
  var username = req.body.username;
  Kullanicilar.findOne({ kullanici_adi: username, sifre: sifre })
    .then((KullaniciSonuc) => {
      res.cookie("id", KullaniciSonuc._id);
      res.redirect("/");
    })
    .catch((err) => {
      res.send("Böyle bir kullanıcı Yok");
    });
});
//Kullanıcı Ayarları

//Çıkış yapma
app.get("/cikis-yap", (req, res) => {
  res.clearCookie("id");
  res.redirect("/");
  res.end();
});
//Şikayet Sistemi
//Market Şikayet
app.post("/sikayet-et/market/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Market.findById(id).then((MarketSonuc) => {
    Kullanicilar.findById(userId).then((KullaniciSonuc) => {
      var sikayet = new Sikayet({
        sikayetci: KullaniciSonuc.kullanici_adi,
        sikayetciId: KullaniciSonuc._id,
        market: MarketSonuc.isim,
        marketId: id,
        kategori: req.body.kategori,
        sikayet: req.body.sikayet,
      });
      sikayet.save().then((Sonuc) => {
        console.log(`[!] ${MarketSonuc.isim} Marketi Şikayet Edildi`);
        console.log(`Kategori : ${req.body.kategori}`);
        console.log(`Şikayet : ${req.body.sikayet}`);
        res.redirect("/");
      });
    });
  });
});
//Kullanıcı Şikayet
app.post("/sikayet-et/kullanici/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Kullanicilar.findById(id).then((KullanicilarSonuc) => {
    Kullanicilar.findById(userId).then((KullaniciSonuc) => {
      var sikayet = new Sikayet({
        sikayetci: KullaniciSonuc.kullanici_adi,
        sikayetciId: KullaniciSonuc._id,
        kullanici: KullanicilarSonuc.isim,
        kullaniciId: id,
        kategori: req.body.kategori,
        sikayet: req.body.sikayet,
      });
      sikayet.save().then((Sonuc) => {
        console.log(
          `[!] ${KullanicilarSonuc.kullanici_adi} Adlı Kullanıcı Şikayet Edildi`
        );
        console.log(`Kategori : ${req.body.kategori}`);
        console.log(`Şikayet : ${req.body.sikayet}`);
        res.redirect("/");
      });
    });
  });
});
//Liyakat Sistemi
app.post("/market/cezalandir/:id", (req, res) => {
  var id = req.params.id;
  Market.findById(id).then((MarketSonuc) => {
    var liyakat = MarketSonuc.liyakat;
    liyakat = liyakat - 20;
    Market.findByIdAndUpdate(id, {
      liyakat: liyakat,
    }).then((Sonuc) => {
      Sikayet.findOneAndDelete({ marketId: id }).then((SikayetiKaldir) => {
        var uyari = new Uyari({
          kategori: "Dolandırıcılık",
          marketId: Sonuc._id,
          market: Sonuc.isim,
          mesaj: Sikayet.sikayet,
        });
        uyari.save().then((UyariSonuc) => {
          res.redirect("/admin/dashboard");
        });
      });
    });
  });
});
//Şikayeti Görmezden gelmek
//Kullanıcı
app.post("/sikayet/sil/kullanici/:id", (req, res) => {
  var id = req.params.id;
  Sikayet.findByIdAndDelete(id).then((Sonuc) => {
    res.redirect("/admin/dashboard");
  });
});
//Market
app.post("/sikayet/sil/market/:id", (req, res) => {
  var id = req.params.id;
  Sikayet.findByIdAndDelete(id).then((Sonuc) => {
    res.redirect("/admin/dashboard");
  });
});
//Yorum sistemi
//Yorum Ekle
app.post("/yorum/ekle/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Urunler.findById(id).then((Sonuc) => {
    Kullanicilar.findById(userId).then((KullaniciSonuc) => {
      var yorum = new Yorumlar({
        urunId: Sonuc._id,
        kullanici_adi: KullaniciSonuc.kullanici_adi,
        mesaj: req.body.mesaj,
        like: 0,
      });
      yorum.save().then((YorumKaydet) => {
        res.redirect("/urun/" + id);
      });
    });
  });
});
//Yorumu Sil
app.post("/yorum/sil/:id", (req, res) => {
  var id = req.params.id;
  Yorumlar.findByIdAndDelete(id).then((Sonuc) => {
    res.redirect("/urun/" + Sonuc.urunId);
  });
});
//Market Silme ve Ceza Sistemi
app.post("/market/sil/:id", (req, res) => {
  var id = req.params.id;
  Market.findByIdAndDelete(id).then((Sonuc) => {
    Urunler.find({ marketId: id })
      .count()
      .then((UrunSonuc) => {
        for (var i = 0; i < UrunSonuc; i++) {
          Urunler.findOneAndDelete({ marketId: id }).then((Mesaj) => {
            console.log(`${i}.Ürün Silindi`);
          });
        }
        res.redirect("/admin/dashboard");
      });
  });
});
//Market Ceza Kaldırma
app.post("/market/ceza/kaldir/:id", (req, res) => {
  var id = req.params.id;
  Market.findByIdAndUpdate(id, {
    liyakat: 100,
  }).then((Sonuc) => {
    Uyari.find({ marketId: id })
      .count()
      .then((UyariSayiSonuc) => {
        for (var i = 0; i < UyariSayiSonuc; i++) {
          Uyari.findOneAndDelete({ marketId: id }).then((Mesaj) => {
            console.log(`${i}.uyarı silindi`);
          });
        }
        res.redirect("/admin/dashboard");
      });
  });
});
//Oy Ve Beğeni Sistemi
app.post("/yorum/begen/:id", (req, res) => {
  var id = req.params.id;
  var userId = req.cookies.id;
  Kullanicilar.findById(userId).then((KullaniciSonuc) => {
    var begeni = KullaniciSonuc.begeni;
    Yorumlar.findById(id).then((Sonuc) => {
      var like = Sonuc.like;
      like++;
      for (var i = 0; i < begeni.length; i++) {
        console.log("Bu Yorum Beğenilmemiş");
        if (KullaniciSonuc.begeni[i] == id) {
          Yorumlar.findByIdAndUpdate(id, {
            like: Sonuc.like,
          }).then((Yonlendir) => {
            console.log("Bu Yorum Beğenilmiş");
            res.redirect(`/urun/${Sonuc.urunId}`);
          });
        } else if (KullaniciSonuc.begeni[i] != id) {
          Yorumlar.findByIdAndUpdate(id, {
            like: like,
          }).then((BegeniSonuc) => {
            Kullanicilar.findByIdAndUpdate(userId, {
              $push: { begeni: `${id}` },
              kullanici_adi: KullaniciSonuc.kullanici_adi,
            }).then((GuncelSonuc) => {
              res.redirect(`/urun/${Sonuc.urunId}`);
            });
          });
        }
      }
    });
  });
});
