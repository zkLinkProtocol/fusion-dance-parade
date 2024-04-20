// import { Modal, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import classNames from 'classnames';
import Bridge from 'components/bridge';
import { banner as BannerIcon } from 'components/svgs';
// import { Button } from 'components/ui/button';
import { NOVA_CHAIN_ID } from 'constants/zklink-config';
// import type { NOVA_NFT_TYPE } from 'hooks/nft/useNft';
// import useNovaNFT from 'hooks/nft/useNft';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAccount, useSwitchChain } from 'wagmi';
import { Button } from './ui/buttons/button';
import useMemeNft from 'features/nft/hooks/useMemeNft';
// import useNovaNftMinting from 'features/nft/hooks/useMintNft';

const Mint = () => {
  // const mintModal = useDisclosure();
  const { address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { mintNovaNft, isMinting } = useMemeNft();
  const [mintType, setMintType] = useState<any>('ISTP');
  const isInvaidChain = useMemo(() => {
    return chainId !== NOVA_CHAIN_ID;
  }, [chainId]);
  // const handleMintNow = useCallback(() => {
  //   mintModal.onOpen();
  // }, [mintModal, fetchLoading]);
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
    // if (nft) {
    //   toast.error('You can mint SBT only once.')
    //   return
    // }
    try {
      await mintNovaNft(address, mintType);
      // mintModal.onClose();
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
  }, [address, isInvaidChain, switchChain, mintNovaNft, mintType]);
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

// post mint

// //{
//   "address": "0x9ff88A1f4f8b06C63e52724d1055e44acEFDa45a",
//   "chain": "Base",
//   "coin": "Omni"
// }

// address/list
// {
//   "status": "0",
//   "message": "OK",
//   "result": [
//     "0x952e7c37e149357eb87d77a9b546ac8febc31336",
//     "0x9ff88a1f4f8b06c63e52724d1055e44acefda45a"
//   ]
// }

//check/address
// {
//   "status": "0",
//   "message": "OK",
//   "result": []
// }

//meme/check/address
// {
//   "status": "0",
//   "message": "OK",
//   "result": [
//     {
//       "chain": "Base",
//       "coin": "Omni"
//     },
//     {
//       "chain": "Linea",
//       "coin": "Foxy"
//     },
//     {
//       "chain": "Base",
//       "coin": "Degen"
//     },
//     {
//       "chain": "Base",
//       "coin": "Brett"
//     },
//     {
//       "chain": "ZkSync",
//       "coin": "Meow"
//     },
//     {
//       "chain": "Arbitrum",
//       "coin": "AIdoge"
//     },
//     {
//       "chain": "Arbitrum",
//       "coin": "Omni"
//     }
//   ]
// }
