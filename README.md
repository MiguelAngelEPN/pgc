# Simple E-commerce Frontend

Este es un **e-commerce frontend** desarrollado con **Next.js + TypeScript**, que simula el flujo básico de una tienda en línea.  
Los datos de los productos provienen de un archivo JSON local y la persistencia de favoritos y carrito se maneja mediante **LocalStorage**.

## Características

- 🔍 **Búsqueda con debounce** (500ms): el buscador espera medio segundo desde que el usuario deja de escribir para optimizar las consultas.
- ⌨️ **Accesibilidad**:
  - Navegación completa con teclado.
  - El **modal de producto** se puede cerrar presionando `Escape`.
- ❤️ **Favoritos persistentes**:
  - Los productos pueden marcarse como favoritos.
  - Los favoritos se guardan en `localStorage` y se listan desde la cabecera.
- 🛍️ **Carrito de compras**:
  - Botón **Agregar al carrito** en cada producto.
  - Persistencia en `localStorage`.
  - Contador en cabecera que aumenta según los productos agregados.
- 📦 **Persistencia en LocalStorage** para favoritos y carrito.
- ⚡ **Rendimiento optimizado**: modal accesible y sin *Cumulative Layout Shift (CLS)*.

## Demo

> ⚠️ Este proyecto no tiene backend, solo frontend.

Ejecutando en **Next.js** en el puerto **3000**:
- Desarrollo: `http://localhost:3000`
- Build: `http://localhost:3000` después de `npm run build && npm run start`

## Tecnologías utilizadas

- **Next.js** (React framework)
- **TypeScript**
- **Jest + React Testing Library** para tests unitarios e integrales
- **TailwindCSS** para estilos
- **LocalStorage** para persistencia

## ⚙️ Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/MiguelAngelEPN/pgc.git
   cd tu-repo

2. Instala dependencias:
   ```bash
   npm install
   
3. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   
4. Genera la build de producción:
   ```bash
   npm run build
   npm run start
   
5. Genera la build de producción:
   ```bash
   npm run test


## 🚀 Ejecución con Docker
Este proyecto incluye un Dockerfile que permite construir y ejecutar la aplicación en un contenedor.


1. Construir la imagen: Desde la raíz del proyecto, ejecutar.
   ```bash
   docker build -t my-nextjs-app .

2. Ejecutar el contenedor:Para correr la aplicación en el puerto 3000.
   ```bash
   docker run -d -p 3000:3000 --name my-nextjs-app --restart always my-nextjs-app
   
3. Detener el contenedor
   ```bash
   docker stop my-nextjs-app
   
4. Reiniciar el contenedor
   ```bash
   docker start my-nextjs-app
   
## 🧪 Tests implementados
✔️ Búsqueda con debounce

✔️ Cierre de modal con Escape

❌ Paginación/cursor (pendiente)

❌ Favoritos persistentes (pendiente)

❌ Estado vacío y de error (pendiente)

## 📂 Estructura del proyecto
    pgcfront/
    ├── public/            # Recursos estáticos
    ├── src/
    │   ├── components/    # Componentes UI
    │   ├── app/           # Rutas Next.js
    │   ├── __tests__/     # Pruebas unitarias/integración
    │   ├── modals/        # modales
    │   └── types/         # interfaces
    ├── package.json
    ├── jest.config.js
    └── README.md

## 🛠️ Flujo de trabajo Git
Este proyecto sigue un flujo de trabajo colaborativo en Git:

1. Creación de issues para cada feature/bug.

2. Trabajo en ramas feat/... o fix/....

3. Pull Requests que cierran issues.

4. Checklist en cada PR:

    - [x] Incluye tests o actualiza existentes.
    - [x] Estados de carga/error/empty visibles.
    - [x] Accesible (foco, roles, labels, contraste).
    - [x] Sin CLS por imágenes; lazy load aplicado.
    - [] CI simple (GitHub Actions) que corra lint/test/build (pendiente)