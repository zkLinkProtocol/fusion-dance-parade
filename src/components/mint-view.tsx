import { NOVA_CHAIN_ID } from 'constants/zklink-config';
import React, { useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { useAccount, useSwitchChain } from 'wagmi';
import { Button } from './ui/buttons/button';
import useMemeNft from 'features/nft/hooks/useMemeNft';
const Mint = ({ data }: { data: any }) => {
  const { chain, coin } = data;
  const { address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { mintNovaNft, isMinting } = useMemeNft();
  const isInvaidChain = useMemo(() => {
    return chainId !== NOVA_CHAIN_ID;
  }, [chainId]);

  const handleMint = useCallback(async () => {
    if (!address) return;
    if (isInvaidChain) {
      switchChain(
        { chainId: NOVA_CHAIN_ID },
        {
          onError: (e) => {
            console.log(e);
          },
        },
      );
      return;
    }
    try {
      await mintNovaNft(address, chain, coin);
      toast.success('Successfully minted SBT!');
    } catch (e: any) {
      console.log(e);
      if (e.message) {
        if (e.message.includes('User rejected the request')) {
          toast.error('User rejected the request');
        } else if (e.message.includes('You already have a character')) {
          toast.error('You can mint SBT only once.');
        } else {
          toast.error(e.message);
        }
      } else {
        toast.error('Mint SBT failed');
      }
    }
  }, [address, isInvaidChain, switchChain, mintNovaNft]);
  return (
    <>
      <Button
        onClick={handleMint}
        loading={isMinting}
        className='gradient-btn flex h-[58px] w-full items-center justify-center gap-[0.38rem] py-4 text-[1.25rem]  '
      >
        <span>{isInvaidChain ? 'Switch to Nova network to mint' : 'Mint Now'}</span>
      </Button>
    </>
  );
};

export default Mint;
