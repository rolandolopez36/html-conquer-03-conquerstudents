import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

let provider;
let signer;
let contract;

const connectButton = document.getElementById("connectButton");
const registerForm = document.getElementById("registerForm");
const personalDataButton = document.getElementById("personalDataButton");
const allStudentsButton = document.getElementById("allStudentsButton");

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

allStudentsButton.onclick = async () => {
  try {
    const allStudents = await contract.getAllStudents();
    let output = "All Students:\n";
    allStudents.forEach((student, index) => {
      output += `${index + 1}. Name: ${student.name}, Surname: ${
        student.surname
      }, Age: ${student.age}\n`;
    });
    document.getElementById("allStudents").innerText = output;
  } catch (error) {
    console.error("Error fetching all students", error);
  }
};
