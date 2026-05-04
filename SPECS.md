# Especificación Técnica del UI: Panel de Administración de AgentHub [cite: 34]

## 1. Descripción del Producto
**AgentHub** es una plataforma SaaS donde las empresas pueden alquilar agentes de IA — asistentes inteligentes preconfigurados que pueden equiparse con distintas skills (habilidades como navegar por la web, leer documentos o gestionar calendarios) y desplegarse para tareas de negocio específicas.

**El Usuario:** El usuario administrador que utilizará este panel[cite: 114].

## 2. Stack Tecnológico y Restricciones
* **HTML:** HTML5 semántico[cite: 36].
* **CSS:** Usa Tailwind CSS vía CDN para todos los estilos[cite: 36]. [cite_start]Sin archivos CSS personalizados y sin atributos `style` en línea[cite: 130].
* **JavaScript:** Vanilla JavaScript (ES6) para gestionar el estado de los menús desplegables (dropdowns), modales, expansiones (accordions) y el cambio de tema[cite: 37].
* **Restricciones:** Sin frameworks[cite: 115]. [cite_start]Todos los datos deben estar hardcodeados — el equipo no espera conexiones a API ni backend en esta etapa[cite: 30].

## 3. Especificaciones por Sección

### 3.1 Dashboard 
1. Cuatro tarjetas de métricas (ingresos totales generados, pérdida total por descuentos y cupones, número de agentes activos, y número de agentes fallando)[cite: 8]. Cada una con un icono, una etiqueta y un valor hardcodeado[cite: 58].
2. Las tarjetas usan colores de acento distintos por tipo de métrica e incluyen una sombra sutil[cite: 118].
3. Un área de ancho completo debajo de las tarjetas que representa un gráfico de actividad semanal[cite: 61].

### 3.2 Gestión de Usuarios [cite: 11]
1. Una tabla con al menos 5 filas de usuarios hardcodeados mostrando nombre, email, plan y badge de estado[cite: 11, 131].
2. Cada fila tiene un dropdown `⋮` con "Ver detalle" y "Eliminar"[cite: 12].
3. "Ver detalle" abre un modal overlay con el registro completo del usuario[cite: 13]. El modal debe cerrarse mediante un botón y haciendo clic en el backdrop[cite: 14].

### 3.3 Gestión de Agentes [cite: 15]
1. Un listado con al menos 4 agentes, cada uno mostrando nombre, propietario, badge de estado y una lista de skills colapsada[cite: 15, 132].
2. Hacer clic en el control expandible revela las skills del agente con una transición suave; volver a hacer clic las colapsa[cite: 17, 138].
3. Cada agente tiene un dropdown `⋮` con "Configurar" y "Eliminar"[cite: 18]. "Configurar" abre un modal con el prompt de sistema del agente en un `<textarea>` editable[cite: 18, 137].

### 3.4 Skills [cite: 19]
1. Un catálogo de al menos 4 skills, cada una mostrando nombre, descripción breve y el número de agentes que la tienen habilitada[cite: 20, 133].
2. Una breve explicación dentro del panel sobre qué significa una "skill" en el contexto de AgentHub[cite: 21].
3. Cada skill tiene un dropdown `⋮` con "Ver detalle" y "Eliminar"[cite: 22].

### 3.5 Contrataciones de Agentes [cite: 23]
1. Una tabla con al menos 4 contratos mostrando cliente, agente alquilado, skills contratadas, fechas de inicio/fin e importe pagado[cite: 24, 134].
2. Cada fila tiene un dropdown `⋮`[cite: 25].
3. "Ver detalle" abre un modal con el desglose completo del contrato, incluyendo la lista desglosada de skills contratadas y sus precios individuales[cite: 25].

### 3.6 Log de Errores [cite: 26]
1. Al menos 6 entradas de error hardcodeadas mostrando timestamp, nombre del agente, badge de tipo de error con código de color, y descripción breve[cite: 26, 27, 135].
2. Los errores deben categorizarse visualmente por tipo o gravedad usando badges con código de color[cite: 27].
3. Cada entrada tiene un dropdown `⋮` con "Ver detalle" y "Marcar como resuelto"[cite: 28].

## 4. Inventario de Componentes UI Reutilizables [cite: 119]
* Barra lateral (sidebar) persistente con enlaces a las seis secciones y un indicador de sección activa[cite: 6].
* Tarjeta de métrica[cite: 119].
* Dropdown de acciones `⋮`[cite: 119].
* Modal overlay con backdrop[cite: 13, 14, 119].
* Badge para estados y gravedades[cite: 119].
* Lista de skills colapsable[cite: 119].
* Toggle de modo oscuro[cite: 119].

## 5. Criterios de Aceptación (Interacciones Globales) [cite: 120]
1. Un toggle de modo oscuro/claro en la barra superior cambia toda la interfaz entre modo claro y modo oscuro usando las utilidades `dark:` de Tailwind[cite: 7]. El modo elegido debe conservarse al navegar entre secciones (usando `localStorage`)[cite: 139].
2. Todos los dropdowns de acciones se cierran al hacer clic fuera de su área (click outside)[cite: 52].
3. Todos los modales se cierran al hacer clic en el backdrop[cite: 94].
4. La expansión/colapso de skills tiene una transición fluida al hacer clic en el control[cite: 95, 138].