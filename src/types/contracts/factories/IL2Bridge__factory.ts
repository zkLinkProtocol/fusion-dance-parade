/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IL2Bridge, IL2BridgeInterface } from "../IL2Bridge";

const _abi = [
  {
    inputs: [],
    name: "FunctionNotSupported",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "l1Sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "l2Receiver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "l2Token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FinalizeDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "l1Sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "l2Receiver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "l2Token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "mergeToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FinalizeDepositToMerge",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "l2Sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "l1Receiver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "l2Token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawalInitiated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_l2Receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "finalizeDeposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_l2Receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "finalizeDepositToMerge",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "l1Bridge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
    ],
    name: "l1TokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
    ],
    name: "l2TokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IL2Bridge__factory {
  static readonly abi = _abi;
  static createInterface(): IL2BridgeInterface {
    return new utils.Interface(_abi) as IL2BridgeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IL2Bridge {
    return new Contract(address, _abi, signerOrProvider) as IL2Bridge;
  }
}
