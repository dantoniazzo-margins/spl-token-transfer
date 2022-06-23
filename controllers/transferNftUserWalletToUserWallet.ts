import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";

const fromPublicKey = new web3.PublicKey("2vjtfMMQBSYuimnQjhp8t2QoXWkum8Migqk7t8LmgKjn")
const toPublicKey = new web3.PublicKey("6rc9dM8S6NUXsWknEwiUqpSX97XaoZKsE1dz3drF7oJE")
const mint = new web3.PublicKey("3rJ6LhuUWGuqLyFQQKgc3JSLxgznJ4cSn3qfc2szBuZ4")

const SECRET_KEY = new Uint8Array([22,5,44,26,161,104,172,244,42,136,177,72,39,6,9,185,98,10,28,53,123,205,151,250,22,237,51,105,46,209,82,192,98,209,8,130,34,248,207,48,178,156,177,250,171,190,104,51,47,200,9,198,7,116,224,103,76,252,56,34,128,42,252,62])
const fromWallet = web3.Keypair.fromSecretKey(SECRET_KEY, {skipValidation: true})


const finalAmount = 1

async function transferNftFromWalletToWallet (req, res, next){

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

/*   async function createAssociatedTokenAccount(
      fromWallet: web3.Keypair,
      mint: web3.PublicKey,
      toPubKey: web3.PublicKey
  ): Promise<any>{
   return (await splToken.createAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      toPubKey,
      {},  
      splToken.TOKEN_PROGRAM_ID,
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID
   ))
  }

  await createAssociatedTokenAccount(fromWallet, mint, toPublicKey) */




  let fromTokenAddress = await findAssociatedTokenAddress(fromPublicKey, mint)
  let toTokenAddress = await findAssociatedTokenAddress(toPublicKey, mint)

  

  const createAssociatedAccountTransaction = new web3.Transaction()
    .add(splToken.createAssociatedTokenAccountInstruction(
        fromPublicKey,
        toTokenAddress,
        toPublicKey,
        mint,
        splToken.TOKEN_PROGRAM_ID,
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID
    ))
   
  const transaction = new web3.Transaction()
    .add(splToken.createTransferInstruction(
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

   createAssociatedAccountTransaction.recentBlockhash = blockhash
   createAssociatedAccountTransaction.feePayer = fromPublicKey

   console.log("Sending transaction to FE for signature...")

   res.status(201).json({
    message: 'Transaction fetched successfully',
    transactions: [createAssociatedAccountTransaction, transaction],
    })

}   

export default transferNftFromWalletToWallet