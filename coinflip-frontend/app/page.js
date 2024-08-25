"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
const CONTRACT_ABI = [
  // ABI of the contract
  "function flipCoin(bool _choice) public payable",
];

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState("");
  const [choice, setChoice] = useState(true); // true for heads, false for tails
  const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const signer = provider.getSigner();
        setSigner(signer);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );
        setContract(contract);
      }
    };
    init();
  }, []);

  const flipCoin = async () => {
    if (!contract) return;
    try {
      const tx = await contract.flipCoin(choice, {
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      setTransactionHash(tx.hash);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Coin Flip Game</h1>
      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select onChange={(e) => setChoice(e.target.value === "heads")}>
        <option value="heads">Heads</option>
        <option value="tails">Tails</option>
      </select>
      <button onClick={flipCoin}>Flip Coin</button>
      {transactionHash && (
        <p>
          Transaction Hash:{" "}
          <a
            href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer">
            {transactionHash}
          </a>
        </p>
      )}
    </div>
  );
}
