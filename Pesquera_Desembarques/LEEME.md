# Panel de Control de Desembarques - Pesquera Talcahuano Sur SpA

## Descripción del proyecto

Aplicación web SPA desarrollada con React y Vite para gestionar registros de desembarques pesqueros.

El sistema permite visualizar, filtrar, agregar, editar y eliminar lotes de desembarque. Además, permite marcar registros prioritarios mediante almacenamiento local del navegador.

La aplicación consume un servicio REST simulado mediante json-server.

---

# Elementos de React utilizados

## Componentes

Los componentes permiten dividir la aplicación en partes reutilizables y facilitar el mantenimiento del código.

Componentes utilizados:

- **App.jsx**
  
  Es el componente principal de la aplicación. Administra los estados generales, realiza las peticiones a la API y coordina la comunicación entre los demás componentes.

- **FormularioDesembarque.jsx**

  Componente encargado de mostrar el formulario para crear y editar registros de desembarque.

- **TablaDesembarques.jsx**

  Componente encargado de renderizar la información de los desembarques en formato tabla y permitir acciones como editar, eliminar y marcar prioridades.

---

# Props

Las props permiten enviar información desde un componente padre hacia componentes hijos.

En este proyecto se utilizan para comunicar información desde `App.jsx` hacia:

- `FormularioDesembarque.jsx`
- `TablaDesembarques.jsx`

Ejemplos de props utilizadas:

- datos del formulario.
- funciones para agregar registros.
- funciones para eliminar registros.
- funciones para editar registros.
- lista de prioridades.

---

# Estado con useState

Se utiliza `useState` para almacenar información dinámica de la aplicación.

Estados utilizados:

- Lista de desembarques.
- Estado de carga.
- Mensajes de error.
- Datos del formulario.
- Registro actualmente editado.
- Filtro de búsqueda.
- Estado seleccionado.
- Lista de registros prioritarios.

Esto permite que la interfaz se actualice automáticamente cuando cambian los datos.

---

# useEffect

El hook `useEffect` se utiliza para ejecutar acciones después del renderizado del componente.

En este proyecto se utiliza para realizar la carga inicial de los desembarques desde la API mediante una petición `fetch`.

---

# JSX

JSX permite escribir estructuras similares a HTML dentro de JavaScript.

Fue utilizado para construir:

- Formularios.
- Tablas.
- Botones.
- Paneles estadísticos.
- Mensajes de carga y error.

---

# Manejo de eventos

Los eventos permiten interactuar con el usuario.

Ejemplos utilizados:

- `onChange` para capturar información ingresada en formularios y filtros.
- `onClick` para ejecutar acciones como editar, eliminar o cambiar prioridades.
- `onSubmit` para enviar formularios.

---

# Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó ChatGPT como herramienta de apoyo para:

- Revisión de estructura React.
- Buenas prácticas de programación.
- Manejo seguro de Local Storage.
- Validación de formularios.
- Organización de componentes.

También se consideraron recomendaciones entregadas por herramientas de IA para mejorar la calidad del código.

## Sugerencia recibida mediante herramienta de IA

Durante el desarrollo se recibió la recomendación de utilizar una variable de entorno para almacenar la URL de la API, evitando escribir directamente la dirección del servicio dentro del código.

### Evaluación de la sugerencia

La recomendación fue aceptada porque mejora la organización del proyecto, facilita cambios futuros y evita tener información de configuración escrita directamente en los componentes.

## Evaluación de la sugerencia

La recomendación fue aceptada debido a que mejora la mantenibilidad y seguridad del proyecto.

Se implementó la variable:

VITE_API_URL

para evitar tener direcciones escritas directamente en el código fuente.

---

# Análisis de calidad del código

Se realizó análisis utilizando SonarQube for IDE.

Durante el análisis del proyecto y la revisión de buenas prácticas de desarrollo seguro se identificaron los siguientes puntos de mejora:

## Hallazgo 1: Dirección de API escrita directamente en el código

### Problema

Inicialmente las peticiones podían contener directamente la dirección del servicio.

Ejemplo:

fetch("http://localhost:3001/desembarques")

### Corrección aplicada

Se implementó una variable de entorno:

VITE_API_URL=/api

y las peticiones ahora utilizan:

fetch(`${API_URL}/desembarques`)

Esto permite cambiar el servicio sin modificar el código fuente.

---

## Hallazgo 2: Validación de información ingresada por usuarios

### Problema

Los formularios deben evitar enviar datos incompletos o valores incorrectos.

### Corrección aplicada

Se agregaron validaciones antes de enviar información:

- Campos obligatorios.
- Validación de kilos mayores a cero.
- Conversión correcta de valores numéricos.

Esto evita almacenar datos inválidos en el sistema.

---

# Buenas prácticas de desarrollo seguro aplicadas

- Validación de datos antes de enviarlos.
- Manejo de errores en solicitudes HTTP.
- Uso de variables de entorno.
- Uso controlado de Local Storage.
- Separación de componentes.
- No utilización de contenido HTML sin sanitización.

---

# Ejecución del proyecto

Para ejecutar correctamente la aplicación se deben instalar primero las dependencias del proyecto:

npm install

La aplicación utiliza json-server como servicio REST local para simular la API de desembarques.

El archivo con los datos se encuentra ubicado en:

api/db_CasoA_desembarques.json

Para iniciar el servicio REST se debe ejecutar:

npm run server

Este comando levanta el servidor de datos en el puerto 3001 y permite acceder al recurso de desembarques mediante:

http://localhost:3001/desembarques

Luego, en una segunda terminal, se debe iniciar la aplicación React con:

npm run dev

La aplicación consume la información mediante peticiones fetch y utiliza la variable de entorno:

VITE_API_URL=/api

El uso de esta variable permite evitar escribir directamente la dirección del servicio dentro del código y facilita la configuración del proyecto.

# Tecnologías utilizadas

- React.
- Vite.
- JavaScript.
- CSS.
- JSON Server.
- Local Storage.
- SonarQube for IDE.