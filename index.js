"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var transferNftPcWalletToUserWallet_1 = __importDefault(require("./controllers/transferNftPcWalletToUserWallet"));
var transferTokenPcWalletToUserWallet_1 = __importDefault(require("./controllers/transferTokenPcWalletToUserWallet"));
var transferNftUserWalletToUserWallet_1 = __importDefault(require("./controllers/transferNftUserWalletToUserWallet"));
var transferTokenUserWalletToUserWallet_1 = __importDefault(require("./controllers/transferTokenUserWalletToUserWallet"));
var app = (0, express_1["default"])();
var router = express_1["default"].Router();
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json());
// in latest body-parser use like below.
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
router.get("/transfer-nft-pc-wallet", transferNftPcWalletToUserWallet_1["default"]);
router.get("/transfer-token-pc-wallet", transferTokenPcWalletToUserWallet_1["default"]);
router.get("/transfer-nft-wallet-wallet", transferNftUserWalletToUserWallet_1["default"]);
router.get("/transfer-token-wallet-wallet", transferTokenUserWalletToUserWallet_1["default"]);
app.use("/", router);
app.listen(process.env.PORT || 3003, function () {
    console.log("Serving on port 3003");
});
