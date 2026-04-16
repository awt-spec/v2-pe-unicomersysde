

## Plan: Mejoras visuales al Pricing y Puzzle (sin cambiar datos)

### Objetivo
Hacer la sección de Pricing y el rompecabezas mas visualmente impactantes e intuitivos, sin agregar ni modificar datos existentes.

---

### 1. Pricing: Cronograma de Pagos Visual (timeline)

**Archivo:** `src/components/landing/Pricing.tsx`

Reemplazar la tabla del calendario de pagos por una **timeline visual horizontal** con los mismos 5 anos:
- 5 nodos circulares conectados por una linea animada que se llena con scroll/inView
- Cada nodo muestra: Ano, total, y un desglose en tooltip/popover al hover
- Ano 1 destacado con borde accent (por incluir implementacion)
- Anos 2-5 con estilo recurrente uniforme
- El total de 5 anos ($4,321,416) aparece al final con efecto counter animado
- Mobile: timeline vertical

### 2. Pricing: Cards de impacto ejecutivo

**Archivo:** `src/components/landing/Pricing.tsx`

Agregar **4 cards** despues de la timeline, calculadas con los datos existentes (sin datos nuevos):
- **"$0 por usuario adicional"** — derivado del modelo ilimitado ya existente
- **"~$67K por pais/ano"** — $600K / 9 paises, dato ya implicito
- **"$0.36 por credito/ano"** — $774,180 / 2,150,500 creditos, dato ya implicito
- **"1 plataforma = 9 paises"** — consolidacion, dato ya presente

Cada card: numero grande con counter animado (useInView), subtitulo, icono, borde gradient sutil accent.

### 3. Pricing: Frase de cierre

Bloque con frase ejecutiva grande al final:
> "La pregunta no es cuanto cuesta SAF+. Es cuanto le cuesta a Unicomer NO tenerlo."

Estilo: texto grande, centrado, con fade-in.

### 4. Puzzle: Lineas de conexion entre piezas

**Archivo:** `src/components/landing/PuzzleModules.tsx`

Agregar **lineas SVG animadas** que conectan piezas relacionadas cuando estan ensambladas:
- Lineas curvas (bezier) entre piezas de la misma capa con stroke animado (dash-offset)
- Al ensamblar una capa, las lineas aparecen con efecto de "flujo de datos" (animacion de dash moviéndose)
- Color de la linea = color de la capa con opacidad baja
- Las lineas desaparecen cuando se abre un detail slide

### 5. Puzzle: Particulas/glow al ensamblar

**Archivo:** `src/components/landing/puzzle/PieceAnimated.tsx`

Mejorar la animacion de ensamblaje:
- Al momento que una pieza se ensambla (transicion a verde), emitir un destello radial breve (radial gradient que aparece y desaparece)
- Efecto "snap" con micro-scale bounce (1 -> 1.05 -> 1) al llegar a posicion final
- Sutil particula trail durante el scatter-to-assembled

### 6. Puzzle: Contador de progreso

**Archivo:** `src/components/landing/PuzzleModules.tsx`

Agregar un indicador de progreso visual en la esquina:
- Circulo de progreso SVG que muestra "X/20 modulos revelados"
- Se actualiza con cada capa revelada (5/20 -> 12/20 -> 20/20)
- Al completar: animacion de celebracion sutil (pulse verde)

---

### Archivos a modificar
| Archivo | Cambio |
|---|---|
| `src/components/landing/Pricing.tsx` | Timeline visual, cards ejecutivas, frase cierre |
| `src/components/landing/PuzzleModules.tsx` | Lineas de conexion SVG, contador de progreso |
| `src/components/landing/puzzle/PieceAnimated.tsx` | Efecto glow/snap al ensamblar |

### Detalles tecnicos
- Counters animados con `useInView` + requestAnimationFrame
- Timeline con `motion.div` y barras de progreso
- Lineas SVG con `strokeDasharray` + `strokeDashoffset` animado
- Todos los datos son los mismos que ya existen en el componente

