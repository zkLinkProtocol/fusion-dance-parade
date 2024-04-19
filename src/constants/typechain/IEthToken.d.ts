/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers';
import { Contract, ContractTransaction, Overrides, PayableOverrides, CallOverrides } from '@ethersproject/contracts';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';

interface IEthTokenInterface extends ethers.utils.Interface {
  functions: {
    'balanceOf(uint256)': FunctionFragment;
    'decimals()': FunctionFragment;
    'mint(address,uint256)': FunctionFragment;
    'name()': FunctionFragment;
    'symbol()': FunctionFragment;
    'totalSupply()': FunctionFragment;
    'transferFromTo(address,address,uint256)': FunctionFragment;
    'withdraw(address)': FunctionFragment;
    'withdrawWithMessage(address,bytes)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'balanceOf', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'decimals', values?: undefined): string;
  encodeFunctionData(functionFragment: 'mint', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string;
  encodeFunctionData(functionFragment: 'totalSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'transferFromTo', values: [string, string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'withdraw', values: [string]): string;
  encodeFunctionData(functionFragment: 'withdrawWithMessage', values: [string, BytesLike]): string;

  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'decimals', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferFromTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawWithMessage', data: BytesLike): Result;

  events: {
    'Mint(address,uint256)': EventFragment;
    'Transfer(address,address,uint256)': EventFragment;
    'Withdrawal(address,address,uint256)': EventFragment;
    'WithdrawalWithMessage(address,address,uint256,bytes)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Mint'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Withdrawal'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'WithdrawalWithMessage'): EventFragment;
}

export class IEthToken extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IEthTokenInterface;

  functions: {
    balanceOf(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber;
    }>;

    'balanceOf(uint256)'(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      0: BigNumber;
    }>;

    decimals(overrides?: CallOverrides): Promise<{
      0: number;
    }>;

    'decimals()'(overrides?: CallOverrides): Promise<{
      0: number;
    }>;

    mint(_account: string, _amount: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>;

    'mint(address,uint256)'(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    'name()'(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    symbol(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    'symbol()'(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    totalSupply(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    'totalSupply()'(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    transferFromTo(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>;

    'transferFromTo(address,address,uint256)'(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides,
    ): Promise<ContractTransaction>;

    withdraw(_l1Receiver: string, overrides?: PayableOverrides): Promise<ContractTransaction>;

    'withdraw(address)'(_l1Receiver: string, overrides?: PayableOverrides): Promise<ContractTransaction>;

    withdrawWithMessage(
      _l1Receiver: string,
      _additionalData: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>;

    'withdrawWithMessage(address,bytes)'(
      _l1Receiver: string,
      _additionalData: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<ContractTransaction>;
  };

  balanceOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  'balanceOf(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  'decimals()'(overrides?: CallOverrides): Promise<number>;

  mint(_account: string, _amount: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>;

  'mint(address,uint256)'(_account: string, _amount: BigNumberish, overrides?: Overrides): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  'name()'(overrides?: CallOverrides): Promise<string>;

  symbol(overrides?: CallOverrides): Promise<string>;

  'symbol()'(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>;

  transferFromTo(
    _from: string,
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>;

  'transferFromTo(address,address,uint256)'(
    _from: string,
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides,
  ): Promise<ContractTransaction>;

  withdraw(_l1Receiver: string, overrides?: PayableOverrides): Promise<ContractTransaction>;

  'withdraw(address)'(_l1Receiver: string, overrides?: PayableOverrides): Promise<ContractTransaction>;

  withdrawWithMessage(
    _l1Receiver: string,
    _additionalData: BytesLike,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>;

  'withdrawWithMessage(address,bytes)'(
    _l1Receiver: string,
    _additionalData: BytesLike,
    overrides?: PayableOverrides,
  ): Promise<ContractTransaction>;

  callStatic: {
    balanceOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    'balanceOf(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<number>;

    'decimals()'(overrides?: CallOverrides): Promise<number>;

    mint(_account: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    'mint(address,uint256)'(_account: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    'name()'(overrides?: CallOverrides): Promise<string>;

    symbol(overrides?: CallOverrides): Promise<string>;

    'symbol()'(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>;

    transferFromTo(_from: string, _to: string, _amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    'transferFromTo(address,address,uint256)'(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    withdraw(_l1Receiver: string, overrides?: CallOverrides): Promise<void>;

    'withdraw(address)'(_l1Receiver: string, overrides?: CallOverrides): Promise<void>;

    withdrawWithMessage(_l1Receiver: string, _additionalData: BytesLike, overrides?: CallOverrides): Promise<void>;

    'withdrawWithMessage(address,bytes)'(
      _l1Receiver: string,
      _additionalData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;
  };

  filters: {
    Mint(account: string | null, amount: null): EventFilter;

    Transfer(from: string | null, to: string | null, value: null): EventFilter;

    Withdrawal(_l2Sender: string | null, _l1Receiver: string | null, _amount: null): EventFilter;

    WithdrawalWithMessage(
      _l2Sender: string | null,
      _l1Receiver: string | null,
      _amount: null,
      _additionalData: null,
    ): EventFilter;
  };

  estimateGas: {
    balanceOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    'balanceOf(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    'decimals()'(overrides?: CallOverrides): Promise<BigNumber>;

    mint(_account: string, _amount: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    'mint(address,uint256)'(_account: string, _amount: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    'name()'(overrides?: CallOverrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    'symbol()'(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>;

    transferFromTo(_from: string, _to: string, _amount: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    'transferFromTo(address,address,uint256)'(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides,
    ): Promise<BigNumber>;

    withdraw(_l1Receiver: string, overrides?: PayableOverrides): Promise<BigNumber>;

    'withdraw(address)'(_l1Receiver: string, overrides?: PayableOverrides): Promise<BigNumber>;

    withdrawWithMessage(
      _l1Receiver: string,
      _additionalData: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>;

    'withdrawWithMessage(address,bytes)'(
      _l1Receiver: string,
      _additionalData: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'balanceOf(uint256)'(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'decimals()'(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mint(_account: string, _amount: BigNumberish, overrides?: Overrides): Promise<PopulatedTransaction>;

    'mint(address,uint256)'(
      _account: string,
      _amount: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'name()'(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'symbol()'(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'totalSupply()'(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferFromTo(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>;

    'transferFromTo(address,address,uint256)'(
      _from: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>;

    withdraw(_l1Receiver: string, overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    'withdraw(address)'(_l1Receiver: string, overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    withdrawWithMessage(
      _l1Receiver: string,
      _additionalData: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>;

    'withdrawWithMessage(address,bytes)'(
      _l1Receiver: string,
      _additionalData: BytesLike,
      overrides?: PayableOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
