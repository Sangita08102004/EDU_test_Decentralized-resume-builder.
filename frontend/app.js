const contractAddress = '0x9D1356e485Bd64ca7049A7fafCCC677298dEa509';
const abi = [[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "ResumeCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "ResumeUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contactInfo",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "skills",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "experience",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "education",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "additionalInfo",
				"type": "string"
			}
		],
		"name": "createOrUpdateResume",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getResume",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "registeredUsers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]];

let web3;
let contract;

window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(abi, contractAddress);
    } else {
        alert('Please install MetaMask!');
    }
};

async function submitResume() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.createResume(name, title, experience, education, skills).send({ from: accounts[0] });
        alert('Resume submitted successfully!');
    } catch (error) {
        console.error(error);
        alert('Failed to submit resume.');
    }
}
