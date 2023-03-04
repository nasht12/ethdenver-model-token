import { ethers } from "ethers";
import { useState, useEffect } from "react";

const contractABI = process.env.CONTRACT_ABI;
const contractAddress = process.env.CONTARCT_ADDRESS;

export default function MyComponent() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc-mumbai.matic.today"
      );

      //   const contract = new ethers.Contract(
      //     contractAddress,
      //     contractABI,
      //     provider
      //   );

      //   const result = await contract.getSomeData();
      const result = await provider.getBlockNumber();
      setResult(result);
    }

    fetchData();
  }, []);

  return <div>{result}</div>;
}
