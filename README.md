# WMB Mobilya Showcase - React + Vite Projesi

WMB mobilya showcase sitesi, React ve Vite ile oluşturulmuş modern bir web uygulaması.

## Proje Yapısı

```
src/
├── components/          # React componentleri
│   ├── common/         # Ortak componentler (Header, Footer, vs.)
│   ├── sections/       # Sayfa bölümleri (Hero, Products, vs.)
│   └── layout/         # Layout componentleri
├── hooks/              # Custom React hooks
├── utils/              # Yardımcı fonksiyonlar ve constants
├── assets/             # Statik dosyalar
│   └── styles/         # CSS dosyaları
├── App.jsx             # Ana App component
└── main.jsx            # Giriş noktası
```

## Kurulum

Projeyi klonladıktan sonra bağımlılıkları yükleyin:

```bash
npm install
```

## Geliştirme

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresinde açılacaktır.

## Build

Production build oluşturmak için:

```bash
npm run build
```

Build edilmiş dosyalar `dist` klasöründe oluşturulacaktır.

## Önizleme

Build edilmiş projeyi önizlemek için:

```bash
npm run preview
```

## Teknolojiler

- **React 18** - UI kütüphanesi
- **Vite** - Build tool ve dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **React Hooks** - State ve lifecycle yönetimi

## Özellikler

- ✅ Responsive tasarım
- ✅ Smooth scroll animasyonları
- ✅ Custom cursor efekti
- ✅ Parallax scrolling
- ✅ Magnetic button efektleri
- ✅ Intersection Observer animasyonları
- ✅ Scroll progress bar
- ✅ Modüler component yapısı
- ✅ Custom React hooks
- ✅ Type-safe constants
