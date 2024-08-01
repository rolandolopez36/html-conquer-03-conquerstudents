export const contractAddress = "0xe258161c6ec57A911CAe48e26FAD01008e6550a5";

export const abi = [
  {
    inputs: [],
    name: "getAllStudents",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "surname",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "age",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "exist",
            type: "bool",
          },
        ],
        internalType: "struct ConquerStudents.Students[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStudentByAddress",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "surname",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "age",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "exist",
            type: "bool",
          },
        ],
        internalType: "struct ConquerStudents.Students",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
    ],
    name: "getStudentById",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "surname",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "age",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "exist",
            type: "bool",
          },
        ],
        internalType: "struct ConquerStudents.Students",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_surname",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_age",
        type: "uint8",
      },
    ],
    name: "register_Students",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
