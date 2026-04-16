

## Plan: Anexo Económico interactivo con descarga a Excel

### Objetivo
Montar un visor del Annex 2 (5 tabs del Excel) con todos los textos originales, rediseñado al estilo actual del landing, e incluir un botón "Descargar Excel" que genere el .xlsx idéntico al original.

---

### 1. Nuevo componente `AnnexViewer` con 5 tabs

**Archivo nuevo:** `src/components/landing/annex/AnnexViewer.tsx`

Usar `Tabs` de shadcn con 5 tabs (mismos nombres del Excel):
1. **Instructions** — tabla de 9 reglas (Currency, Taxes, WHT, Validity, Billing Trigger, Travel, Implementation, Volumetrics, Consistency).
2. **Baseline Scenarios** — tabla de 9 países con 7 columnas de volúmenes + totales (2,150,500 créditos · 1,053,100 clientes · 4,172 usuarios).
3. **OPEX – On-Premise (Subscription)** — tabla de 9 países con phase, métrica "Per Active Loan", volumen, $0.03–$0.10 unit price, total anual = $774,180 + bloques de licencias anuales (Credit Core $350K, Tarjetas $250K, Factoring $100K).
4. **OPEX – SaaS (Cloud)** — misma estructura, total $1,278,455, incluye tabla "Costing Model per Loan" (tiers 1–100K, 100K–200K, etc.).
5. **Implementation Services** — tabla con Honduras $1,220,000 + Nicaragua $101,416 + países "Train-the-Trainer" en $0 = **TOTAL $1,321,416**, más las instrucciones de fade-out (Phase 1/2/3) y nota T&E.

**Diseño:**
- Cada tab dentro de una `Card` con header `Inversión Fija — Anexo 2`
- Bloques "INSTRUCTIONS" en banners con icono (estilo accent suave)
- Tablas con la misma estética que `Pricing.tsx` (border-border, tabular-nums, totales en accent rojo `#b41d2f`)
- Mobile: tabs en `Select` colapsable + tablas en `overflow-x-auto`
- Animación fade-in al cambiar de tab

### 2. Datos centralizados

**Archivo nuevo:** `src/components/landing/annex/annexData.ts`

Exportar todas las constantes (instructions, baseline, onPremise, saas, costingTiers, implementation, licenseBlocks). Una sola fuente de verdad para UI + generación de Excel.

### 3. Botón "Descargar Excel"

**Librería:** instalar `xlsx` (SheetJS, ya muy común, ~600KB).

Header del componente con dos botones:
- **Descargar Excel** (primario rojo SYSDE, icono `Download`) → genera y descarga `Annex_2_SYSDE_Response.xlsx` con 5 hojas idénticas al original (mismos headers, mismos números, mismos formatos $#,##0).
- **(opcional)** Toggle entre "Vista" y "Modo presentación".

Función `generateExcel()` en `src/components/landing/annex/excelExport.ts`:
- 5 worksheets con `XLSX.utils.aoa_to_sheet` desde los mismos datos
- Anchos de columna razonables, formato de números, celdas TOTAL en negrita
- `XLSX.writeFile(wb, "Annex_2_SYSDE_Response.xlsx")`

### 4. Integración en la página

**Archivo:** `src/components/landing/Pricing.tsx` (ligero cambio)

Insertar el `<AnnexViewer />` justo **después** del cierre ejecutivo (línea ~501), dentro de la misma sección `#pricing`. Mantener todo el diseño actual de Pricing intacto.

Agregar un sub-título separador:
> "Anexo 2 — Respuesta detallada al modelo económico oficial de Unicomer"

### 5. Archivos a crear/modificar

| Archivo | Acción |
|---|---|
| `src/components/landing/annex/AnnexViewer.tsx` | **Nuevo** — UI con 5 tabs |
| `src/components/landing/annex/annexData.ts` | **Nuevo** — datos del Excel |
| `src/components/landing/annex/excelExport.ts` | **Nuevo** — generador XLSX |
| `src/components/landing/Pricing.tsx` | Insertar `<AnnexViewer />` al final |
| `package.json` | Agregar dependencia `xlsx` |

### Detalles técnicos
- Usar `Tabs`, `Card`, `Button` de shadcn (ya disponibles)
- Iconos: `FileSpreadsheet`, `Download`, `Info`, `Layers`, `HardDrive`, `Cloud`, `Briefcase` (lucide)
- Colores: rojo SYSDE `#b41d2f` para totales y CTA, gris `#4d4d4f` para headers
- Excel generado conserva: nombres de hojas, headers exactos, números formateados, totales con fórmula `=SUM(...)` cuando aplique
- Sin backend — descarga 100% client-side

