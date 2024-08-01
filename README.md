# Conquer Students Registration and Inquiry DApp

Este proyecto es una DApp (Aplicación Descentralizada) para registrar y consultar información de estudiantes utilizando un contrato inteligente en la blockchain de Ethereum.

## Estructura del Proyecto

- **index.html**: Contiene la estructura del frontend.
- **app.js**: Contiene la lógica para interactuar con el contrato inteligente.
- **constants.js**: Define las constantes necesarias como la dirección del contrato y su ABI.
- **ethers-5.6.esm.min.js**: Biblioteca de Ethers.js para interactuar con Ethereum.

## Requisitos

- MetaMask instalado en el navegador.
- Una cuenta de MetaMask conectada a la red adecuada.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/rolandolopez36/html-conquer-03-conquerstudents.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd html-conquer-03-conquerstudents
   ```

## Uso

1. Abre `index.html` en tu navegador.
2. Haz clic en el botón "Connect" para conectar MetaMask.
3. Registra un nuevo estudiante completando el formulario y haciendo clic en "Register Student".
4. Consulta tu información personal haciendo clic en "Inquire My Data".
5. Consulta todos los estudiantes registrados haciendo clic en "Inquire All Students".

### Pruebas con el Contrato

Antes de empezar, me gustaría que hicieras unas pruebas con el contrato que está en el interior de este repositorio y así ver los estudiantes de Conquer que están participando.

El contrato está desplegado en la red de prueba Sepolia. Sepolia es una red de prueba de Ethereum que se utiliza para probar contratos inteligentes sin gastar ETH real. Aquí se explica cómo configurar MetaMask para Sepolia y cómo fondear tu cuenta con ETH de Sepolia. Si por alguna razón tu wallet no encuentra Sepolia, entonces la puedes agregar tú mismo con estos pasos:

1. **Configuración de MetaMask para Sepolia**:

   - Abre MetaMask y haz clic en el menú desplegable de redes en la parte superior.
   - Selecciona "Add Network" o "Agregar red".
   - Ingresa la siguiente información:
     - **Network Name**: Sepolia Test Network
     - **New RPC URL**: `https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID`
     - **Chain ID**: 11155111
     - **Currency Symbol**: ETH
     - **Block Explorer URL**: `https://sepolia.etherscan.io`
   - Guarda los cambios y selecciona la red Sepolia desde el menú de redes.

2. **Fondear MetaMask con ETH de Sepolia**:
   - Ve a un faucet de Sepolia, como [Infura Faucet](https://www.infura.io/faucet/sepolia).
   - Ingresa la dirección de tu cuenta MetaMask y solicita ETH de prueba.
   - En unos momentos, deberías ver ETH en tu cuenta de MetaMask en la red Sepolia.

## Explicación del Código

### Importaciones y Variables Globales

```javascript
import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

let provider;
let signer;
let contract;
```

- **Importaciones**:

  - `ethers`: Biblioteca Ethers.js, que nos permite interactuar con la blockchain de Ethereum.
  - `{ abi, contractAddress }`: Importamos el ABI (Application Binary Interface) y la dirección del contrato inteligente desde `constants.js`.

- **Variables Globales**:
  - `provider`: Conecta nuestra aplicación a la blockchain.
  - `signer`: Representa a un usuario de Ethereum que puede firmar transacciones.
  - `contract`: Representa el contrato inteligente que vamos a interactuar.

### Selección de Elementos del DOM

```javascript
const connectButton = document.getElementById("connectButton");
const registerForm = document.getElementById("registerForm");
const personalDataButton = document.getElementById("personalDataButton");
const allStudentsButton = document.getElementById("allStudentsButton");
```

- Aquí seleccionamos elementos HTML utilizando sus IDs para poder añadirles funcionalidad más adelante.

### Función para Conectar MetaMask

```javascript
connectButton.onclick = async () => {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log("Connected");
  } else {
    console.error("MetaMask is not installed");
  }
};
```

- **`onclick`**: Asigna una función al evento de clic del botón de conexión.
- **`window.ethereum`**: Verifica si MetaMask está instalado.
- **`eth_requestAccounts`**: Solicita al usuario que se conecte con MetaMask.
- **`provider`**: Configura el proveedor utilizando MetaMask.
- **`signer`**: Obtiene el usuario que ha iniciado sesión en MetaMask.
- **`contract`**: Crea una instancia del contrato inteligente para que podamos interactuar con él.

### Función para Registrar un Estudiante

```javascript
registerForm.onsubmit = async (event) => {
  event.preventDefault();
  const name = document.getElementById("studentName").value;
  const surname = document.getElementById("studentSurname").value;
  const age = document.getElementById("studentAge").value;

  try {
    const tx = await contract.register_Students(name, surname, age);
    await tx.wait();
    console.log("Student registered successfully");
  } catch (error) {
    console.error("Error registering student", error);
  }
};
```

- **`onsubmit`**: Asigna una función al evento de envío del formulario.
- **`event.preventDefault()`**: Evita que el formulario se envíe de la manera tradicional.
- **`document.getElementById().value`**: Obtiene los valores de los campos del formulario.
- **`contract.register_Students()`**: Llama a la función `register_Students` del contrato inteligente.
- **`await tx.wait()`**: Espera a que la transacción se confirme en la blockchain.

### Función para Consultar Datos Personales

```javascript
personalDataButton.onclick = async () => {
  try {
    const student = await contract.getStudentByAddress();
    document.getElementById(
      "personalData"
    ).innerText = `Name: ${student.name}, Surname: ${student.surname}, Age: ${student.age}`;
  } catch (error) {
    console.error("Error fetching personal data", error);
  }
};
```

- **`onclick`**: Asigna una función al evento de clic del botón.
- **`contract.getStudentByAddress()`**: Llama a la función `getStudentByAddress` del contrato inteligente.
- **`document.getElementById().innerText`**: Muestra los datos del estudiante en el elemento HTML correspondiente.

### Función para Consultar Todos los Estudiantes

```javascript
allStudentsButton.onclick = async () => {
  try {
    const allStudents = await contract.getAllStudents();
    let output = "All Students:
";
    allStudents.forEach((student, index) => {
      output += \`\${index + 1}. Name: \${student.name}, Surname: \${student.surname}, Age: \${student.age}
\`;
    });
    document.getElementById("allStudents").innerText = output;
  } catch (error) {
    console.error("Error fetching all students", error);
  }
};
```

- **`onclick`**: Asigna una función al evento de clic del botón.
- **`contract.getAllStudents()`**: Llama a la función `getAllStudents` del contrato inteligente.
- **`allStudents.forEach()`**: Recorre el array de estudiantes y construye una cadena con la información de cada uno.
- **`document.getElementById().innerText`**: Muestra la lista de todos los estudiantes en el elemento HTML correspondiente.

## Resumen

Este código te permite interactuar con un contrato inteligente en Ethereum utilizando MetaMask. Configura una conexión, registra estudiantes, y consulta información de estudiantes mediante un frontend simple en HTML y JavaScript. Cada función y variable tiene un propósito específico para asegurar que la aplicación funcione correctamente y proporcione la interfaz necesaria para los usuarios.
