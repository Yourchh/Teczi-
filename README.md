# Teczi-
Empresa de cursos

---

## Documentacion
En la presente documentacion se presentan los pasos detallados para la elaboracion de la practica 5.

---

### ## 1. Creación del Bucket en S3 ☁️

Vamos a crear el contenedor principal en la nube. Piensa en un **bucket** como en un disco duro virtual exclusivo para tu proyecto.

1.  **Navegar al servicio S3:** Inicia sesión en tu [Consola de AWS](https://aws.amazon.com/console/). En la barra de búsqueda superior, escribe **S3** y selecciónalo de la lista de servicios.
2.  **Iniciar la creación:** En el panel de S3, verás un botón naranja o azul destacado que dice **"Crear bucket"**. Haz clic en él.
3.  **Configuración General:**
    * **Nombre del bucket:** Este es un identificador único a nivel mundial (nadie más en el mundo puede tener el mismo nombre). Usa el formato sugerido para asegurar que sea único: `recursos-videosyfotosplatzi-tu-nombre`.
    * **Región de AWS:** Elige la ubicación física de los servidores. Una región cercana a tus usuarios principales reduce la latencia. **US East (N. Virginia) `us-east-1`** es una opción común y robusta.
4.  **Configuración de Acceso Público:** Este es el paso más crítico para que tu sitio funcione.
    * Busca la sección llamada **"Configuración de Bloqueo de acceso público para este bucket"**.
    * Por defecto, la casilla **"Bloquear *todo* el acceso público"** está marcada por seguridad. Debes **desmarcar** esta casilla.
    * Al desmarcarla, AWS te mostrará una advertencia en un recuadro amarillo, explicando que los objetos de tu bucket podrían volverse públicos. Lee la advertencia y marca la casilla que dice **"Confirmo que la configuración actual podría dar lugar a que este bucket y los objetos que contiene se vuelvan públicos"**.
    
5.  **Finalizar la creación:** Deja todas las demás opciones con sus valores predeterminados (como el control de versiones, etiquetas, etc.). Desplázate hasta el final de la página y haz clic en **"Crear bucket"**.

---

### ## 2. Subida de Objetos y Asignación de Permisos ⬆️

Ahora cargaremos tus archivos multimedia. Cada archivo en S3 se llama "objeto". Les daremos un permiso específico que es como una "llave de solo lectura" para que cualquiera en internet pueda verlos.

1.  **Acceder al bucket:** En la lista de buckets de S3, haz clic en el nombre del bucket que acabas de crear.
2.  **Iniciar la carga:** Dentro del bucket, haz clic en el botón **"Cargar"** (Upload).
3.  **Seleccionar archivos:** En la pantalla de carga, puedes arrastrar y soltar tus 3 imágenes y 2 videos, o hacer clic en el botón **"Añadir archivos"** para buscarlos en tu computadora.
4.  **Configurar permisos de carga:** Una vez que tus archivos aparezcan en la lista para cargar, no presiones "Cargar" todavía. Desplázate hacia abajo hasta encontrar la sección **"Permisos"**.
    * Expande esta sección si está colapsada.
    * Busca el apartado **"Listas de control de acceso (ACL) predefinidas"**.
    * Selecciona la opción **"Conceder acceso de lectura público"**. Esta acción, conocida como **ACL `public-read`**, es la que permite que los navegadores accedan a tus archivos.
    
5.  **Completar la carga:** Ahora sí, desplázate hasta el final y haz clic en **"Cargar"**. Espera a que finalice el proceso.
6.  **Copiar las URLs:**
    * Una vez cargados los archivos, verás un mensaje de éxito. Cierra esa pantalla para volver a la lista de objetos de tu bucket.
    * Haz clic en el nombre de tu primer archivo (ej: `imagen1.jpg`).
    * Esto te llevará a la página de detalles del objeto. En la sección **"Propiedades del objeto"**, verás un campo llamado **"URL del objeto"**.
    * Copia esta URL completa y pégala en un bloc de notas. **Repite este proceso para cada uno de los 5 archivos**. Necesitarás estas 5 URLs exactas para el siguiente paso.

---

### ## 3. Preparación de los Archivos de la Página Web 🎨

Ahora, crea los tres archivos de tu sitio web en una carpeta en tu computadora. No necesitas pegar el código aquí, solo entender qué hace cada archivo y dónde harás la modificación clave.

* **`index.html`:** Este archivo define la estructura básica de tu página: un título, un contenedor vacío para la galería y otro para el visor modal. Es el esqueleto.
* **`style.css`:** Este archivo contiene todas las reglas de diseño. Define los colores, la tipografía, y lo más importante, usa **CSS Grid** para que tu galería se adapte automáticamente a diferentes tamaños de pantalla (móvil, tablet, escritorio).
* **`script.js`:** Este es el cerebro de la página. Su tarea principal es leer la lista de URLs que le proporcionarás y construir la galería dinámicamente.
    * **Acción requerida:** Abre el archivo `script.js` con un editor de texto (como Visual Studio Code, Sublime Text o incluso el Bloc de notas).
    * Cerca del inicio del archivo, encontrarás una variable declarada como `const mediaUrls = [...]`.
    * Dentro de los corchetes `[]`, verás varios objetos de ejemplo con placeholders como `'URL_DE_TU_IMAGEN_1.jpg'`.
    * Tu única tarea aquí es **reemplazar cada una de esas cadenas de texto de ejemplo con las URLs de objeto reales que copiaste de S3** en el paso anterior. Asegúrate de mantener las comillas simples o dobles.

---

### ## 4. Alojamiento del Sitio Web Estático en S3 🌐

Finalmente, configuraremos el bucket para que actúe como un servidor web y subiremos los archivos de tu página.

1.  **Navegar a la configuración de hosting:** Vuelve a la página principal de tu bucket en la consola de AWS. Haz clic en la pestaña **"Propiedades"**.
2.  **Habilitar el alojamiento web:** Desplázate hasta la última tarjeta de configuración, que se llama **"Alojamiento de sitios web estáticos"**. Haz clic en el botón **"Editar"** que se encuentra en esa tarjeta.
3.  **Configurar las opciones:**
    * Selecciona la opción **"Habilitar"**. Esto revelará nuevas opciones.
    * En el campo **"Documento de índice"**, escribe `index.html`. Este es el nombre del archivo que S3 debe mostrar por defecto cuando alguien visita la URL de tu sitio.
    * Deja el campo **"Documento de error"** en blanco.
    * Haz clic en **"Guardar cambios"**.
    
4.  **Subir los archivos del sitio web:**
    * Regresa a la pestaña **"Objetos"** de tu bucket.
    * Haz clic en **"Cargar"**, igual que en el Paso 2.
    * Sube los tres archivos que preparaste: `index.html`, `style.css` y `script.js`.
    * **¡Muy importante!** Al igual que con los archivos multimedia, durante la carga de estos tres archivos también debes ir a **Permisos → Listas de control de acceso (ACL) predefinidas** y seleccionar **"Conceder acceso de lectura público"**. Si omites este paso, tu sitio web no podrá cargar el CSS ni el JavaScript.
5.  **Acceder a tu sitio web:**
    * Vuelve a la pestaña **"Propiedades"** y baja de nuevo a la sección **"Alojamiento de sitios web estáticos"**.
    * Ahora, en lugar de un botón de "Editar", verás el **"Punto de conexión del sitio web del bucket"**. Esta es la URL pública de tu sitio web.
    * Copia esta URL, pégala en una nueva pestaña del navegador y ¡listo! Tu galería web estará en línea, funcionando y sirviendo los archivos directamente desde S3.