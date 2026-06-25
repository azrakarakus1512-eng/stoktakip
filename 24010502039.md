# Stitch Stok Takip Uygulaması

Bu proje, mobil öncelikli (mobile-first), modern ve kullanıcı dostu bir **Stok Yönetim ve Envanter Takip Uygulaması**dır. Uygulama, hem sunucusuz (tamamen tarayıcı üzerinde çalışan) hem de yerel sunucu/SQLite veritabanı destekli olmak üzere çift katmanlı bir mimariyle geliştirilmiştir.

Uygulama, **AZRA KARAKUŞ** tarafından oluşturulmuştur.

---

## 🚀 Temel Özellikler

- **Gelişmiş Arama ve Filtreleme**: Ürün marka ve model bilgisine göre anlık arama yapabilir; stok durumuna göre (*Tükendi*, *Kritik*, *Azalan*, *Yeterli*) filtreleme yapabilirsiniz.
- **Marka Filtre Çekmecesi (Navigation Drawer)**: Sol üstteki menü butonundan açılan panel aracılığıyla envanterinizdeki benzersiz markaları görebilir ve tek tıkla filtreleyebilirsiniz.
- **Detaylı İşlem Geçmişi (GEÇMİŞ İŞLEMLER)**: Her ürünün detay kartında, yapılan satışların ve stok girişlerinin marka, model ve seri no bilgileriyle beraber geçmiş dökümünü inceleyebilirsiniz.
- **Görsel Desteği**: Ürünlerinize resim yükleyebilir, yüklenmeyen veya hatalı resimler için otomatik yedek görsel (placeholder) desteğini kullanabilirsiniz.
- **Kritik Stok Banner'ı**: Stok seviyesi kritik durumda (1-2 adet) olan veya tükenen ürünler için ana ekranda otomatik uyarı kutusu gösterilir.

---

## 🛠️ Çift Katmanlı Yapı (Dual Architecture)

### 1. Statik Sürüm (`index.html` - Kök Dizin)
Tarayıcı tabanlı bağımsız çalışan sürümdür. Herhangi bir sunucu kurulumu gerektirmeden doğrudan tarayıcı üzerinden açılabilir.
- **Veri Depolama**: Veriler tamamen tarayıcının `localStorage` alanında saklanır. Sayfa yenilendiğinde veriler kaybolmaz.
- **GitHub Pages Uyumlu**: Hiçbir ek işlem yapmadan GitHub Pages üzerinde ücretsiz olarak yayına alınabilir.

### 2. SQLite Veritabanı Destekli Sürüm (`public/index.html` & `server.js`)
Yerel ağda veya bilgisayarınızda çalıştırabileceğiniz sunucu tabanlı sürümdür.
- **Veri Depolama**: Ürünler ve işlem geçmişleri `stock.db` adında yerel bir SQLite veritabanında saklanır.
- **Görsel Dosyaları**: Yüklenen ürün resimleri Base64 formatı yerine `./public/uploads` klasörüne dosya olarak kaydedilir.

---

## 💻 Yerel Sunucuyu Çalıştırma

Sunucu tabanlı sürümü yerel bilgisayarınızda çalıştırmak için:

1. Proje dizininde terminali açın.
2. Aşağıdaki komutla yerel node sunucusunu başlatın:
   ```bash
   node server.js
   ```
   *(Eğer taşınabilir node kullanıyorsanız `./node-portable/node-v20.20.2-win-x64/node.exe server.js` komutunu çalıştırabilirsiniz.)*
3. Tarayıcınızdan **`http://localhost:3000`** adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

---

## 🌐 GitHub Pages ile Canlıya Alma

Uygulamanın statik sürümünü GitHub Actions aracılığıyla otomatik olarak yayına almak için hazır iş akışı yapılandırması kurulmuştur:

1. Bu projeyi kendi GitHub hesabınızda bir repository'e yükleyin (`git push`).
2. GitHub repository sayfanızda **Settings (Ayarlar) -> Pages** sekmesine gidin.
3. **Build and deployment** başlığı altındaki **Source** ayarını **GitHub Actions** olarak seçin.
4. `main` dalına yapacağınız her güncellemede uygulamanız otomatik olarak derlenecek ve canlıya alınacaktır.

---

*Geliştirici Notu: Tasarımlar modern HSL renk paletleri, akıcı animasyonlar ve şık tipografi standartları (Google Fonts - Hanken Grotesk) kullanılarak premium bir deneyim hedeflenerek kodlanmıştır.*
