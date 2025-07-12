import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
export const Airdrop = () => {
  const wallet = useWallet()
  const { connection } = useConnection()
  const [amount, setAmount] = useState(0)
  const [signature, setSignature] = useState("")
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const fetchBalance = async () => {
      if (!wallet.publicKey) {
        return
      }
      const balance = await connection.getBalance(wallet.publicKey)
      setBalance(balance / LAMPORTS_PER_SOL)
    }
    fetchBalance()
  }, [wallet.publicKey, connection]);
  return (
    <div>
      <h1>Airdrop for {wallet.publicKey?.toString()}</h1>
      <p>User Balance: {balance}</p>
      <p>please enter the amount of SOL you want to request:</p>
      <input type="text" placeholder="Enter your Amount" onChange={(e) => setAmount(Number(e.target.value) * LAMPORTS_PER_SOL)} />
      <button onClick={async () => {
        if (!wallet.publicKey) {
          return
        }

        const signature = await connection.requestAirdrop(
          wallet.publicKey,
          amount
        )
        setSignature(signature)
      }} disabled={!wallet.publicKey}>Request Airdrop</button>
      <p>{signature && signature}</p>

    </div>
  );
}
