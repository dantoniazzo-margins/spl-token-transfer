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
exports.__esModule = true;
var web3 = __importStar(require("@solana/web3.js"));
var privateKeyString = "3osoMQ9UhYE8KYSvNwFDw4d2rSHqKyn49T5WfiuvmPEa7S5V8mqBHuwRqG9aq4X2xPgqANhKYeGwd9ei2WMPQJF8";
var SECRET_KEY = new Uint8Array([
    129,
    196,
    96,
    189,
    197,
    162,
    31,
    7,
    157,
    46,
    22,
    99,
    34,
    42,
    188,
    201,
    153,
    172,
    25,
    103,
    160,
    198,
    85,
    246,
    183,
    3,
    225,
    3,
    14,
    191,
    147,
    95,
    137,
    107,
    37,
    20,
    221,
    197,
    217,
    105,
    163,
    238,
    165,
    14,
    128,
    93,
    55,
    131,
    57,
    158,
    174,
    216,
    43,
    147,
    37,
    252,
    105,
    47,
    125,
    144,
    15,
    255,
    155,
    3
]);
var keypair = web3.Keypair.fromSecretKey(SECRET_KEY, { skipValidation: true });
var publicKey = new web3.PublicKey(keypair.publicKey);
console.log(publicKey.toBase58());
