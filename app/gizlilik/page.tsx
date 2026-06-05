import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Lukas Teknik gizlilik politikası ve kişisel verilerin korunması hakkında bilgi.',
  alternates: { canonical: 'https://www.lukasteknik.com/gizlilik' },
}

const sections = [
  {
    title: '1. Veri Sorumlusu',
    content:
      'Bu Gizlilik Politikası, Lukas Teknik Mekanik Endüstriyel Malzemeleri San. Tic. Ltd. Şti. ("Lukas Teknik", "Biz") tarafından yönetilen www.lukasteknik.com web sitesi için geçerlidir. Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla tarafımızca işlenmektedir.',
  },
  {
    title: '2. Toplanan Veriler',
    content:
      'Web sitemizi ziyaret ettiğinizde veya iletişim formlarını doldurduğunuzda aşağıdaki veriler toplanabilir: ad-soyad, e-posta adresi, telefon numarası, şirket/firma bilgisi, mesaj içerikleri ve teknik iletişim verileri (IP adresi, tarayıcı tipi, sayfa görüntüleme süreleri).',
  },
  {
    title: '3. Verilerin Kullanım Amacı',
    content:
      'Toplanan kişisel veriler; teklif hazırlanması, müşteri hizmetleri sunulması, ticari iletişim kurulması, yasal yükümlülüklerin yerine getirilmesi ve web sitesinin iyileştirilmesi amaçlarıyla kullanılmaktadır. Verileriniz, açık rızanız olmaksızın üçüncü taraflarla paylaşılmaz.',
  },
  {
    title: '4. Çerezler (Cookies)',
    content:
      'Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Zorunlu çerezler sitenin işlevselliği için gereklidir. Analitik çerezler, ziyaretçi istatistiklerini anonim olarak toplar. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı site özelliklerinden yararlanamayabilirsiniz.',
  },
  {
    title: '5. Veri Güvenliği',
    content:
      'Kişisel verilerinizin güvenliği için SSL şifrelemesi ve endüstri standardı güvenlik önlemleri uygulanmaktadır. Verileriniz, yasal saklama süreleri dışında ihtiyaç kalmadığında silinmekte veya anonim hâle getirilmektedir.',
  },
  {
    title: '6. Haklarınız',
    content:
      'KVKK\'nın 11. maddesi kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlendiyse bilgi talep etme, işlenme amacını öğrenme, yurt içi/yurt dışı aktarım bilgisi talep etme, eksik/yanlış işlenen verilerin düzeltilmesini isteme ve silinmesini talep etme haklarına sahipsiniz. Bu haklarınızı kullanmak için info@lukasteknik.com adresine başvurabilirsiniz.',
  },
  {
    title: '7. İletişim',
    content:
      'Gizlilik politikamıza ilişkin sorularınız için: E-posta: info@lukasteknik.com | Telefon: 0505 699 52 45 | Adres: İkitelli OSB, Mekanik Sanayi Sitesi, Başakşehir / İstanbul',
  },
]

export default function GizlilikPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Gizlilik Politikası"
          title="Gizlilik Politikası"
          description="Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi edinebilirsiniz."
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
