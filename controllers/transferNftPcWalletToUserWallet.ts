import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";

const SECRET_KEY = new Uint8Array([22,5,44,26,161,104,172,244,42,136,177,72,39,6,9,185,98,10,28,53,123,205,151,250,22,237,51,105,46,209,82,192,98,209,8,130,34,248,207,48,178,156,177,250,171,190,104,51,47,200,9,198,7,116,224,103,76,252,56,34,128,42,252,62])
const phantomWalletPublicKey = "8r2VfXZcFGnqG5cc4Rr15acHm26wsimvZwjWmoifaVsB"
const tokenMintAddress = "8kjQkxfvYsB5EbR6xtEM3PEuMfpJYnCRPhKUatnXPdgC"

const finalAmount = 1

 async function transferNftPcWalletToUserWallet(req, res, next){

   const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
   const fromWallet = web3.Keypair.fromSecretKey(SECRET_KEY, {skipValidation: true})
   const fromWalletPublicKey = web3.Keypair.fromSecretKey(SECRET_KEY, {skipValidation: true}).publicKey
   const toWalletPublicKey = new web3.PublicKey(phantomWalletPublicKey)
   const mint = new web3.PublicKey(tokenMintAddress);
 /*   const myToken = new splToken.Token(
      connection,
      mint,
      splToken.TOKEN_PROGRAM_ID,
      fromWallet
   ) */

   /* Testing getting token address */

   const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: web3.PublicKey = new web3.PublicKey(
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    );

    async function findAssociatedTokenAddress(
      walletAddress: web3.PublicKey,
      tokenMintAddress: web3.PublicKey
  ): Promise<web3.PublicKey> {
      return (await web3.PublicKey.findProgramAddress(
          [
              walletAddress.toBuffer(),
              splToken.TOKEN_PROGRAM_ID.toBuffer(),
              tokenMintAddress.toBuffer(),
          ],
          SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
      ))[0];
  }

  let fromTokenAddress = await findAssociatedTokenAddress(fromWalletPublicKey, mint)
  let toTokenAddress = await findAssociatedTokenAddress(toWalletPublicKey, mint)
  

  console.log("From token Address: ", fromTokenAddress.toString())
  console.log("To token address: ", toTokenAddress.toString())

  /*  const fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(fromWalletPublicKey)
   const toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(toWalletPublicKey)

      console.log("From token account address: ", fromTokenAccount.address.toString())
      console.log("to token account address: ", toTokenAccount.address.toString()) */

   const transaction = new web3.Transaction().add(splToken.createTransferInstruction(
      fromTokenAddress,
      toTokenAddress,
      fromWalletPublicKey,
      finalAmount,
      [],
      splToken.TOKEN_PROGRAM_ID     
   )) 
   
   console.log("Sending transaction...")

   const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWallet]
   )

   console.log("SIGNATURE", signature);
   console.log("SUCCESS");

   res.status(201).json({
      message: 'Transaction completed successfully!',
      signature: signature,
      })
}   

export default transferNftPcWalletToUserWallet
