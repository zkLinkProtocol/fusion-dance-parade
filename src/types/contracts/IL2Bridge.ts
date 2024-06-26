/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface IL2BridgeInterface extends utils.Interface {
  functions: {
    "finalizeDeposit(address,address,address,uint256,bytes)": FunctionFragment;
    "finalizeDepositToMerge(address,address,address,uint256,bytes)": FunctionFragment;
    "l1Bridge()": FunctionFragment;
    "l1TokenAddress(address)": FunctionFragment;
    "l2TokenAddress(address)": FunctionFragment;
    "withdraw(address,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "finalizeDeposit"
      | "finalizeDepositToMerge"
      | "l1Bridge"
      | "l1TokenAddress"
      | "l2TokenAddress"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "finalizeDeposit",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "finalizeDepositToMerge",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: "l1Bridge", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "l1TokenAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "l2TokenAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "finalizeDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "finalizeDepositToMerge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "l1Bridge", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "l1TokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "l2TokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "FinalizeDeposit(address,address,address,uint256)": EventFragment;
    "FinalizeDepositToMerge(address,address,address,address,uint256)": EventFragment;
    "WithdrawalInitiated(address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FinalizeDeposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FinalizeDepositToMerge"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawalInitiated"): EventFragment;
}

export interface FinalizeDepositEventObject {
  l1Sender: string;
  l2Receiver: string;
  l2Token: string;
  amount: BigNumber;
}
export type FinalizeDepositEvent = TypedEvent<
  [string, string, string, BigNumber],
  FinalizeDepositEventObject
>;

export type FinalizeDepositEventFilter = TypedEventFilter<FinalizeDepositEvent>;

export interface FinalizeDepositToMergeEventObject {
  l1Sender: string;
  l2Receiver: string;
  l2Token: string;
  mergeToken: string;
  amount: BigNumber;
}
export type FinalizeDepositToMergeEvent = TypedEvent<
  [string, string, string, string, BigNumber],
  FinalizeDepositToMergeEventObject
>;

export type FinalizeDepositToMergeEventFilter =
  TypedEventFilter<FinalizeDepositToMergeEvent>;

export interface WithdrawalInitiatedEventObject {
  l2Sender: string;
  l1Receiver: string;
  l2Token: string;
  amount: BigNumber;
}
export type WithdrawalInitiatedEvent = TypedEvent<
  [string, string, string, BigNumber],
  WithdrawalInitiatedEventObject
>;

export type WithdrawalInitiatedEventFilter =
  TypedEventFilter<WithdrawalInitiatedEvent>;

export interface IL2Bridge extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IL2BridgeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    finalizeDeposit(
      _l1Sender: PromiseOrValue<string>,
      _l2Receiver: PromiseOrValue<string>,
      _l1Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    finalizeDepositToMerge(
      _l1Sender: PromiseOrValue<string>,
      _l2Receiver: PromiseOrValue<string>,
      _l1Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    l1Bridge(overrides?: CallOverrides): Promise<[string]>;

    l1TokenAddress(
      _l2Token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    l2TokenAddress(
      _l1Token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    withdraw(
      _l1Receiver: PromiseOrValue<string>,
      _l2Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  finalizeDeposit(
    _l1Sender: PromiseOrValue<string>,
    _l2Receiver: PromiseOrValue<string>,
    _l1Token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  finalizeDepositToMerge(
    _l1Sender: PromiseOrValue<string>,
    _l2Receiver: PromiseOrValue<string>,
    _l1Token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  l1Bridge(overrides?: CallOverrides): Promise<string>;

  l1TokenAddress(
    _l2Token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  l2TokenAddress(
    _l1Token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  withdraw(
    _l1Receiver: PromiseOrValue<string>,
    _l2Token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    finalizeDeposit(
      _l1Sender: PromiseOrValue<string>,
      _l2Receiver: PromiseOrValue<string>,
      _l1Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    finalizeDepositToMerge(
      _l1Sender: PromiseOrValue<string>,
      _l2Receiver: PromiseOrValue<string>,
      _l1Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    l1Bridge(overrides?: CallOverrides): Promise<string>;

    l1TokenAddress(
      _l2Token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    l2TokenAddress(
      _l1Token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    withdraw(
      _l1Receiver: PromiseOrValue<string>,
      _l2Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "FinalizeDeposit(address,address,address,uint256)"(
      l1Sender?: PromiseOrValue<string> | null,
      l2Receiver?: PromiseOrValue<string> | null,
      l2Token?: PromiseOrValue<string> | null,
      amount?: null
    ): FinalizeDepositEventFilter;
    FinalizeDeposit(
      l1Sender?: PromiseOrValue<string> | null,
      l2Receiver?: PromiseOrValue<string> | null,
      l2Token?: PromiseOrValue<string> | null,
      amount?: null
    ): FinalizeDepositEventFilter;

    "FinalizeDepositToMerge(address,address,address,address,uint256)"(
      l1Sender?: PromiseOrValue<string> | null,
      l2Receiver?: PromiseOrValue<string> | null,
      l2Token?: PromiseOrValue<string> | null,
      mergeToken?: null,
      amount?: null
    ): FinalizeDepositToMergeEventFilter;
    FinalizeDepositToMerge(
      l1Sender?: PromiseOrValue<string> | null,
      l2Receiver?: PromiseOrValue<string> | null,
      l2Token?: PromiseOrValue<string> | null,
      mergeToken?: null,
      amount?: null
    ): FinalizeDepositToMergeEventFilter;

    "WithdrawalInitiated(address,address,address,uint256)"(
      l2Sender?: PromiseOrValue<string> | null,
      l1Receiver?: PromiseOrValue<string> | null,
      l2Token?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawalInitiatedEventFilter;
    WithdrawalInitiated(
      l2Sender?: PromiseOrValue<string> | null,
      l1Receiver?: PromiseOrValue<string> | null,
      l2Token?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawalInitiatedEventFilter;
  };

  estimateGas: {
    finalizeDeposit(
      _l1Sender: PromiseOrValue<string>,
      _l2Receiver: PromiseOrValue<string>,
      _l1Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    finalizeDepositToMerge(
      _l1Sender: PromiseOrValue<string>,
      _l2Receiver: PromiseOrValue<string>,
      _l1Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    l1Bridge(overrides?: CallOverrides): Promise<BigNumber>;

    l1TokenAddress(
      _l2Token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    l2TokenAddress(
      _l1Token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      _l1Receiver: PromiseOrValue<string>,
      _l2Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    finalizeDeposit(
      _l1Sender: PromiseOrValue<string>,
      _l2Receiver: PromiseOrValue<string>,
      _l1Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    finalizeDepositToMerge(
      _l1Sender: PromiseOrValue<string>,
      _l2Receiver: PromiseOrValue<string>,
      _l1Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    l1Bridge(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    l1TokenAddress(
      _l2Token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    l2TokenAddress(
      _l1Token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      _l1Receiver: PromiseOrValue<string>,
      _l2Token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
