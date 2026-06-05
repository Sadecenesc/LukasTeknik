import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'Lukas Teknik KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.',
  alternates: { canonical: 'https://www.lukasteknik.com/kvkk' },
}

const sections = [
  {
    title: '1. Veri Sorumlusu ve Temsilcisi',
    content:
      'Lukas Teknik Mekanik Endüstriyel Malzemeleri San. Tic. Ltd. Şti. ("Şirket"), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sorumlusu sıfatını taşımakta olup kişisel verileriniz aşağıda açıklanan kapsamda işlenmektedir.',
  },
  {
    title: '2. İşlenen Kişisel Veriler',
    content:
      'Şirketimizce işlenen kişisel veri kategorileri şunlardır: Kimlik Verileri (ad, soyad, TC kimlik numarası – gerekli hallerde), İletişim Verileri (e-posta, telefon, adres), Müşteri İşlem Verileri (sipariş, teklif, fatura bilgileri), Pazarlama Verileri (iletişim tercihleri, kampanya yanıtları) ve Teknik Veriler (IP adresi, çerez verileri).',
  },
  {
    title: '3. Kişisel Verilerin İşlenme Amaçları',
    content:
      'Kişisel verileriniz; teklif, sipariş ve satış süreçlerinin yürütülmesi, müşteri ilişkileri yönetimi, yasal yükümlülüklerin yerine getirilmesi, ticari iletişim faaliyetlerinin yürütülmesi, hizmet kalitesinin iyileştirilmesi ve iş ortakları ile sözleşme ilişkilerinin sürdürülmesi amaçlarıyla işlenmektedir.',
  },
  {
    title: '4. Hukuki Sebepler',
    content:
      'Kişisel verileriniz; sözleşmenin kurulması ve ifası için zorunlu olması (KVKK m.5/2-c), hukuki yükümlülüklerin yerine getirilmesi (m.5/2-ç), meşru menfaatlerimiz doğrultusunda (m.5/2-f) ve açık rızanızın alındığı durumlarda işlenmektedir (m.5/1).',
  },
  {
    title: '5. Verilerin Aktarımı',
    content:
      'Kişisel verileriniz; yasal zorunluluklar çerçevesinde kamu kurum ve kuruluşlarına, hizmet aldığımız tedarikçi ve iş ortaklarına, lojistik firmalara ve muhasebe/hukuk danışmanlarına aktarılabilir. Yurt dışına veri aktarımı, KVKK\'nın 9. maddesi kapsamında yeterli koruma güvencesi bulunan ülkelerle sınırlı tutulmaktadır.',
  },
  {
    title: '6. Saklama Süreleri',
    content:
      'Kişisel verileriniz, işlenme amacının gerektirdiği süre ve yasal saklama yükümlülükleri boyunca muhafaza edilmekte; bu sürelerin sona ermesinin ardından silinmekte, yok edilmekte veya anonim hâle getirilmektedir. Ticari kayıtlar Türk Ticaret Kanunu uyarınca en az 10 yıl saklanmaktadır.',
  },
  {
    title: '7. İlgili Kişi Hakları (KVKK m.11)',
    content:
      'Kişisel verilerinize ilişkin olarak; işlenip işlenmediğini öğrenme, işlendiyse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içi/yurt dışı aktarım bilgisi talep etme, eksik/yanlış verilerin düzeltilmesini isteme, KVKK m.7 çerçevesinde silinmesini veya yok edilmesini talep etme, otomatik sistemlerle analiz sonucu aleyhinize çıkan kararalara itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz.',
  },
  {
    title: '8. Başvuru Yolu',
    content:
      'Haklarınızı kullanmak için kimliğinizi tevsik eden belgelerle birlikte yazılı olarak aşağıdaki kanalları kullanabilirsiniz: E-posta: info@lukasteknik.com | Posta: İkitelli OSB, Mekanik Sanayi Sitesi, Başakşehir / İstanbul | Telefon: 0505 699 52 45. Başvurularınız en geç 30 gün içinde sonuçlandırılacaktır.',
  },
]

export default function KvkkPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="KVKK"
          title="KVKK Aydınlatma Metni"
          description="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin aydınlatma metni."
        />

        <section className="section">
          <div className="container">
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              <p style={{ fontSize: '14.5px', color: 'var(--ink-faint)', marginBottom: '40px' }}>
                Son güncelleme: Ocak 2025
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                {sections.map((s) => (
                  <div key={s.title}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>
                      {s.title}
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--ink-soft)' }}>{s.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
