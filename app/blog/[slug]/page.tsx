import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DynamicBlogPost from './DynamicBlogPost'

interface Post {
  slug: string
  cat: string
  title: string
  date: string
  isoDate: string
  readTime: string
  excerpt: string
  img: string
  content: string[]
}

const ALL_POSTS: Post[] = [
  {
    slug: 'hidrofor-grubu-boyutlandirma',
    cat: 'Teknik Rehber',
    title: 'Hidrofor Grubu Boyutlandırma Rehberi',
    date: '4 Haz 2026',
    isoDate: '2026-06-04',
    readTime: '7 dk',
    excerpt: 'Hidrofor grubu seçiminde doğru debi, basınç ve tank hacmi hesabı — adım adım boyutlandırma kılavuzu.',
    img: '/assets/ımages/A_blue_ductile_iron_flanged_202606042012.jpeg',
    content: [
      'Hidrofor grupları; binalarda yeterli su basıncı ve debi sağlamak amacıyla kullanılan basınçlandırma sistemleridir. Hatalı boyutlandırma hem enerji israfına hem de yetersiz su basıncı şikâyetlerine yol açar. Bu rehberde doğru hidrofor grubu seçiminin adımlarını ele alıyoruz.',
      '**1. İhtiyaç Debisi Hesabı\nBinanın toplam su tüketimi, bağlı armatür sayısı ve eş zamanlılık katsayısına göre belirlenir. Konut projelerinde TS 825 ve ilgili yönetmelik referans alınır. Hesaplanan pik debi, pompanın nominal çalışma noktasını belirler.',
      '**2. Gerekli Basınç Tespiti\nEn yüksek kottaki en uzak armatür için gerekli minimum basınç hesaplanır. Boru kayıpları, yükseklik farkı ve armatür bağlantı basıncı toplamı hidroforun üretmesi gereken toplam manometrik yüksekliği verir.',
      '**3. Pompa Eğrisi Seçimi\nHesaplanan debi ve basınç değerleri pompa karakteristik eğrisi üzerinde işaretlenir. Çalışma noktası pompa eğrisinin verimli bölgesinde (genellikle %70-80 bölgesinde) konumlandırılmalıdır. Bu bölge dışında çalışan pompalar hem verimsiz hem de kısa ömürlü olur.',
      '**4. Genleşme Tankı Boyutu\nSistem hacmi, çalışma basıncı aralığı ve kabul edilebilir basınç dalgalanmasına göre diyaframlı genleşme tankı kapasitesi hesaplanır. Küçük seçilen tank, hidroforun sık start-stop yapmasına (short-cycling) neden olarak motor ömrünü kısaltır.',
      '**5. Frekans İnvertörü (VFD)\nDeğişken debili sistemlerde sabit devirli pompa yerine frekans invertörlü hidrofor grubu seçilmesi, pompa enerji tüketimini %40-60 oranında düşürür. Özellikle rezidans ve karma kullanım projelerinde yatırımı 2-3 yılda amorti edilir.',
      '**6. Kontrol ve Emniyet\nBasınç sensörü, otomatik yeniden başlatma, kuru çalışma koruması ve alarm çıkışları standart hidrofor panosu özellikleridir. CE belgeli ve TSE uyumlu kontrol paneli seçilmesi denetim süreçlerinde zorunludur.',
    ],
  },
  {
    slug: 'tse-ce-belgelendirme',
    cat: 'Teknik Rehber',
    title: 'TSE ve CE Belgelendirmesi: Mekanik Tesisat Ürünlerinde Önemi',
    date: '4 Haz 2026',
    isoDate: '2026-06-04',
    readTime: '6 dk',
    excerpt: 'Mekanik tesisat ürünlerinde TSE belgesi ve CE işaretinin ne anlama geldiği, neden zorunlu olduğu ve nasıl sorgulandığı.',
    img: '/assets/ımages/vana.png',
    content: [
      'Mekanik tesisat projelerinde kullanılan ürünler; yangın güvenliği, bina denetimi ve sigorta süreçleri açısından belgelendirme zorunluluğuna tabidir. TSE belgesi ve CE işareti bu alanda en sık karşılaşılan iki sertifikasyon mekanizmasıdır.',
      '**TSE Belgesi Nedir?\nTürk Standartları Enstitüsü (TSE) belgesi; bir ürünün ilgili Türk standardını karşıladığını belgeleyen ulusal uygunluk işaretidir. Yurt içi üretim veya ithal ürünlere verilebilir. Kamu ihalelerinde ve yangın sistemleri projelendirmesinde TSE belgeli ürün şartı çoğunlukla zorunludur.',
      '**CE İşareti Nedir?\nCE işareti, Avrupa Birliği direktiflerine uygunluğu gösterir. Üretici sorumluluğunda yapılan teknik dosya hazırlığı ve gerektiğinde onaylanmış kuruluş (Notified Body) denetimiyle kazanılır. Türkiye\'de de bir çok ürün kategorisinde CE işareti zorunludur.',
      '**Hangi Ürünlerde Zorunludur?\nYangın söndürme ekipmanları (sprinkler, hidrant, yangın pompası), basınçlı kaplar, emniyet vanaları, boru bağlantı elemanları ve elektrikli ekipmanlarda TSE ve/veya CE uygunluğu yasal zorunluluk veya ihale şartnamesi gereğidir. Belgesiz ürün kabul görmez ve sigorta geçersiz sayılabilir.',
      '**Belge Sorgulama Nasıl Yapılır?\nTSE belgeleri tse.org.tr adresinden ürün adı, belge numarası veya firma bilgisiyle sorgulanabilir. CE uygunluk beyanı üreticiden yazılı olarak talep edilmeli, teknik dosya ve test raporları da istenebilir. Sahte veya süresi dolmuş belgelerle karşılaşmamak için tedarikçiden güncel belge kopyası mutlaka alınmalıdır.',
      '**Tedarik Sürecinde Dikkat Edilecekler\nFiyat avantajı sunan belgesiz ürünler kısa vadede cazip görünse de proje onayı, sigorta tazminatı ve hukuki sorumluluk açısından ciddi riskler taşır. Güvenilir tedarikçilerden temin edilen, belgesi güncel ve izlenebilir ürünler her zaman doğru tercihtir.',
    ],
  },
  {
    slug: 'yangin-pompasi-secimi',
    cat: 'Yangın Sistemleri',
    title: 'Yangın pompası seçiminde dikkat edilmesi gereken 5 kriter',
    date: '12 Mayıs 2026',
    isoDate: '2026-05-12',
    readTime: '6 dk',
    excerpt: 'Doğru debi ve basınç hesabından sertifika uyumuna, yangın pompası seçerken atlanmaması gereken teknik kriterleri derledik.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop',
    content: [
      'Yangın söndürme sistemlerinin kalbi olan pompalar, yanlış seçildiğinde sistemin tamamını işlevsiz kılabilir. NFPA 20 ve TS EN 12845 standartlarına göre yangın pompası seçiminde beş temel kritere dikkat etmek gerekir.',
      '**1. Debi ve Basınç Hesabı**\nSistemde gerekli debi (l/dak) ve çalışma basıncı (bar) doğru hesaplanmalıdır. Bina tipi, kat sayısı ve sprinkler konfigürasyonu bu hesabı doğrudan etkiler. Düşük debide seçilen pompa kritik anlarda yetersiz kalır.',
      '**2. Motorlu ve Dizel Yedek**\nUlusal yönetmeliklere göre yangın pompası setlerinde elektrik motoru ile birlikte dizel yedek pompa zorunludur. Şebeke kesilmesinde sistemi ayakta tutacak olan bu yedek pompa, ana pompayla aynı debi-basınç eğrisine sahip olmalıdır.',
      '**3. Sertifika ve UL/FM Uyumu**\nYangın güvencesi için UL veya FM sertifikalı pompalar tercih edilmeli, TSE belgesi kontrol edilmelidir. Sertifikasız ürün sigortacı ve denetçi tarafından kabul görmez.',
      '**4. Kavitasyon Analizi**\nÜretici eğrilerinden NPSH gereksinimi hesaplanmalı; sürük mesafesi ve giriş basıncı buna göre tasarlanmalıdır. Kavitasyon hem performansı düşürür hem de pompaya kalıcı zarar verir.',
      '**5. Bakım ve Yedek Parça Erişilebilirliği**\nSahada kolay temin edilebilir yedek parça, periyodik bakım kolaylığı ve yetkili servis ağı uzun vadeli güvenilirlik açısından kritiktir. Yerli servis ağı olmayan markaları büyük projelerde tercih etmemeye özen gösterin.',
    ],
  },
  {
    slug: 'vana-tipleri-rehberi',
    cat: 'Teknik Rehber',
    title: 'Vana tipleri ve doğru uygulama alanları rehberi',
    date: '28 Nis 2026',
    isoDate: '2026-04-28',
    readTime: '8 dk',
    excerpt: 'Küresel, kelebek, çekvalf ve kontrol vanalarının farkları ve hangi uygulamada hangisi kullanılmalı.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&fit=crop',
    content: [
      'Mekanik tesisat projelerinde yüzlerce çeşit vana kullanılmaktadır. Doğru vana seçimi hem sistem verimliliğini hem de ömrünü doğrudan etkiler. En yaygın vana tiplerini ve kullanım alanlarını inceleyelim.',
      '**Küresel Vana (Ball Valve)**\nYarım tur döndürme ile tam açık/kapalı konum sağlar. Çabuk izolasyon gerektiren hatlar, soğuk ve sıcak su sistemleri, gaz tesisatları için idealdir. Kelebek vanaya göre daha sızdırmaz bir kapatma sağlar.',
      '**Kelebek Vana (Butterfly Valve)**\nBüyük çaplı boru hatlarında yer tasarrufu ve düşük basınç kaybı avantajı sunar. DN150 ve üzeri soğutma suyu, yangın suyu dönüş hatları ve HVAC sistemlerinde yaygın kullanılır.',
      '**Globe Vana**\nAkış ayarı gereken uygulamalar için tercih edilir. Kısma ve debi kontrolü mükemmeldir ancak yüksek basınç kaybı nedeniyle izolasyon amacıyla kullanılmamalıdır.',
      '**Çek Valf (Check Valve)**\nTers akışı önlemek için kullanılır. Pompa çıkışlarına, kazan bağlantılarına ve birden fazla kaynak içeren sistemlere mutlaka yerleştirilmelidir.',
      '**Kontrol Vanası (Control Valve)**\nOtomatik debi ve basınç kontrolü sağlar. Isıtma/soğutma eşanjörü girişlerine, hidronik sistemlere ve proses tesisatlarına uygulanır. Aktüatör seçiminde sinya tipi (0-10V, 4-20mA) ve fail-safe pozisyonuna dikkat edilmelidir.',
    ],
  },
  {
    slug: 'enerji-verimli-isitma-iptiplari',
    cat: 'Isıtma & Soğutma',
    title: 'Enerji verimli ısıtma sistemleri için 7 ipucu',
    date: '15 Nis 2026',
    isoDate: '2026-04-15',
    readTime: '5 dk',
    excerpt: 'Kazan dairesinden kollektör grubuna, enerji maliyetini düşüren pratik uygulamalar.',
    img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=85&fit=crop',
    content: [
      'Isıtma sistemleri toplam enerji tüketiminin büyük bölümünü oluşturur. Doğru ekipman seçimi ve sistem optimizasyonuyla yıllık enerji faturasını %25-40 oranında düşürmek mümkündür.',
      '**1. Yoğuşmalı Kazan Kullanımı**\nGeleneksel kazana kıyasla %15-20 daha az yakıt tüketen yoğuşmalı kazanlar, dönüş suyu sıcaklığı 55°C\'nin altında tutulduğunda tam verimle çalışır.',
      '**2. Değişken Hızlı Sirkülasyon Pompası**\nSabit devirli pompa yerine frekans invertörlü (EC motorlu) pompa kullanmak pompa enerji tüketimini %60-70 azaltır. Yatırımı 2-3 yılda amortize olur.',
      '**3. Klimatik Kontrol (Dış Hava Bağımlı Kontrol)**\nKazan çıkış suyunu dış hava sıcaklığına bağlı olarak ayarlayan otomasyon sistemi, ısıtma enerjisini talebe göre optimize eder.',
      '**4. Boru Yalıtımı**\nDağıtım borularında yetersiz yalıtım ciddi ısı kayıplarına yol açar. TS 825\'e göre minimum yalıtım kalınlıkları hesaplanmalı; özellikle bodrum ve çatı arasındaki hatlara dikkat edilmelidir.',
      '**5. Dengeleme Vanalarının Devreye Alınması**\nKollektörlerden beslenen devreler arasında hidrolik dengeleme yapılmadan bazı devreler aşırı ısıtılırken diğerleri yetersiz ısı alır. Bu durum hem konfor hem de enerji açısından sorun yaratır.',
      '**6. Genleşme Tankı Kontrolü**\nÇalışma basıncının üzerinde pompalama yapılan sistemlerde emniyet ventilleri açılarak enerji ve su israfı oluşur. Doğru boyutlandırılmış diyaframlı genleşme tankı bu sorunu önler.',
      '**7. Periyodik Bakım**\nKazan yakma ayarı, ısı transfer yüzeyleri ve baca gazı analizi yılda bir kez yapılmalıdır. Kirli bir ısıtma yüzeyi verimi %15-20 düşürebilir.',
    ],
  },
  {
    slug: 'sprinkler-tasarim-kurallari',
    cat: 'Yangın Sistemleri',
    title: 'Sprinkler sistemi tasarımında temel kurallar',
    date: '2 Nis 2026',
    isoDate: '2026-04-02',
    readTime: '7 dk',
    excerpt: 'Bina tipine göre sprinkler yerleşimi, alan hesabı ve yönetmelik gereklilikleri.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop',
    content: [
      'Sprinkler sistemleri hayat kurtaran kritik altyapılardır. Türkiye\'de Binaların Yangından Korunması Hakkında Yönetmelik ve NFPA 13 esas alınarak tasarlanır.',
      '**Kullanım Sınıfı ve Konfigürasyon**\nBina kullanım amacına göre hafif tehlike (konut, ofis), orta tehlike (ticaret, depo) ve yüksek tehlike (boya, kimyasal) sınıflandırması yapılır. Her sınıf için farklı tasarım yoğunluğu (mm/dak) uygulanır.',
      '**Kaplama Alanı ve Başlık Aralıkları**\nStandart bir sprinkler başlığı maksimum 12 m² alan kaplar. Duvardan mesafe, tavan yüksekliği ve engel varlığı bu aralığı etkiler. Tasarımda "en kötü durum" alanı (hesap alanı) belirlenerek debi ve basınç hesabı yapılır.',
      '**Boru Çapı Hesabı**\nHazard pipe schedule ya da hidrolik hesap yöntemiyle belirlenen boru çapları, akış hızının 6 m/s\'yi geçmeyeceği şekilde seçilmelidir.',
      '**Su Kaynağı Yeterliliği**\nŞehir şebeke basıncı ve debisi yetersizse yangın su deposu ve pompa seti zorunludur. Minimum 10 dakika rezerv debi şartı karşılanmalıdır.',
      '**Test ve Bakım**\nSistem devreye alındıktan sonra yılda bir tam akış testi, üç ayda bir kontrol testi yapılmalıdır. Başlıkların mekanik hasar ve boya ile kaplanmamış olduğu kontrol edilmelidir.',
    ],
  },
  {
    slug: 'endustriyel-pompa-bakimi',
    cat: 'Endüstriyel',
    title: 'Endüstriyel pompa bakımında dikkat edilecekler',
    date: '21 Mar 2026',
    isoDate: '2026-03-21',
    readTime: '6 dk',
    excerpt: 'Pompa ömrünü uzatan periyodik bakım adımları ve sık yapılan hatalar.',
    img: '/assets/ımages/Close-up_of_the_green_and_202606042054.webp',
    content: [
      'Endüstriyel tesislerde pompa arızaları beklenmedik duruş sürelerine ve ciddi üretim kayıplarına yol açar. Düzenli bakım programı ile pompa ömrü iki katına çıkarılabilir.',
      '**Günlük Kontroller**\nVibrasyon ve anormal ses dinlenerek erken arıza belirtileri tespit edilmelidir. Salmastra (mekanik seal) bölgesinde aşırı sızıntı, yatakların ısınması ve motor akımındaki değişimler acil müdahale sinyalleridir.',
      '**Aylık Bakım**\nYatakların yağlanması, kavlin/kaplin lastiklerinin kontrolü, emme ve basma tarafı basınç göstergelerinin okunması, vibrasyon ölçümü yapılmalıdır.',
      '**Yıllık Revizyon**\nMekanik seal ve yataklar değiştirilmeli, çark ve difüzör aşınma kontrolü yapılmalı, boru bağlantıları sızdırmazlık açısından kontrol edilmelidir. Büyük pompalar için hizalama (alignment) kontrolü şarttır.',
      '**En Sık Yapılan Hatalar**\nKuru çalıştırma, kavitasyon koşullarında zorla işletim, salmastra kaçağını görmezden gelme ve eksik yağlamayla çalışma en sık karşılaşılan bakım hatalarıdır. Her biri ciddi ve pahalı arızalara yol açar.',
      '**Yedek Parça Politikası**\nKritik pompalar için mechanical seal, yatak seti ve kaplin lastiklerini stokta bulundurun. Uzun tedarik süreli parça arızası işletmeyi haftalarca durdurabilir.',
    ],
  },
  {
    slug: 'malzeme-secimi-nasil-yapilir',
    cat: 'Teknik Rehber',
    title: 'Mekanik tesisatta malzeme seçimi nasıl yapılır?',
    date: '8 Mar 2026',
    isoDate: '2026-03-08',
    readTime: '9 dk',
    excerpt: 'Proje şartnamesine uygun, sertifikalı ve uyumlu malzeme seçiminin püf noktaları.',
    img: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=85&fit=crop',
    content: [
      'Mekanik tesisat projelerinde malzeme seçimi; bütçe, performans, uyumluluk ve uzun vadeli işletme maliyetleri arasındaki dengeyi kurmayı gerektirir.',
      '**Şartname Uyumu**\nProje mühendisi tarafından belirlenen şartname teknik gereksinimler (basınç sınıfı, malzeme cinsi, sızdırmazlık standardı) en öncelikli kıstastır. Şartnameyi karşılamayan ürün ne kadar uygun fiyatlı olursa olsun kabul edilmez.',
      '**Sertifika ve Belgeler**\nTSE belgesi, CE işareti, TS EN standart uygunluğu zorunludur. Yangın sistemleri için UL/FM veya VdS sertifikası aranmalıdır. Belgesiz ürün sigortacı tarafından reddedilebilir.',
      '**Malzeme Uyumluluğu**\nAkışkan cinsi (su, buhar, gaz, kimyasal), çalışma sıcaklığı ve basıncı malzeme seçimini doğrudan belirler. Galvanik korozyon riskine karşı farklı metallerin bir arada kullanımında dielektrik bağlantı gerekebilir.',
      '**Tedarik Güvencesi**\nUzun vadeli projeler için yedek parça temin edilebilirliği, yetkili servis ağı ve üreticinin piyasadaki sürekliliği önemlidir. Tanınmayan markalar kısa vadede ucuz görünse de uzun vadede pahalıya mal olabilir.',
      '**Toplam Maliyet (TCO) Yaklaşımı**\nSatın alma fiyatı yanı sıra kurulum maliyeti, enerji tüketimi, bakım sıklığı ve beklenen ömür birlikte değerlendirilmelidir. Kaliteli bir ürün uzun vadede her zaman daha ekonomik olur.',
    ],
  },
  {
    slug: 'fan-coil-vs-klima-santrali',
    cat: 'Isıtma & Soğutma',
    title: 'Fan-coil mi, klima santrali mi? Karşılaştırma',
    date: '24 Şub 2026',
    isoDate: '2026-02-24',
    readTime: '6 dk',
    excerpt: 'İki sistemin avantajları, maliyetleri ve hangi projede hangisinin tercih edilmesi gerektiği.',
    img: 'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=1200&q=85&fit=crop',
    content: [
      'Fan-coil ve klima santrali (AHU) sistemleri iklimlendirmede en yaygın kullanılan iki teknolojdir. Proje kararını etkileyen faktörler oldukça farklıdır.',
      '**Fan-Coil Sistemleri**\nBireysel oda kontrolü imkânı sunar; her mahalde bağımsız sıcaklık ayarı yapılabilir. Değişken akış sistemleriyle (2-boru, 4-boru) hem ısıtma hem soğutma sağlanır. Bakım kolaylığı ve düşük ses avantajlarına rağmen hava kalitesi yönetimi sınırlıdır; taze hava için ek sistem gerekebilir.',
      '**Klima Santrali (AHU)**\nMerkezi hava işleme yaparak yüksek hava kalitesi sağlar. Filtrasyon, nemlendirme, ısı geri kazanımı entegre edilebilir. Otel, hastane, temiz oda gibi hava kalitesi kritik mekânlarda tercih edilir. Büyük şaft ve makine dairesi gerektirir.',
      '**Hangi Sistem Ne Zaman?**\nOfis, konut ve oteller için fan-coil çoğunlukla yeterlidir ve ekonomiktir. Hastane, laboratuvar, müze ve endüstriyel mekânlarda AHU zorunludur. Karma projelerde her iki sistem birlikte uygulanabilir.',
      '**Maliyet Karşılaştırması**\nFan-coil sistemlerin ilk yatırım maliyeti genellikle daha düşüktür ancak çok sayıda ünite işletim maliyetini artırır. AHU sistemlerde merkezi yönetim enerji optimizasyonunu kolaylaştırır.',
      '**Karar Kriterleri**\nMekan kullanım amacı, hava kalitesi gereksinimi, mimari kısıtlar (şaft alanı), bütçe ve işletme tercihleri birlikte değerlendirilerek en uygun sistem belirlenmelidir.',
    ],
  },
]

function getPost(slug: string): Post | undefined {
  return ALL_POSTS.find((p) => p.slug === slug)
}

export async function generateStaticParams() {
  return ALL_POSTS.map((p) => ({ slug: p.slug }))
}

const BASE = 'https://www.lukasteknik.com'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Yazı bulunamadı' }
  const canonicalUrl = `${BASE}/blog/${post.slug}`
  const imgUrl = post.img.startsWith('http') ? post.img : `${BASE}${post.img}`
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: 'Lukas Teknik', url: BASE }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'Lukas Teknik',
      locale: 'tr_TR',
      images: [{ url: imgUrl, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.isoDate,
      authors: [BASE],
      section: post.cat,
      tags: [post.cat, 'mekanik tesisat', 'endüstriyel'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imgUrl],
    },
    alternates: { canonical: canonicalUrl },
  }
}

export const dynamicParams = true

export default async function BlogDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return <DynamicBlogPost slug={slug} />

  const others = ALL_POSTS.filter((p) => p.slug !== slug).slice(0, 3)
  const imgUrl = post.img.startsWith('http') ? post.img : `${BASE}${post.img}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imgUrl,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: { '@type': 'Organization', name: 'Lukas Teknik', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'Lukas Teknik',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/assets/logo.webp` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${post.slug}` },
    articleSection: post.cat,
    inLanguage: 'tr-TR',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE}/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <div style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--line)', padding: '36px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', marginBottom: '24px' }}>
              <Link href="/" style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>Ana Sayfa</Link>
              <span>/</span>
              <Link href="/blog" style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>Blog</Link>
              <span>/</span>
              <span style={{ color: 'var(--ink-soft)' }}>{post.cat}</span>
            </div>
            <span style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--brand-tint)', color: 'var(--brand-700)', borderRadius: 'var(--r-pill)', fontSize: '12px', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '16px' }}>
              {post.cat}
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px,4vw,44px)', letterSpacing: '-.02em', lineHeight: 1.1, maxWidth: '780px', marginBottom: '20px' }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
              <span>{post.date}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--line-2)', display: 'inline-block' }} />
              <span>{post.readTime} okuma</span>
            </div>
          </div>
        </div>

        {/* Cover image */}
        <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
          <Image
            src={post.img}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,.35) 100%)' }} />
        </div>

        {/* Content */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '56px', alignItems: 'start' }} className="blog-article-grid">

              <article>
                <p style={{ fontSize: '19px', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '32px', fontStyle: 'italic', borderLeft: '3px solid var(--brand)', paddingLeft: '20px' }}>
                  {post.excerpt}
                </p>

                {post.content.map((para, i) => {
                  if (para.startsWith('**') && para.includes('\n')) {
                    const [heading, ...rest] = para.split('\n')
                    return (
                      <div key={i} style={{ marginBottom: '28px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '19px', color: 'var(--ink)', marginBottom: '10px' }}>
                          {heading.replace(/\*\*/g, '')}
                        </h3>
                        <p style={{ fontSize: '16.5px', lineHeight: 1.75, color: 'var(--ink-soft)' }}>{rest.join(' ')}</p>
                      </div>
                    )
                  }
                  return (
                    <p key={i} style={{ fontSize: '16.5px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '22px' }}>
                      {para}
                    </p>
                  )
                })}

                <div style={{ marginTop: '48px', padding: '32px', background: 'var(--brand-tint)', borderRadius: 'var(--r-lg)', borderLeft: '4px solid var(--brand)' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--ink)', marginBottom: '10px' }}>
                    Proje için fiyat teklifi alın
                  </h4>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '15px', marginBottom: '18px', lineHeight: 1.6 }}>
                    Mekanik tesisat ve endüstriyel ürün ihtiyaçlarınız için hızlı teklif almak üzere bizimle iletişime geçin.
                  </p>
                  <Link href="/iletisim" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', borderRadius: 'var(--r-pill)', background: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}>
                    İletişime Geç
                  </Link>
                </div>
              </article>

              {/* Sidebar */}
              <aside style={{ position: 'sticky', top: '96px' }}>
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '24px', marginBottom: '24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', marginBottom: '16px', color: 'var(--ink)' }}>Diğer Yazılar</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {others.map((o) => (
                      <Link key={o.slug} href={`/blog/${o.slug}`} style={{ display: 'flex', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ width: '64px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                          <Image src={o.img} alt={o.title} fill style={{ objectFit: 'cover' }} sizes="64px" />
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13.5px', lineHeight: 1.35, color: 'var(--ink)', marginBottom: '4px' }}>{o.title}</p>
                          <span style={{ fontSize: '12px', color: 'var(--ink-faint)' }}>{o.readTime} okuma</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'var(--ink)', borderRadius: 'var(--r-lg)', padding: '24px', color: '#fff' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', marginBottom: '10px' }}>Teklif alın</h4>
                  <p style={{ fontSize: '14px', color: '#aab0aa', marginBottom: '16px', lineHeight: 1.5 }}>Projenize uygun fiyat için bize ulaşın.</p>
                  <Link href="/iletisim" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 'var(--r-pill)', background: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
                    İletişime Geç
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .blog-article-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
