"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var web3 = __importStar(require("@solana/web3.js"));
var splToken = __importStar(require("@solana/spl-token"));
var SECRET_KEY = new Uint8Array([22, 5, 44, 26, 161, 104, 172, 244, 42, 136, 177, 72, 39, 6, 9, 185, 98, 10, 28, 53, 123, 205, 151, 250, 22, 237, 51, 105, 46, 209, 82, 192, 98, 209, 8, 130, 34, 248, 207, 48, 178, 156, 177, 250, 171, 190, 104, 51, 47, 200, 9, 198, 7, 116, 224, 103, 76, 252, 56, 34, 128, 42, 252, 62]);
var phantomWalletPublicKey = "8r2VfXZcFGnqG5cc4Rr15acHm26wsimvZwjWmoifaVsB";
var tokenMintAddress = "8kjQkxfvYsB5EbR6xtEM3PEuMfpJYnCRPhKUatnXPdgC";
var finalAmount = 1;
function transferNftPcWalletToUserWallet(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        function findAssociatedTokenAddress(walletAddress, tokenMintAddress) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, web3.PublicKey.findProgramAddress([
                                walletAddress.toBuffer(),
                                splToken.TOKEN_PROGRAM_ID.toBuffer(),
                                tokenMintAddress.toBuffer(),
                            ], SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID)];
                        case 1: return [2 /*return*/, (_a.sent())[0]];
                    }
                });
            });
        }
        var connection, fromWallet, fromWalletPublicKey, toWalletPublicKey, mint, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, fromTokenAddress, toTokenAddress, transaction, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = new web3.Connection(web3.clusterApiUrl("devnet"));
                    fromWallet = web3.Keypair.fromSecretKey(SECRET_KEY, { skipValidation: true });
                    fromWalletPublicKey = web3.Keypair.fromSecretKey(SECRET_KEY, { skipValidation: true }).publicKey;
                    toWalletPublicKey = new web3.PublicKey(phantomWalletPublicKey);
                    mint = new web3.PublicKey(tokenMintAddress);
                    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
                    return [4 /*yield*/, findAssociatedTokenAddress(fromWalletPublicKey, mint)];
                case 1:
                    fromTokenAddress = _a.sent();
                    return [4 /*yield*/, findAssociatedTokenAddress(toWalletPublicKey, mint)];
                case 2:
                    toTokenAddress = _a.sent();
                    console.log("From token Address: ", fromTokenAddress.toString());
                    console.log("To token address: ", toTokenAddress.toString());
                    transaction = new web3.Transaction().add(splToken.createTransferInstruction(fromTokenAddress, toTokenAddress, fromWalletPublicKey, finalAmount, [], splToken.TOKEN_PROGRAM_ID));
                    console.log("Sending transaction...");
                    return [4 /*yield*/, web3.sendAndConfirmTransaction(connection, transaction, [fromWallet])];
                case 3:
                    signature = _a.sent();
                    console.log("SIGNATURE", signature);
                    console.log("SUCCESS");
                    res.status(201).json({
                        message: 'Transaction completed successfully!',
                        signature: signature
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = transferNftPcWalletToUserWallet;
