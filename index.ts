import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import transferNftPcWalletToUserWallet from './controllers/transferNftPcWalletToUserWallet'
import transferTokenPcWalletToUserWallet from './controllers/transferTokenPcWalletToUserWallet'
import transferNftUserWalletToUserWallet from './controllers/transferNftUserWalletToUserWallet'
import transferTokenUserWalletToUserWallet from './controllers/transferTokenUserWalletToUserWallet'

const app = express();
const router = express.Router();
app.use(cors())

app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

router.get("/transfer-nft-pc-wallet", transferNftPcWalletToUserWallet)
router.get("/transfer-token-pc-wallet", transferTokenPcWalletToUserWallet)
router.get("/transfer-nft-wallet-wallet", transferNftUserWalletToUserWallet)
router.get("/transfer-token-wallet-wallet", transferTokenUserWalletToUserWallet)

app.use("/", router);

app.listen(process.env.PORT || 3003, () => {
   console.log("Serving on port 3003");
 });