import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";

const fromPublicKey = new web3.PublicKey("6rc9dM8S6NUXsWknEwiUqpSX97XaoZKsE1dz3drF7oJE")
const toPublicKey = new web3.PublicKey("2vjtfMMQBSYuimnQjhp8t2QoXWkum8Migqk7t8LmgKjn")
const mint = new web3.PublicKey("Ff4iMrU8xEPVoXb3VFiGD5wap5VNHCmP8rKmTvaMGFKk")
 
const amountToTransfer = 7

const decimals = 1000000000
const finalAmount = decimals * amountToTransfer

async function transferTokenFromWalletToWallet (req, res, next){

   const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
 
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

  let fromTokenAddress = await findAssociatedTokenAddress(fromPublicKey, mint)
  let toTokenAddress = await findAssociatedTokenAddress(toPublicKey, mint)

  async function createAssociatedTokenAccount(
      fromWallet: web3.Keypair,
      mint: web3.PublicKey,
      toPubKey: web3.PublicKey
  ): Promise<any>{
   return (await splToken.createAssociatedTokenAccount(
      connection,
      fromWallet, //can be a randomly generated keypair
      mint,
      toPubKey,
      {},  
      splToken.TOKEN_PROGRAM_ID,
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID
   ))
  }

/*   const createdTokenAddress = await createAssociatedTokenAccount(fromWallet, mint, toWalletPublicKey) */
   
   const transaction = new web3.Transaction().add(splToken.createTransferInstruction(
      fromTokenAddress,
      toTokenAddress,
      fromPublicKey,
      finalAmount,
      [],
      splToken.TOKEN_PROGRAM_ID      
   ))

   const blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
   transaction.recentBlockhash = blockhash
   transaction.feePayer = fromPublicKey

   console.log("Sending transaction to FE for signature...")

   res.status(201).json({
    message: 'Transaction fetched successfully',
    transaction: transaction
    })

}   

export default transferTokenFromWalletToWallet