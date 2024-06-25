const { ethers } = require('ethers');
require('dotenv').config()
const contractABI = [
   {
      "inputs": [
         {
            "internalType": "uint16",
            "name": "networkId",
            "type": "uint16"
         },
         {
            "components": [
               {
                  "internalType": "uint8",
                  "name": "yParity",
                  "type": "uint8"
               },
               {
                  "internalType": "uint256",
                  "name": "xCoord",
                  "type": "uint256"
               }
            ],
            "internalType": "struct TssKey[]",
            "name": "keys",
            "type": "tuple[]"
         }
      ],
      "stateMutability": "payable",
      "type": "constructor"
   },
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": true,
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
         },
         {
            "indexed": true,
            "internalType": "bytes32",
            "name": "sender",
            "type": "bytes32"
         },
         {
            "indexed": true,
            "internalType": "address",
            "name": "recipient",
            "type": "address"
         },
         {
            "indexed": false,
            "internalType": "uint16",
            "name": "network",
            "type": "uint16"
         },
         {
            "indexed": false,
            "internalType": "uint256",
            "name": "gasLimit",
            "type": "uint256"
         },
         {
            "indexed": false,
            "internalType": "uint256",
            "name": "salt",
            "type": "uint256"
         },
         {
            "indexed": false,
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
         }
      ],
      "name": "GmpCreated",
      "type": "event"
   },
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": true,
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
         },
         {
            "indexed": true,
            "internalType": "bytes32",
            "name": "source",
            "type": "bytes32"
         },
         {
            "indexed": true,
            "internalType": "address",
            "name": "dest",
            "type": "address"
         },
         {
            "indexed": false,
            "internalType": "uint256",
            "name": "status",
            "type": "uint256"
         },
         {
            "indexed": false,
            "internalType": "bytes32",
            "name": "result",
            "type": "bytes32"
         }
      ],
      "name": "GmpExecuted",
      "type": "event"
   },
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": true,
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
         },
         {
            "components": [
               {
                  "internalType": "uint8",
                  "name": "yParity",
                  "type": "uint8"
               },
               {
                  "internalType": "uint256",
                  "name": "xCoord",
                  "type": "uint256"
               }
            ],
            "indexed": false,
            "internalType": "struct TssKey[]",
            "name": "revoked",
            "type": "tuple[]"
         },
         {
            "components": [
               {
                  "internalType": "uint8",
                  "name": "yParity",
                  "type": "uint8"
               },
               {
                  "internalType": "uint256",
                  "name": "xCoord",
                  "type": "uint256"
               }
            ],
            "indexed": false,
            "internalType": "struct TssKey[]",
            "name": "registered",
            "type": "tuple[]"
         }
      ],
      "name": "KeySetChanged",
      "type": "event"
   },
   {
      "inputs": [
         {
            "internalType": "bytes32",
            "name": "source",
            "type": "bytes32"
         },
         {
            "internalType": "uint16",
            "name": "network",
            "type": "uint16"
         }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "bytes32",
            "name": "source",
            "type": "bytes32"
         },
         {
            "internalType": "uint16",
            "name": "networkId",
            "type": "uint16"
         }
      ],
      "name": "depositOf",
      "outputs": [
         {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "components": [
               {
                  "internalType": "uint256",
                  "name": "xCoord",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "e",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "s",
                  "type": "uint256"
               }
            ],
            "internalType": "struct Signature",
            "name": "signature",
            "type": "tuple"
         },
         {
            "components": [
               {
                  "internalType": "bytes32",
                  "name": "source",
                  "type": "bytes32"
               },
               {
                  "internalType": "uint16",
                  "name": "srcNetwork",
                  "type": "uint16"
               },
               {
                  "internalType": "address",
                  "name": "dest",
                  "type": "address"
               },
               {
                  "internalType": "uint16",
                  "name": "destNetwork",
                  "type": "uint16"
               },
               {
                  "internalType": "uint256",
                  "name": "gasLimit",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "salt",
                  "type": "uint256"
               },
               {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
               }
            ],
            "internalType": "struct GmpMessage",
            "name": "message",
            "type": "tuple"
         }
      ],
      "name": "execute",
      "outputs": [
         {
            "internalType": "uint8",
            "name": "status",
            "type": "uint8"
         },
         {
            "internalType": "bytes32",
            "name": "result",
            "type": "bytes32"
         }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "components": [
               {
                  "internalType": "bytes32",
                  "name": "source",
                  "type": "bytes32"
               },
               {
                  "internalType": "uint16",
                  "name": "srcNetwork",
                  "type": "uint16"
               },
               {
                  "internalType": "address",
                  "name": "dest",
                  "type": "address"
               },
               {
                  "internalType": "uint16",
                  "name": "destNetwork",
                  "type": "uint16"
               },
               {
                  "internalType": "uint256",
                  "name": "gasLimit",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "salt",
                  "type": "uint256"
               },
               {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
               }
            ],
            "internalType": "struct GmpMessage",
            "name": "message",
            "type": "tuple"
         }
      ],
      "name": "getGmpTypedHash",
      "outputs": [
         {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
         }
      ],
      "name": "gmpInfo",
      "outputs": [
         {
            "components": [
               {
                  "internalType": "uint184",
                  "name": "_gap",
                  "type": "uint184"
               },
               {
                  "internalType": "uint8",
                  "name": "status",
                  "type": "uint8"
               },
               {
                  "internalType": "uint64",
                  "name": "blockNumber",
                  "type": "uint64"
               },
               {
                  "internalType": "bytes32",
                  "name": "result",
                  "type": "bytes32"
               }
            ],
            "internalType": "struct GmpInfo",
            "name": "",
            "type": "tuple"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
         }
      ],
      "name": "keyInfo",
      "outputs": [
         {
            "components": [
               {
                  "internalType": "uint216",
                  "name": "_gap",
                  "type": "uint216"
               },
               {
                  "internalType": "uint8",
                  "name": "status",
                  "type": "uint8"
               },
               {
                  "internalType": "uint32",
                  "name": "nonce",
                  "type": "uint32"
               }
            ],
            "internalType": "struct KeyInfo",
            "name": "",
            "type": "tuple"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [],
      "name": "prevMessageHash",
      "outputs": [
         {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
         },
         {
            "internalType": "uint16",
            "name": "network",
            "type": "uint16"
         },
         {
            "internalType": "uint256",
            "name": "gasLimit",
            "type": "uint256"
         },
         {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
         }
      ],
      "name": "submitMessage",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "components": [
               {
                  "internalType": "uint256",
                  "name": "xCoord",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "e",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "s",
                  "type": "uint256"
               }
            ],
            "internalType": "struct Signature",
            "name": "signature",
            "type": "tuple"
         },
         {
            "components": [
               {
                  "components": [
                     {
                        "internalType": "uint8",
                        "name": "yParity",
                        "type": "uint8"
                     },
                     {
                        "internalType": "uint256",
                        "name": "xCoord",
                        "type": "uint256"
                     }
                  ],
                  "internalType": "struct TssKey[]",
                  "name": "revoke",
                  "type": "tuple[]"
               },
               {
                  "components": [
                     {
                        "internalType": "uint8",
                        "name": "yParity",
                        "type": "uint8"
                     },
                     {
                        "internalType": "uint256",
                        "name": "xCoord",
                        "type": "uint256"
                     }
                  ],
                  "internalType": "struct TssKey[]",
                  "name": "register",
                  "type": "tuple[]"
               }
            ],
            "internalType": "struct UpdateKeysMessage",
            "name": "message",
            "type": "tuple"
         }
      ],
      "name": "updateKeys",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
   }
]
const recipients = [
   '0x88514D378840980d797C7DE5b478a049aDa52E38', "0x05d7545f61E57EEa2C1841529E9D56222212F2BE"
]
// Follow author on telegram: https://t.me/airdrop101xyz

const messages = ["airdrop101", "https://t.me/airdrop101xyz", "https://t.me/airdrop101_news", "trangchongcheng", "cucheng"]
async function interactWithContract() {
   const provider1 = new ethers.JsonRpcProvider('https://evm.shibuya.astar.network');
   const provider2 = new ethers.JsonRpcProvider('https://rpc2.sepolia.org');
   const wallet1 = new ethers.Wallet(process.env.PRIVATE_KEY, provider1);
   const wallet2 = new ethers.Wallet(process.env.PRIVATE_KEY, provider2);

   const contract1 = new ethers.Contract("0x000000007f56768dE3133034FA730a909003a165", contractABI, wallet1);
   const contract2 = new ethers.Contract("0x000000007f56768dE3133034FA730a909003a165", contractABI, wallet2);

   try {
      const randomIndex1 = Math.floor(Math.random() * messages.length);
      const randomIndex2 = Math.floor(Math.random() * messages.length);
      const networkId1 = 5;
      const networkId2 = 7;
      const data1 = ethers.hexlify(ethers.toUtf8Bytes(messages[randomIndex1]));
      const data2 = ethers.hexlify(ethers.toUtf8Bytes(messages[randomIndex2]));
      const gasLimit1 = 100000;
      const gasLimit2 = 200000;
      const tx1 = await contract1.submitMessage(recipients[0], networkId1, gasLimit1, data1, {
         value: ethers.parseEther('0.001284384'),
      });
      const tx2 = await contract2.submitMessage(recipients[1], networkId2, gasLimit2, data2, {
         value: ethers.parseEther('0.0008345727'),
      });

      await tx1.wait();
      await tx2.wait();
      console.log('receipt1-shibaiya', `hash: ${tx1.hash}`);
      console.log('receipt2-sepolia', `hash: ${tx2.hash}`);
   } catch (err) {
      console.error('Error interacting with contract:', err);
   }
}


interactWithContract();