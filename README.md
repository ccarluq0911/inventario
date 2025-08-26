# Inventario de Almacén

Aplicación web para gestionar el stock de un almacén, con historial de movimientos, actualización de cantidades y autenticación mediante JWT.

## Tecnologías

- **Front-end:** React + TypeScript  
- **Back-end:** FastAPI + Python  
- **Base de datos:** PostgreSQL  
- **Autenticación:** JWT (JSON Web Tokens)  
- **Pruebas:** Jest + React Testing Library (front-end), pytest (back-end)  

## Funcionalidades

1. **Listado de stock:**  
   - Muestra SKU, EAN13 y cantidad en stock de cada ítem.
2. **Actualización de stock:**  
   - Botón para modificar la cantidad en stock.
   - No se puede actualizar si la cantidad no cambia.
3. **Historial de movimientos:**  
   - Lista todas las entradas y salidas de stock con tipo, cambio y fecha.
4. **Autenticación:**  
   - Login mediante usuario y contraseña.  
   - JWT para proteger los endpoints de actualización de stock.

## Instalación

### Requisitos

- Node.js >= 18  
- Python >= 3.10  
- PostgreSQL

### Backend

1. Crear y activar un entorno virtual (dentro de la carpeta backend):

```bash
cd backend
python -m venv .env
source .env/bin/activate  # Linux / macOS
.env\Scripts\activate     # Windows
```

2. Instalar dependencias
```
pip install -r requirements.txt
```

3. Ejecutar el backend
```
uvicorn main:app --reload
```

### Frontend

1. Instalar dependencias (dentro de la carpeta frontend):
```
npm install
```

2. Ejecutar la app:
```
npm run dev
```

La app estará disponible en http://localhost:5173.

## Pruebas
### Backend
```
pytest
```

### Frontend
```
npm run test
```

## Uso

1. Acceder a la página de login y autenticarse.
2. Ver listado de stock y modificar cantidades si es necesario.
3. Consultar historial de movimientos para ver entradas y salidas.

## Aclaraciones

- No se han implementado endpoints para creación o eliminación de productos, con el fin de mantener la sencillez de la aplicación.  
- El login de usuario se implementa únicamente para autenticación JWT; no se incluye registro de usuarios ni gestión avanzada de roles. Los datos de inicio de sesión son "admin" y "admin123" para el usuario y la contraseña respectivamente.
