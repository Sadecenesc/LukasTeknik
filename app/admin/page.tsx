'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type View = 'dashboard' | 'fiyat-listesi' | 'blog' | 'sosyal-medya'

const ADMIN_PASSWORD = 'lukas2026'

const STATS = [
  { label: 'Bu Ay Proje', value: '34', delta: '+8', up: true },
  { label: 'Fiyat Listesi', value: '12', delta: '+1', up: true },
]

const TAG_STYLE: Record<string, React.CSSProperties> = {
  done: { background: 'var(--brand-tint)', color: 'var(--brand-700)' },
  prog: { background: '#fef3e2', color: '#c98a1a' },
}

const NAV_ITEMS: { view: View; label: string; icon: string }[] = [
  { view: 'dashboard',     label: 'Genel Bakış',    icon: 'grid' },
  { view: 'fiyat-listesi', label: 'Fiyat Listeleri', icon: 'pdf' },
  { view: 'blog',          label: 'Blog Yazıları',   icon: 'edit' },
  { view: 'sosyal-medya',  label: 'Sosyal Medya',    icon: 'share' },
]

interface FiyatItem {
  id: string
  firma: string
  logoUrl: string
  pdfUrl: string
  pdfName: string
}

interface BlogItem {
  id: string
  title: string
  cat: string
  date: string
  status: 'Yayında' | 'Taslak'
}

const LOGOWEB_LOGOS = [
  { file: 'aldag-logo.webp',              firma: 'Aldağ',               folder: 'logoweb' },
  { file: 'apa.webp',                     firma: 'APA',                 folder: 'logoweb' },
  { file: 'atlas-sayac.webp',             firma: 'Atlas Sayaç',         folder: 'logoweb' },
  { file: 'ayvaz.webp',                   firma: 'Ayvaz',               folder: 'logoweb' },
  { file: 'duyar.webp',                   firma: 'Duyar',               folder: 'logoweb' },
  { file: 'Eca.webp',                     firma: 'ECA',                 folder: 'logoweb' },
  { file: 'eska-valve.webp',              firma: 'Eska Valve',          folder: 'logoweb' },
  { file: 'genlesmeTANK.webp',            firma: 'Genleşme Tank',       folder: 'logoweb' },
  { file: 'infitdökme.webp',              firma: 'İnfit Dökme',         folder: 'logoweb' },
  { file: 'klepsan.webp',                 firma: 'Klepsan',             folder: 'logoweb' },
  { file: 'mansonlar.webp',               firma: 'Mansonlar',           folder: 'logoweb' },
  { file: 'mcs.jpg',                      firma: 'MCS',                 folder: 'logoweb' },
  { file: 'paktermo_logo.webp',           firma: 'Paktermo',            folder: 'logoweb' },
  { file: 'samson.webp',                  firma: 'Samson',              folder: 'logoweb' },
  { file: 'SARImalzemeler.webp',          firma: 'Sarı Malzemeler',     folder: 'logoweb' },
  { file: 'setvalve.webp',                firma: 'Setvalve',            folder: 'logoweb' },
  { file: 'srovanyangın.webp',            firma: 'Srovan Yangın',       folder: 'logoweb' },
  { file: 'TEKSAN-1.webp',               firma: 'Teksan (1)',           folder: 'logoweb' },
  { file: 'teksan.webp',                  firma: 'Teksan',              folder: 'logoweb' },
  { file: 'Tds-Tekneciler-Metal-1.webp',  firma: 'TDS Tekneciler Metal', folder: 'logoweb' },
  { file: 'tkc.webp',                     firma: 'TKC',                 folder: 'logoweb' },
  { file: 'UNMAK.webp',                   firma: 'UNMAK',               folder: 'logoweb' },
  { file: 'valftek.webp',                 firma: 'Valftek',             folder: 'logoweb' },
]

const LOGO2WEB_LOGOS = [
  { file: '73PEPE.webp',                                   firma: '73 Pepe',         folder: 'logo2web' },
  { file: 'ALARKO.webp',                                   firma: 'Alarko',          folder: 'logo2web' },
  { file: 'ARMAS.webp',                                    firma: 'Armas',           folder: 'logo2web' },
  { file: 'BAYKARA.webp',                                  firma: 'Baykara',         folder: 'logo2web' },
  { file: 'BAYMAK-donusturuldugu-kaynak-jpg.webp',          firma: 'Baymak',          folder: 'logo2web' },
  { file: 'BESTTANK.webp',                                 firma: 'Besttank',        folder: 'logo2web' },
  { file: 'BEYCO.webp',                                    firma: 'Beyco',           folder: 'logo2web' },
  { file: 'caleffi.webp',                                  firma: 'Caleffi',         folder: 'logo2web' },
  { file: 'CASE-donusturuldugu-kaynak-jpg.webp',            firma: 'Case',            folder: 'logo2web' },
  { file: 'CEMKA.webp',                                    firma: 'Cemka',           folder: 'logo2web' },
  { file: 'DURAVUZ-donusturuldugu-kaynak-jpg.webp',         firma: 'Duravuz',         folder: 'logo2web' },
  { file: 'EGAZ-donusturuldugu-kaynak-jpg.webp',            firma: 'Egaz',            folder: 'logo2web' },
  { file: 'EMEKCONTA-donusturuldugu-kaynak-jpg.webp',       firma: 'Emek Conta',      folder: 'logo2web' },
  { file: 'ERG-donusturuldugu-kaynak-jpg.webp',             firma: 'ERG',             folder: 'logo2web' },
  { file: 'fafvana-donusturuldugu-kaynak-jpg.webp',         firma: 'Fafvana',         folder: 'logo2web' },
  { file: 'gpd-donusturuldugu-kaynak-jpg.webp',             firma: 'GPD',             folder: 'logo2web' },
  { file: 'GRUNDFOS-donusturuldugu-kaynak-jpg.webp',        firma: 'Grundfos',        folder: 'logo2web' },
  { file: 'HİDRA-donusturuldugu-kaynak-jpg.webp',           firma: 'Hidra',           folder: 'logo2web' },
  { file: 'HİDRO-donusturuldugu-kaynak-jpg.webp',           firma: 'Hidro',           folder: 'logo2web' },
  { file: 'kalde.webp',                                    firma: 'Kalde',           folder: 'logo2web' },
  { file: 'KAS-donusturuldugu-kaynak-jpg.webp',             firma: 'KAS',             folder: 'logo2web' },
  { file: 'KONSAN-donusturuldugu-kaynak-jpg.webp',          firma: 'Konsan',          folder: 'logo2web' },
  { file: 'LOKEAL-donusturuldugu-kaynak-jpg.webp',          firma: 'Lokeal',          folder: 'logo2web' },
  { file: 'MASDAF-donusturuldugu-kaynak-jpg.webp',          firma: 'Masdaf',          folder: 'logo2web' },
  { file: 'MECH-donusturuldugu-kaynak-jpg.webp',            firma: 'Mech',            folder: 'logo2web' },
  { file: 'MONEKS-donusturuldugu-kaynak-jpg.webp',          firma: 'Moneks',          folder: 'logo2web' },
  { file: 'NES-donusturuldugu-kaynak-jpg.webp',             firma: 'NES',             folder: 'logo2web' },
  { file: 'NESİL-donusturuldugu-kaynak-jpg.webp',           firma: 'Nesil',           folder: 'logo2web' },
  { file: 'NORM-donusturuldugu-kaynak-jpg.webp',            firma: 'Norm',            folder: 'logo2web' },
  { file: 'NORMM-donusturuldugu-kaynak-jpg.webp',           firma: 'Norm M',          folder: 'logo2web' },
  { file: 'ONTROL-donusturuldugu-kaynak-jpg.webp',          firma: 'Ontrol',          folder: 'logo2web' },
  { file: 'PAKKENS-donusturuldugu-kaynak-jpg.webp',         firma: 'Pakkens',         folder: 'logo2web' },
  { file: 'PAKKENS_1-donusturuldugu-kaynak-jpg.webp',       firma: 'Pakkens (1)',     folder: 'logo2web' },
  { file: 'PLASTHERM-donusturuldugu-kaynak-jpg.webp',       firma: 'Plastherm',       folder: 'logo2web' },
  { file: 'REGEN-donusturuldugu-kaynak-jpg.webp',           firma: 'Regen',           folder: 'logo2web' },
  { file: 'samson2-donusturuldugu-kaynak-png.webp',         firma: 'Samson',          folder: 'logo2web' },
  { file: 'SARDOĞAN-donusturuldugu-kaynak-jpg.webp',        firma: 'Sardoğan',        folder: 'logo2web' },
  { file: 'STANDART-donusturuldugu-kaynak-jpg.webp',        firma: 'Standart',        folder: 'logo2web' },
  { file: 'TARGAZ-donusturuldugu-kaynak-jpg.webp',          firma: 'Targaz',          folder: 'logo2web' },
  { file: 'TERMO-donusturuldugu-kaynak-jpg.webp',           firma: 'Termo',           folder: 'logo2web' },
  { file: 'TRAKYADOKUM-donusturuldugu-kaynak-jpg.webp',     firma: 'Trakya Döküm',   folder: 'logo2web' },
  { file: 'WILO-donusturuldugu-kaynak-jpg.webp',            firma: 'Wilo',            folder: 'logo2web' },
  { file: 'YAVUZ-LOGO-donusturuldugu-kaynak-jpg.webp',      firma: 'Yavuz',           folder: 'logo2web' },
]

const ALL_LOGOS = [...LOGOWEB_LOGOS, ...LOGO2WEB_LOGOS]

const INITIAL_BLOG: BlogItem[] = [
  { id: 'b1', title: 'Sprinkler sistemlerde doğru vana seçimi', cat: 'Yangın',  date: '14 Mayıs 2026',  status: 'Yayında' },
  { id: 'b2', title: 'Hidrofor grubu boyutlandırma rehberi',    cat: 'Pompa',   date: '28 Nisan 2026',  status: 'Yayında' },
  { id: 'b3', title: 'TSE ve CE belgelendirmesi',               cat: 'Genel',   date: '10 Nisan 2026',  status: 'Taslak'  },
]

function NavIcon({ icon }: { icon: string }) {
  const s: React.CSSProperties = { width: '19px', height: '19px', flexShrink: 0 }
  if (icon === 'grid')  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
  if (icon === 'pdf')   return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="15" /><line x1="9" y1="18" x2="12" y2="18" /></svg>
  if (icon === 'edit')  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
  if (icon === 'share') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={s}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
  return null
}

// ─── Login ekranı ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!onLogin(pw)) { setErr(true); setPw('') }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '48px 44px', width: '100%', maxWidth: '400px', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <Image src="/assets/logo.webp" alt="Lukas Teknik" width={140} height={40} style={{ objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', textAlign: 'center', marginBottom: '8px' }}>Yönetim Paneli</h1>
        <p style={{ textAlign: 'center', color: 'var(--ink-faint)', fontSize: '14.5px', marginBottom: '32px' }}>Devam etmek için şifrenizi girin.</p>
        <form onSubmit={submit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '13px', marginBottom: '7px', color: 'var(--ink-2)' }}>Şifre</label>
            <input
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(false) }}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px 14px', border: `1px solid ${err ? 'var(--ember)' : 'var(--line-2)'}`, borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-body)', fontSize: '15px', background: err ? '#fff5f5' : '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
            {err && <p style={{ color: 'var(--ember)', fontSize: '13px', marginTop: '6px', fontFamily: 'var(--font-display)', fontWeight: 500 }}>Hatalı şifre, tekrar deneyin.</p>}
          </div>
          <button type="submit" style={{ width: '100%', padding: '13px', borderRadius: 'var(--r-sm)', border: 'none', background: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15.5px', cursor: 'pointer' }}>
            Giriş Yap
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '13px', color: 'var(--ink-faint)' }}>
          <Link href="/" style={{ color: 'var(--brand-700)', fontWeight: 600, textDecoration: 'none' }}>← Siteye dön</Link>
        </p>
      </div>
    </div>
  )
}

// ─── Ana bileşen ─────────────────────────────────────────────────────────────
export default function AdminPage() {
  return <Suspense><AdminInner /></Suspense>
}

function AdminInner() {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') return sessionStorage.getItem('lukas_admin_auth') === '1'
    return false
  })

  function handleLogin(pw: string): boolean {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('lukas_admin_auth', '1')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  function handleLogout() {
    sessionStorage.removeItem('lukas_admin_auth')
    setIsAuthenticated(false)
  }

  // View
  const searchParams = useSearchParams()
  const [view, setView] = useState<View>('dashboard')
  useEffect(() => {
    const v = searchParams.get('view') as View | null
    if (v && ['dashboard', 'fiyat-listesi', 'blog', 'sosyal-medya'].includes(v)) setView(v)
  }, [searchParams])

  // Fiyat listesi
  const [fiyatListesi, setFiyatListesi] = useState<FiyatItem[]>([])
  const [fiyatLoading, setFiyatLoading] = useState(true)
  const [yeniFirma, setYeniFirma] = useState('')
  const [selectedLogoFile, setSelectedLogoFile] = useState<string | null>(null)
  const [yeniLogoFile, setYeniLogoFile] = useState<File | null>(null)
  const [yeniPdfFile, setYeniPdfFile] = useState<File | null>(null)
  const [fiyatSaved, setFiyatSaved] = useState(false)
  const [fiyatUploading, setFiyatUploading] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)

  // Fiyat düzenleme
  const [editingFiyatId, setEditingFiyatId] = useState<string | null>(null)
  const [editFirma, setEditFirma] = useState('')
  const [editLogoFile, setEditLogoFile] = useState<File | null>(null)
  const [editPdfFile, setEditPdfFile] = useState<File | null>(null)
  const editLogoRef = useRef<HTMLInputElement>(null)
  const editPdfRef = useRef<HTMLInputElement>(null)

  // Blog
  const [blogItems] = useState<BlogItem[]>(INITIAL_BLOG)

  // Sosyal medya
  const [instagram, setInstagram] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [waNumber, setWaNumber] = useState('905056995245')
  const [sosyalSaved, setSosyalSaved] = useState(false)

  // ── Veri yükleme ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) return
    async function loadAll() {
      if (!supabase) { setFiyatLoading(false); return }

      // Fiyat listesi
      const { data: fiyatData } = await supabase
        .from('fiyat_listesi')
        .select('*')
        .order('created_at', { ascending: true })
      if (fiyatData) {
        setFiyatListesi(fiyatData.map((r) => ({
          id:      r.id,
          firma:   r.firma,
          logoUrl: r.logo_url  ?? '',
          pdfUrl:  r.pdf_url   ?? '',
          pdfName: r.pdf_name  ?? '',
        })))
      }
      setFiyatLoading(false)

      // Sosyal medya linkleri
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('key, value')
      if (settingsData) {
        const map = Object.fromEntries(settingsData.map((r) => [r.key, r.value]))
        if (map.instagram !== undefined) setInstagram(map.instagram)
        if (map.linkedin  !== undefined) setLinkedin(map.linkedin)
        if (map.whatsapp)                setWaNumber(map.whatsapp)
      }
    }
    loadAll()
  }, [isAuthenticated])

  const thStyle: React.CSSProperties = { textAlign: 'left', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink-faint)', padding: '13px 24px', background: 'var(--bg-soft)' }
  const tdStyle: React.CSSProperties = { padding: '15px 24px', borderTop: '1px solid var(--line)', fontSize: '14.5px' }
  const inputSt: React.CSSProperties = { width: '100%', padding: '11px 14px', border: '1px solid var(--line-2)', borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-body)', fontSize: '14.5px', background: '#fff', outline: 'none' }

  // ── Fiyat işlemleri ───────────────────────────────────────────────────────
  async function addFiyat() {
    if (!yeniFirma.trim() || !supabase) return
    setFiyatUploading(true)
    const id = String(Date.now())

    let logoUrl = ''
    if (selectedLogoFile) {
      logoUrl = `/assets/${selectedLogoFile}`
    } else if (yeniLogoFile) {
      const ext = yeniLogoFile.name.split('.').pop()
      const { data } = await supabase.storage.from('logos').upload(`${id}.${ext}`, yeniLogoFile, { upsert: true })
      if (data) {
        logoUrl = supabase.storage.from('logos').getPublicUrl(data.path).data.publicUrl
      }
    }

    let pdfUrl = ''
    let pdfName = ''
    if (yeniPdfFile) {
      pdfName = yeniPdfFile.name
      const { data } = await supabase.storage.from('pdfs').upload(`${id}.pdf`, yeniPdfFile, { upsert: true })
      if (data) {
        pdfUrl = supabase.storage.from('pdfs').getPublicUrl(data.path).data.publicUrl
      }
    }

    const { error } = await supabase.from('fiyat_listesi').insert({
      id, firma: yeniFirma.trim(), logo_url: logoUrl, pdf_url: pdfUrl, pdf_name: pdfName,
    })

    if (!error) {
      setFiyatListesi((prev) => [...prev, { id, firma: yeniFirma.trim(), logoUrl, pdfUrl, pdfName }])
      setYeniFirma(''); setSelectedLogoFile(null); setYeniLogoFile(null); setYeniPdfFile(null)
      if (logoInputRef.current) logoInputRef.current.value = ''
      if (pdfInputRef.current) pdfInputRef.current.value = ''
      setFiyatSaved(true); setTimeout(() => setFiyatSaved(false), 2500)
    }
    setFiyatUploading(false)
  }

  async function removeFiyat(id: string) {
    if (!supabase) return
    const item = fiyatListesi.find((f) => f.id === id)
    // Storage temizliği — Supabase URL ise dosyayı da sil
    if (item?.pdfUrl?.includes('/pdfs/')) {
      const path = item.pdfUrl.split('/pdfs/').pop()
      if (path) await supabase.storage.from('pdfs').remove([decodeURIComponent(path.split('?')[0])])
    }
    if (item?.logoUrl?.includes('/logos/')) {
      const path = item.logoUrl.split('/logos/').pop()
      if (path) await supabase.storage.from('logos').remove([decodeURIComponent(path.split('?')[0])])
    }
    await supabase.from('fiyat_listesi').delete().eq('id', id)
    setFiyatListesi((prev) => prev.filter((f) => f.id !== id))
  }

  function startEditFiyat(item: FiyatItem) {
    setEditingFiyatId(item.id)
    setEditFirma(item.firma)
    setEditLogoFile(null)
    setEditPdfFile(null)
  }

  async function saveEditFiyat(item: FiyatItem) {
    if (!supabase) return
    setFiyatUploading(true)
    let logoUrl = item.logoUrl
    let pdfUrl = item.pdfUrl
    let pdfName = item.pdfName

    if (editLogoFile) {
      const ext = editLogoFile.name.split('.').pop()
      const { data } = await supabase.storage.from('logos').upload(`${item.id}.${ext}`, editLogoFile, { upsert: true })
      if (data) logoUrl = supabase.storage.from('logos').getPublicUrl(data.path).data.publicUrl
    }

    if (editPdfFile) {
      pdfName = editPdfFile.name
      const { data } = await supabase.storage.from('pdfs').upload(`${item.id}.pdf`, editPdfFile, { upsert: true })
      if (data) pdfUrl = supabase.storage.from('pdfs').getPublicUrl(data.path).data.publicUrl
    }

    await supabase.from('fiyat_listesi').update({
      firma: editFirma, logo_url: logoUrl, pdf_url: pdfUrl, pdf_name: pdfName,
    }).eq('id', item.id)

    setFiyatListesi((prev) => prev.map((f) => f.id === item.id ? { ...f, firma: editFirma, logoUrl, pdfUrl, pdfName } : f))
    setEditingFiyatId(null)
    setFiyatUploading(false)
  }

  // ── Sosyal medya kaydet ───────────────────────────────────────────────────
  async function saveSosyal() {
    if (!supabase) return
    await Promise.all([
      supabase.from('site_settings').upsert({ key: 'instagram', value: instagram }),
      supabase.from('site_settings').upsert({ key: 'linkedin',  value: linkedin }),
      supabase.from('site_settings').upsert({ key: 'whatsapp',  value: waNumber }),
    ])
    setSosyalSaved(true); setTimeout(() => setSosyalSaved(false), 2500)
  }

  // ── Auth gate ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />

  // ── Panel UI ──────────────────────────────────────────────────────────────
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '264px 1fr', minHeight: '100vh', background: 'var(--bg-soft)' }} className="admin-layout">

        {/* Sidebar */}
        <aside style={{ background: 'var(--ink)', color: '#c3cac3', padding: '22px 18px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
          <div style={{ background: '#fff', padding: '12px 14px', borderRadius: 'var(--r)', marginBottom: '8px' }}>
            <Image src="/assets/logo.webp" alt="Lukas Teknik" width={120} height={34} style={{ objectFit: 'contain' }} />
          </div>
          <div style={{ fontSize: '12px', color: '#7f877f', padding: '0 6px 18px', borderBottom: '1px solid rgba(255,255,255,.1)', marginBottom: '16px', letterSpacing: '.04em', fontFamily: 'var(--font-display)' }}>
            YÖNETİM PANELİ
          </div>
          <nav style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#6b736b', fontFamily: 'var(--font-display)', fontWeight: 600, padding: '14px 10px 8px' }}>Yönetim</div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 12px', borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '14.5px', color: view === item.view ? '#fff' : '#c3cac3', background: view === item.view ? 'var(--brand)' : 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', marginBottom: '2px', transition: 'background .16s' }}
              >
                <NavIcon icon={item.icon} />
                {item.label}
              </button>
            ))}
          </nav>
          <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 12px', borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '14.5px', color: '#c3cac3', textDecoration: 'none', marginBottom: '4px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '19px', height: '19px' }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Siteye dön
            </Link>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 12px', borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '14.5px', color: '#e87d7d', background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', marginBottom: '8px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '19px', height: '19px' }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Çıkış Yap
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '8px 6px' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>LT</span>
              <div>
                <b style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: '#fff', display: 'block' }}>Lukas Teknik</b>
                <span style={{ fontSize: '12px', color: '#7f877f' }}>Yönetici</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div style={{ overflow: 'hidden' }}>
          <header style={{ background: '#fff', borderBottom: '1px solid var(--line)', padding: '18px 32px', display: 'flex', alignItems: 'center', gap: '20px', position: 'sticky', top: 0, zIndex: 20 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700 }}>
              {NAV_ITEMS.find((n) => n.view === view)?.label ?? 'Genel Bakış'}
            </h1>
            <div style={{ marginLeft: 'auto', position: 'relative' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '17px', height: '17px', color: 'var(--ink-faint)' }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input placeholder="Ara…" style={{ padding: '10px 16px 10px 40px', border: '1px solid var(--line-2)', borderRadius: 'var(--r-pill)', fontFamily: 'var(--font-body)', fontSize: '14px', width: '240px', background: 'var(--bg-soft)', outline: 'none' }} />
            </div>
          </header>

          <div style={{ padding: '32px' }}>

            {/* DASHBOARD */}
            {view === 'dashboard' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px', marginBottom: '28px' }} className="stat-cards">
                  {STATS.map((s) => (
                    <div key={s.label} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--brand-tint)', display: 'grid', placeItems: 'center', color: 'var(--brand-700)' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </div>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', padding: '3px 9px', borderRadius: 'var(--r-pill)', background: s.up ? 'var(--brand-tint)' : 'var(--ember-tint)', color: s.up ? 'var(--brand-700)' : 'var(--ember)' }}>{s.delta}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: '14px', color: 'var(--ink-soft)', marginTop: '6px' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--line)' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px' }}>Son blog yazıları</h3>
                    <button onClick={() => setView('blog')} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13.5px', color: 'var(--brand-700)', background: 'none', border: 'none', cursor: 'pointer' }}>Tümünü gör →</button>
                  </div>
                  {blogItems.slice(0, 3).map((b, i) => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', borderTop: i > 0 ? '1px solid var(--line)' : undefined }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--brand-tint)', display: 'grid', placeItems: 'center', fontSize: '22px', flexShrink: 0 }}>📰</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <b style={{ fontFamily: 'var(--font-display)', fontSize: '15px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</b>
                        <span style={{ fontSize: '12.5px', color: 'var(--ink-faint)' }}>{b.cat} · {b.date}</span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', padding: '4px 11px', borderRadius: 'var(--r-pill)', flexShrink: 0, ...TAG_STYLE[b.status === 'Yayında' ? 'done' : 'prog'] }}>{b.status}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* FİYAT LİSTESİ */}
            {view === 'fiyat-listesi' && (
              <>
                {/* Supabase uyarısı */}
                {!supabase && (
                  <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 'var(--r-sm)', padding: '14px 20px', marginBottom: '20px', fontFamily: 'var(--font-display)', fontSize: '14px', color: '#856404' }}>
                    ⚠️ Supabase bağlantısı yok. .env.local dosyasındaki NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY değerlerini kontrol edin.
                  </div>
                )}

                {/* Yeni ekleme formu */}
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '28px', marginBottom: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px', marginBottom: '22px' }}>Yeni Fiyat Listesi Ekle</h3>

                  {/* Logo grid seçici */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '13px', marginBottom: '10px', color: 'var(--ink-2)' }}>
                      Logo Seç <span style={{ color: 'var(--ink-faint)', fontWeight: 400 }}>— tıklayarak seçin, firma adı otomatik dolar</span>
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '10px', maxHeight: '300px', overflowY: 'auto', padding: '10px', border: '1px solid var(--line-2)', borderRadius: 'var(--r-sm)', background: 'var(--bg-soft)' }}>
                      {ALL_LOGOS.map((logo) => {
                        const key = `${logo.folder}/${logo.file}`
                        const isSelected = selectedLogoFile === key
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => { setSelectedLogoFile(key); setYeniFirma(logo.firma) }}
                            style={{
                              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px',
                              padding: '10px 6px', borderRadius: 'var(--r-sm)', cursor: 'pointer',
                              border: isSelected ? '2px solid var(--brand)' : '2px solid var(--line)',
                              background: isSelected ? 'var(--brand-tint)' : '#fff',
                              transition: 'all .14s',
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/assets/${key}`} alt={logo.firma} style={{ height: '40px', width: '90px', objectFit: 'contain' }} />
                            <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-display)', fontWeight: 500, color: isSelected ? 'var(--brand-700)' : 'var(--ink-2)', textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-word', width: '100%' }}>
                              {logo.firma}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    {selectedLogoFile && (
                      <button type="button" onClick={() => setSelectedLogoFile(null)} style={{ marginTop: '8px', fontSize: '12px', color: 'var(--ink-faint)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', padding: 0 }}>
                        ✕ Seçimi temizle
                      </button>
                    )}
                  </div>

                  {/* Firma adı */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '13px', marginBottom: '7px', color: 'var(--ink-2)' }}>Firma İsmi <span style={{ color: 'var(--ember)' }}>*</span></label>
                    <input style={{ ...inputSt, maxWidth: '400px' }} placeholder="Logo seçince otomatik dolar, düzenlenebilir" value={yeniFirma} onChange={(e) => setYeniFirma(e.target.value)} />
                  </div>

                  {/* PDF */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '13px', marginBottom: '7px', color: 'var(--ink-2)' }}>PDF Fiyat Listesi <span style={{ color: 'var(--ink-faint)', fontWeight: 400 }}>(opsiyonel — sonra Düzenle ile ekleyebilirsiniz)</span></label>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '11px 14px', border: '1px dashed var(--line-2)', borderRadius: 'var(--r-sm)', cursor: 'pointer', background: yeniPdfFile ? 'var(--brand-tint)' : '#fff' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px', color: 'var(--brand-700)', flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                      <span style={{ fontSize: '13.5px', color: yeniPdfFile ? 'var(--brand-700)' : 'var(--ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{yeniPdfFile ? yeniPdfFile.name : 'PDF seç…'}</span>
                      <input ref={pdfInputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={(e) => setYeniPdfFile(e.target.files?.[0] ?? null)} />
                    </label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                      onClick={addFiyat}
                      disabled={fiyatUploading || !supabase}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 22px', borderRadius: 'var(--r-sm)', border: 'none', background: fiyatUploading ? 'var(--line-2)' : 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14.5px', cursor: fiyatUploading ? 'not-allowed' : 'pointer' }}
                    >
                      {fiyatUploading ? 'Yükleniyor…' : '+ Ekle'}
                    </button>
                    {fiyatSaved && <span style={{ fontFamily: 'var(--font-display)', color: 'var(--brand-700)', fontSize: '14px', fontWeight: 600 }}>✓ Eklendi</span>}
                  </div>
                </div>

                {/* Mevcut listeler */}
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                  <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px' }}>Mevcut Fiyat Listeleri</h3>
                  </div>
                  {fiyatLoading ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid var(--brand-tint)', borderTopColor: 'var(--brand)', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
                      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                    </div>
                  ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={thStyle}>Firma</th>
                          <th style={thStyle}>Logo</th>
                          <th style={thStyle}>PDF</th>
                          <th style={thStyle}>İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fiyatListesi.length === 0 ? (
                          <tr><td colSpan={4} style={{ ...tdStyle, textAlign: 'center', color: 'var(--ink-faint)', padding: '32px' }}>Henüz fiyat listesi eklenmedi.</td></tr>
                        ) : fiyatListesi.map((f) => (
                          editingFiyatId === f.id ? (
                            <tr key={f.id} style={{ background: 'var(--brand-tint)' }}>
                              <td style={tdStyle}>
                                <input value={editFirma} onChange={(e) => setEditFirma(e.target.value)} style={{ ...inputSt, maxWidth: '200px', padding: '8px 10px', fontSize: '14px' }} />
                              </td>
                              <td style={tdStyle}>
                                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 12px', border: '1px dashed var(--line-2)', borderRadius: 'var(--r-sm)', cursor: 'pointer', fontSize: '13px', color: editLogoFile ? 'var(--brand-700)' : 'var(--ink-soft)', background: '#fff', whiteSpace: 'nowrap' }}>
                                  {editLogoFile ? editLogoFile.name : 'Logo değiştir…'}
                                  <input ref={editLogoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => setEditLogoFile(e.target.files?.[0] ?? null)} />
                                </label>
                              </td>
                              <td style={tdStyle}>
                                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 12px', border: '1px dashed var(--line-2)', borderRadius: 'var(--r-sm)', cursor: 'pointer', fontSize: '13px', color: editPdfFile ? 'var(--brand-700)' : 'var(--ink-soft)', background: '#fff', whiteSpace: 'nowrap' }}>
                                  {editPdfFile ? editPdfFile.name : (f.pdfName || 'PDF değiştir…')}
                                  <input ref={editPdfRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={(e) => setEditPdfFile(e.target.files?.[0] ?? null)} />
                                </label>
                              </td>
                              <td style={tdStyle}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button onClick={() => saveEditFiyat(f)} disabled={fiyatUploading} style={{ padding: '5px 13px', borderRadius: 'var(--r-sm)', border: '1px solid var(--brand)', background: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>
                                    {fiyatUploading ? '…' : 'Kaydet'}
                                  </button>
                                  <button onClick={() => setEditingFiyatId(null)} style={{ padding: '5px 13px', borderRadius: 'var(--r-sm)', border: '1px solid var(--line-2)', background: '#fff', color: 'var(--ink-2)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>İptal</button>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            <tr key={f.id}>
                              <td style={tdStyle}><b style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{f.firma}</b></td>
                              <td style={tdStyle}>
                                {f.logoUrl
                                  // eslint-disable-next-line @next/next/no-img-element
                                  ? <img src={f.logoUrl} alt={f.firma} style={{ height: '32px', width: 'auto', objectFit: 'contain', display: 'block', border: '1px solid var(--line)', borderRadius: '4px', padding: '2px 4px' }} />
                                  : <span style={{ color: 'var(--ink-faint)', fontSize: '13px' }}>—</span>}
                              </td>
                              <td style={tdStyle}>
                                {f.pdfName
                                  ? <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--brand-700)' }}>
                                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px', flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                                      {f.pdfName}
                                    </span>
                                  : <span style={{ color: 'var(--ink-faint)', fontSize: '13px' }}>Yüklenmedi</span>}
                              </td>
                              <td style={tdStyle}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button onClick={() => startEditFiyat(f)} style={{ padding: '5px 13px', borderRadius: 'var(--r-sm)', border: '1px solid var(--brand)', background: 'var(--brand-tint)', color: 'var(--brand-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>Düzenle</button>
                                  <button onClick={() => removeFiyat(f.id)} style={{ padding: '5px 13px', borderRadius: 'var(--r-sm)', border: '1px solid var(--ember)', background: 'var(--ember-tint)', color: 'var(--ember)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>Sil</button>
                                </div>
                              </td>
                            </tr>
                          )
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            )}

            {/* BLOG */}
            {view === 'blog' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--ink)' }}>Blog Yazıları</h2>
                    <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', marginTop: '2px' }}>{blogItems.length} yazı</p>
                  </div>
                  <Link href="/admin/blog/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 20px', borderRadius: 'var(--r-sm)', background: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}><path d="M12 5v14M5 12h14" /></svg>
                    Yeni Yazı
                  </Link>
                </div>
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                  {blogItems.map((b, i) => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', borderTop: i > 0 ? '1px solid var(--line)' : undefined }}>
                      <div style={{ width: '56px', height: '42px', borderRadius: '8px', flexShrink: 0, background: 'var(--brand-tint)', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
                        <span style={{ fontSize: '20px' }}>📰</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <b style={{ fontFamily: 'var(--font-display)', fontSize: '14.5px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--ink)' }}>{b.title}</b>
                        <span style={{ fontSize: '12.5px', color: 'var(--ink-faint)' }}>{b.cat} · {b.date}</span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', padding: '3px 10px', borderRadius: 'var(--r-pill)', flexShrink: 0, ...TAG_STYLE[b.status === 'Yayında' ? 'done' : 'prog'] }}>{b.status}</span>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <Link href={`/admin/blog/${b.id}`} style={{ padding: '5px 13px', borderRadius: 'var(--r-sm)', border: '1px solid var(--brand)', background: 'var(--brand-tint)', color: 'var(--brand-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>Düzenle</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* SOSYAL MEDYA */}
            {view === 'sosyal-medya' && (
              <div style={{ maxWidth: '640px' }}>
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '32px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px', marginBottom: '8px' }}>Sosyal Medya Bağlantıları</h3>
                  <p style={{ color: 'var(--ink-faint)', fontSize: '14px', marginBottom: '28px' }}>Buraya girilen URL&apos;ler footer ve navbar&apos;daki sosyal medya ikonlarına yansır.</p>
                  {[
                    { label: 'Instagram URL', value: instagram, onChange: setInstagram, placeholder: 'https://instagram.com/kullanici', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> },
                    { label: 'WhatsApp Numara', value: waNumber, onChange: setWaNumber, placeholder: '905551234567 (başında + olmadan)', icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" /></svg> },
                    { label: 'LinkedIn URL', value: linkedin, onChange: setLinkedin, placeholder: 'https://linkedin.com/company/firma', icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
                  ].map(({ label, value, onChange, placeholder, icon }) => (
                    <div key={label} style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '14px', marginBottom: '8px', color: 'var(--ink-2)' }}>
                        <span style={{ color: 'var(--brand-700)' }}>{icon}</span>
                        {label}
                      </label>
                      <input style={inputSt} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                    <button onClick={saveSosyal} disabled={!supabase} style={{ padding: '12px 28px', borderRadius: 'var(--r-sm)', border: 'none', background: 'var(--brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', cursor: 'pointer' }}>Kaydet</button>
                    {sosyalSaved && <span style={{ fontFamily: 'var(--font-display)', color: 'var(--brand-700)', fontSize: '14px', fontWeight: 600 }}>✓ Kaydedildi</span>}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .admin-layout { grid-template-columns: 1fr !important; } .stat-cards { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px)  { .stat-cards { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
