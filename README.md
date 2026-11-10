# Cascarón Next.js

Base responsive en Next.js App Router, TypeScript, Tailwind CSS, React Aria
Components y Lucide React. La interfaz utiliza una estructura wireframe en
escala de grises, lista para reemplazar los textos y marcadores por contenido
real.

## Inicializar desde cero

```bash
pnpm create next-app cortinas-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
cd cortinas-web
pnpm add react-aria-components lucide-react
pnpm add next-intl
pnpm dev
```

Next.js puede generar automáticamente el campo opcional `packageManager` al
crear el proyecto. Si no se quiere mantenerlo, elimínalo de `package.json`
después de crear la app. Para evitar que Corepack vuelva a añadirlo al ejecutar
pnpm desde una terminal integrada de VS Code, se configura
`COREPACK_ENABLE_AUTO_PIN=0` en `.vscode/settings.json`; abre una terminal nueva
después de aplicar el ajuste.

En este proyecto, instala dependencias con `pnpm install` y arranca con
`pnpm dev`. Después abre [http://localhost:3000](http://localhost:3000).
Para comprobar la correspondencia de los catálogos de traducción, ejecuta
`pnpm test`.

## Estructura

```text
src/
├── app/
│   ├── globals.css
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx             # redirección a /home
│       ├── home/
│       │   ├── page.tsx
│       │   └── components/
│       ├── contact/
│       │   ├── page.tsx
│       │   └── components/
│       ├── decorators/
│       │   ├── page.tsx
│       │   └── components/
│       └── product/[id]/
│           ├── page.tsx
│           └── components/
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── LanguageSwitcher.tsx
├── i18n/
│   ├── navigation.ts
│   ├── request.ts
│   └── routing.ts
└── proxy.ts
messages/
├── ca.json
└── es.json
```

El layout raíz define los landmarks `header`, `main` y `footer`. `Header`
incluye navegación horizontal en escritorio y un menú accesible en móviles.
Las rutas principales son `/home`, `/product/[id]`, `/decorators` y
`/contact`; `/` redirige a `/home`. Los componentes exclusivos de una página
viven en su carpeta `components`, y `src/components/` contiene los
componentes compartidos de la aplicación.

## Tipografía

Outfit se utiliza para el texto y la interfaz, y Fraunces para los encabezados.
Las fuentes se cargan mediante `next/font` y se sirven desde la aplicación.

## Idiomas

La aplicación usa `next-intl` con español (`es`) y catalán (`ca`). Las rutas no
muestran prefijo de idioma; el idioma elegido se guarda en la cookie
`NEXT_LOCALE`. Los catálogos de traducción viven en `messages/`, y la
configuración de rutas y navegación está en `src/i18n/`. La navegación, el pie
de página, los metadatos y el contenido de las páginas tienen traducciones en
ambos idiomas.
