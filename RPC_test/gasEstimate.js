const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://dapps.shardeum.org');
//const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/polygon_mumbai');
//const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/polygon_zkevm_testnet');

const erc20ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
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
		"name": "symbol",
		"outputs": [
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
		"name": "totalSupply",
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
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const erc20Bytecode = "60806040526040518060400160405280600b81526020017f53696d706c654552433230000000000000000000000000000000000000000000815250600090816200004a9190620003dc565b506040518060400160405280600481526020017f534552430000000000000000000000000000000000000000000000000000000081525060019081620000919190620003dc565b506012600260006101000a81548160ff021916908360ff160217905550348015620000bb57600080fd5b5060405162000f0838038062000f088339818101604052810190620000e19190620004f9565b600260009054906101000a900460ff1660ff16600a620001029190620006ae565b816200010f9190620006ff565b600381905550600354600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550506200074a565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620001e457607f821691505b602082108103620001fa57620001f96200019c565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620002647fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000225565b62000270868362000225565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620002bd620002b7620002b18462000288565b62000292565b62000288565b9050919050565b6000819050919050565b620002d9836200029c565b620002f1620002e882620002c4565b84845462000232565b825550505050565b600090565b62000308620002f9565b62000315818484620002ce565b505050565b5b818110156200033d5762000331600082620002fe565b6001810190506200031b565b5050565b601f8211156200038c57620003568162000200565b620003618462000215565b8101602085101562000371578190505b62000389620003808562000215565b8301826200031a565b50505b505050565b600082821c905092915050565b6000620003b16000198460080262000391565b1980831691505092915050565b6000620003cc83836200039e565b9150826002028217905092915050565b620003e78262000162565b67ffffffffffffffff8111156200040357620004026200016d565b5b6200040f8254620001cb565b6200041c82828562000341565b600060209050601f8311600181146200045457600084156200043f578287015190505b6200044b8582620003be565b865550620004bb565b601f198416620004648662000200565b60005b828110156200048e5784890151825560018201915060208501945060208101905062000467565b86831015620004ae5784890151620004aa601f8916826200039e565b8355505b6001600288020188555050505b505050505050565b600080fd5b620004d38162000288565b8114620004df57600080fd5b50565b600081519050620004f381620004c8565b92915050565b600060208284031215620005125762000511620004c3565b5b60006200052284828501620004e2565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b6001851115620005b9578086048111156200059157620005906200052b565b5b6001851615620005a15780820291505b8081029050620005b1856200055a565b945062000571565b94509492505050565b600082620005d45760019050620006a7565b81620005e45760009050620006a7565b8160018114620005fd576002811462000608576200063e565b6001915050620006a7565b60ff8411156200061d576200061c6200052b565b5b8360020a9150848211156200063757620006366200052b565b5b50620006a7565b5060208310610133831016604e8410600b8410161715620006785782820a9050838111156200067257620006716200052b565b5b620006a7565b62000687848484600162000567565b92509050818404811115620006a157620006a06200052b565b5b81810290505b9392505050565b6000620006bb8262000288565b9150620006c88362000288565b9250620006f77fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484620005c2565b905092915050565b60006200070c8262000288565b9150620007198362000288565b9250828202620007298162000288565b915082820484148315176200074357620007426200052b565b5b5092915050565b6107ae806200075a6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806306fdde031461006757806318160ddd14610085578063313ce567146100a357806370a08231146100c157806395d89b41146100f1578063a9059cbb1461010f575b600080fd5b61006f61013f565b60405161007c9190610456565b60405180910390f35b61008d6101cd565b60405161009a9190610491565b60405180910390f35b6100ab6101d3565b6040516100b891906104c8565b60405180910390f35b6100db60048036038101906100d69190610546565b6101e6565b6040516100e89190610491565b60405180910390f35b6100f96101fe565b6040516101069190610456565b60405180910390f35b6101296004803603810190610124919061059f565b61028c565b60405161013691906105fa565b60405180910390f35b6000805461014c90610644565b80601f016020809104026020016040519081016040528092919081815260200182805461017890610644565b80156101c55780601f1061019a576101008083540402835291602001916101c5565b820191906000526020600020905b8154815290600101906020018083116101a857829003601f168201915b505050505081565b60035481565b600260009054906101000a900460ff1681565b60046020528060005260406000206000915090505481565b6001805461020b90610644565b80601f016020809104026020016040519081016040528092919081815260200182805461023790610644565b80156102845780601f1061025957610100808354040283529160200191610284565b820191906000526020600020905b81548152906001019060200180831161026757829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610310576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610307906106c1565b60405180910390fd5b81600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461035f9190610710565b9250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546103b59190610744565b925050819055506001905092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156104005780820151818401526020810190506103e5565b60008484015250505050565b6000601f19601f8301169050919050565b6000610428826103c6565b61043281856103d1565b93506104428185602086016103e2565b61044b8161040c565b840191505092915050565b60006020820190508181036000830152610470818461041d565b905092915050565b6000819050919050565b61048b81610478565b82525050565b60006020820190506104a66000830184610482565b92915050565b600060ff82169050919050565b6104c2816104ac565b82525050565b60006020820190506104dd60008301846104b9565b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610513826104e8565b9050919050565b61052381610508565b811461052e57600080fd5b50565b6000813590506105408161051a565b92915050565b60006020828403121561055c5761055b6104e3565b5b600061056a84828501610531565b91505092915050565b61057c81610478565b811461058757600080fd5b50565b60008135905061059981610573565b92915050565b600080604083850312156105b6576105b56104e3565b5b60006105c485828601610531565b92505060206105d58582860161058a565b9150509250929050565b60008115159050919050565b6105f4816105df565b82525050565b600060208201905061060f60008301846105eb565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061065c57607f821691505b60208210810361066f5761066e610615565b5b50919050565b7f496e73756666696369656e742066756e64730000000000000000000000000000600082015250565b60006106ab6012836103d1565b91506106b682610675565b602082019050919050565b600060208201905081810360008301526106da8161069e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061071b82610478565b915061072683610478565b925082820390508181111561073e5761073d6106e1565b5b92915050565b600061074f82610478565b915061075a83610478565b9250828201905080821115610772576107716106e1565b5b9291505056fea2646970667358221220305cc68a55e2d5791585ef0107f66f94ea71e587983ad574bd3a1922c4d3dbac64736f6c63430008120033"; 

async function estimateGasForERC20Deployment(wallet, initialSupply) {
    const erc20Factory = new ethers.ContractFactory(erc20ABI, erc20Bytecode, wallet);
    const deployTx = erc20Factory.getDeployTransaction(initialSupply);
    const gasEstimate = await provider.estimateGas(deployTx);
    return gasEstimate;
}

async function estimateGasForERC20Transfer(contract, sender, receiver, amountTokens) {
    const transferTx = await contract.populateTransaction.transfer(receiver, amountTokens);
    const gasEstimate = await sender.estimateGas(transferTx);
    return gasEstimate;
}

async function estimateGasForSendingEther(sender, receiver, amountEther) {
    const amountWei = ethers.utils.parseEther(amountEther.toString());

    const tx = {
        to: receiver,
        value: amountWei
    };

    try {
        const gasEstimate = await sender.estimateGas(tx);
        return gasEstimate;
    } catch (error) {
        console.error("Failed to estimate gas:", error);
    }
}

async function main() {
    const senderPrivateKey = ''; 
    const senderWallet = new ethers.Wallet(senderPrivateKey, provider);
    const receiverAddress = '0x68fCFF447Ee091Ea4b0D1EB1F9b64d65cDbfdc8a'; 
    
    const gasEstimateEther = await estimateGasForSendingEther(senderWallet, receiverAddress, 1);
    console.log(`Estimated gas for sending SHM: ${gasEstimateEther.toString()}`);

    const gasEstimateERC20Deploy = await estimateGasForERC20Deployment(senderWallet, 1000);
    console.log(`Estimated gas for deploying ERC20: ${gasEstimateERC20Deploy.toString()}`);

    const erc20Factory = new ethers.ContractFactory(erc20ABI, erc20Bytecode, senderWallet);
    const erc20Contract = await erc20Factory.deploy(1000);
    await erc20Contract.deployed();

    const gasEstimateERC20Transfer = await estimateGasForERC20Transfer(erc20Contract, senderWallet, receiverAddress, 10);
    console.log(`Estimated gas for transferring ERC20 tokens: ${gasEstimateERC20Transfer.toString()}`);
}

main().catch(console.error);