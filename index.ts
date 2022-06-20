import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";

const SECRET_KEY = new Uint8Array([22,5,44,26,161,104,172,244,42,136,177,72,39,6,9,185,98,10,28,53,123,205,151,250,22,237,51,105,46,209,82,192,98,209,8,130,34,248,207,48,178,156,177,250,171,190,104,51,47,200,9,198,7,116,224,103,76,252,56,34,128,42,252,62])
const phantomWalletPublicKey = "6rc9dM8S6NUXsWknEwiUqpSX97XaoZKsE1dz3drF7oJE"
const tokenMintAddress = "Ff4iMrU8xEPVoXb3VFiGD5wap5VNHCmP8rKmTvaMGFKk"
const amountToTransfer = 46

const decimals = 1000000000
const finalAmount = decimals * amountToTransfer

async function exec (){

   const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
   const fromWallet = web3.Keypair.fromSecretKey(SECRET_KEY, {skipValidation: true})
   const fromWalletPublicKey = web3.Keypair.fromSecretKey(SECRET_KEY, {skipValidation: true}).publicKey
   const toWalletPublicKey = new web3.PublicKey(phantomWalletPublicKey)
   const mint = new web3.PublicKey(tokenMintAddress);
   const myToken = new splToken.Token(
      connection,
      mint,
      splToken.TOKEN_PROGRAM_ID,
      fromWallet
   )

   const fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(fromWalletPublicKey)
   const toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(toWalletPublicKey)

   const transaction = new web3.Transaction().add(splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWalletPublicKey,
      [],
      finalAmount
   ))

   console.log("Sending transaction...")

   const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWallet]
   )

   console.log("SIGNATURE", signature);
   console.log("SUCCESS");

}   

exec()

/* transfer("Ff4iMrU8xEPVoXb3VFiGD5wap5VNHCmP8rKmTvaMGFKk", wallet, "2vjtfMMQBSYuimnQjhp8t2QoXWkum8Migqk7t8LmgKjn", connection, 10) */