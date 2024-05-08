import {
  arbitrum,
  base,
  goerli,
  linea,
  lineaTestnet,
  mainnet,
  manta,
  mantle,
  mantleTestnet,
  optimism,
  zkSync,
} from '@wagmi/core/chains';
import { arbitrumSepolia, baseSepolia, blast, lineaSepolia, sepolia, zkSyncSepoliaTestnet } from 'viem/chains';

import {
  arbitrumIcon,
  baseIcon,
  blastIcon,
  ethereumIcon,
  lineaIcon,
  lineaIcon as LineaIcon,
  mantaIcon,
  mantleIcon,
  optimismIcon,
  zkscyncIcon,
} from 'components/svgs';
import { nexusGoerliNode, nexusNode, nodeType, PRIMARY_CHAIN_KEY } from 'config/zklink-networks';

export const NOVA_NETWORK = {
  label: nexusNode[0].name,
  icon: '/img/nova.png',
  chainId: nexusNode[0].id,
  networkKey: 'nova',
  isEthGasToken: true,
  chainName: nexusNode[0].name,
  explorerUrl: nexusNode[0].blockExplorerUrl,
  rpcUrl: nexusNode[0].rpcUrl,
};

export const NOVA_GOERLI_NETWORK = {
  label: nexusGoerliNode[0].name,
  icon: '/img/nova.png',
  chainId: nexusGoerliNode[0].id,
  networkKey: 'nova',
  isEthGasToken: true,
  chainName: nexusGoerliNode[0].name,
  explorerUrl: nexusGoerliNode[0].blockExplorerUrl,
  rpcUrl: nexusGoerliNode[0].rpcUrl,
};

const FromListMainnet = [
  {
    label: 'Ethereum',
    icon: ethereumIcon,
    chainId: mainnet.id,
    networkKey: 'ethereum',
    isEthGasToken: true,
    chainName: 'Ethereum',
    explorerUrl: mainnet.blockExplorers.default.url,
    rpcUrl: mainnet.rpcUrls.default.http[0],
  },
  {
    label: 'Linea',
    icon: <LineaIcon className='h-6 w-6' />,
    chainId: linea.id,
    networkKey: PRIMARY_CHAIN_KEY,
    isEthGasToken: true,
    chainName: 'Linea',
    explorerUrl: linea.blockExplorers.default.url,
    rpcUrl: linea.rpcUrls.default.http[0],
  },
  {
    label: 'Arbitrum One',
    icon: arbitrumIcon,
    chainId: arbitrum.id,
    networkKey: 'arbitrum',
    isEthGasToken: true,
    chainName: 'Arbitrum',
    explorerUrl: arbitrum.blockExplorers.default.url,
    rpcUrl: arbitrum.rpcUrls.default.http[0],
  },
  {
    label: 'zkSync Era',
    icon: zkscyncIcon,
    chainId: zkSync.id,
    networkKey: 'zksync',
    isEthGasToken: true,
    chainName: 'ZkSync',
    explorerUrl: zkSync.blockExplorers.default.url,
    rpcUrl: zkSync.rpcUrls.default.http[0],
  },
  {
    label: 'Manta Pacific',
    icon: mantaIcon,
    chainId: manta.id,
    networkKey: 'manta',
    isEthGasToken: true,
    chainName: 'Manta',
    explorerUrl: manta.blockExplorers.default.url,
    rpcUrl: manta.rpcUrls.default.http[0],
  },
  {
    label: 'Mantle',
    icon: mantleIcon,
    chainId: mantle.id,
    networkKey: 'mantle',
    isEthGasToken: true,
    chainName: 'Mantle',
    explorerUrl: mantle.blockExplorers.default.url,
    rpcUrl: mantle.rpcUrls.default.http[0],
  },
  {
    label: 'Blast',
    icon: blastIcon,
    chainId: 81457,
    networkKey: 'blast',
    isEthGasToken: true,
    chainName: 'Blast',
    explorerUrl: blast.blockExplorers.default.url ?? 'https://blastscan.io',
    rpcUrl: blast.rpcUrls.default.http[0] ?? 'https://rpc.blast.io',
  },
  {
    label: 'Optimism',
    icon: optimismIcon,
    chainId: optimism.id,
    networkKey: 'optimism',
    isEthGasToken: true,
    chainName: 'Optimism',
    explorerUrl: optimism.blockExplorers.default.url,
    rpcUrl: optimism.rpcUrls.default.http[0],
  },
  {
    label: 'Base',
    icon: baseIcon,
    chainId: base.id,
    networkKey: 'base',
    isEthGasToken: true,
    chainName: 'Base',
    explorerUrl: base.blockExplorers.default.url,
    rpcUrl: base.rpcUrls.default.http[0],
  },
];

const FromListGoerli = [
  {
    label: 'Ethereum Goerli Testnet',
    icon: (
      <svg
        className='h-5 w-5'
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect fill='#5E7CF1' width='40' height='40' rx='12' />
        <g transform='translate(4 4)'>
          <circle cx='16' cy='16' r='14' fill='#fff' />
          <svg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16z'
              fill='#5E7CF1'
            />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M16 5.333l6.667 10.725L16 19.878l-6.668-3.82 6.668-10.725zm-.002 15.702l6.669-4.065-6.669 9.697-6.665-9.696 6.665 4.064z'
              fill='#fff'
            />
          </svg>
        </g>
      </svg>
    ),
    chainId: goerli.id,
    networkKey: 'goerli',
    isEthGasToken: true,
    chainName: 'Goerli',
    explorerUrl: goerli.blockExplorers.default.url,
    rpcUrl: goerli.rpcUrls.default.http[0],
  },
  {
    label: 'Linea Goerli Testnet',
    icon: (
      <svg
        className='h-5 w-5'
        width='108'
        height='108'
        viewBox='0 0 108 108'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='108' height='108' fill='#121212' />
        <rect x='32' y='38' width='6' height='36' fill='white' />
        <rect x='69' y='68' width='6' height='36' transform='rotate(90 69 68)' fill='white' />
        <circle cx='69' cy='35' r='7' fill='white' />
      </svg>
    ),
    chainId: lineaTestnet.id,
    networkKey: PRIMARY_CHAIN_KEY,
    isEthGasToken: true,
    chainName: 'Linea Goerli',
    explorerUrl: lineaTestnet.blockExplorers.default.url,
    rpcUrl: lineaTestnet.rpcUrls.default.http[0],
  },
  {
    label: 'Mantle Goerli Testnet',
    icon: (
      <svg
        className='h-5 w-5'
        version='1'
        xmlns='http://www.w3.org/2000/svg'
        width='536'
        height='536'
        viewBox='0 0 402 402'
      >
        <path
          d='M1 201v200h400V1H1v200m322.242-80.75c5.868 8.965 8.203 13.71 7.198 14.633-.517.474-10.049 5.532-21.183 11.239-11.133 5.708-20.246 10.777-20.25 11.264-.012 1.457 4.447 12.583 5.05 12.599.306.008 10.656-3.332 23-7.422 12.343-4.091 22.761-7.125 23.149-6.744 1.079 1.06 5.81 21.346 5.206 22.323-.291.472-1.706.858-3.143.858-1.437 0-6.248.642-10.691 1.426-21.277 3.758-34.617 5.668-35.551 5.091-.565-.349-1.033-1.621-1.041-2.826-.007-1.205-.264-3.125-.571-4.267-.542-2.018-1.201-1.901-23.736 4.229-12.748 3.467-23.404 6.307-23.679 6.311-.622.008-5.297-12.012-4.835-12.433.371-.338 23.701-13.789 33.71-19.435 3.506-1.978 6.585-4.143 6.843-4.811.258-.667-.509-2.587-1.703-4.264-1.195-1.678-2.024-3.454-1.843-3.947.53-1.448 38.44-29.074 39.897-29.074.405 0 2.283 2.363 4.173 5.25m-165.407 98.846c1.285 3.337 2.185 6.204 2 6.373-.371.338-23.701 13.789-33.71 19.435-3.506 1.978-6.585 4.143-6.843 4.811-.258.667.509 2.587 1.703 4.264 1.195 1.678 2.024 3.45 1.843 3.939-.324.877-28.402 21.787-36.069 26.86l-3.953 2.616-1.926-2.447c-2.086-2.649-8.371-13.423-9.386-16.088-.5-1.316 3.543-3.789 20.436-12.5 11.583-5.972 21.062-11.258 21.065-11.745.008-1.462-4.451-12.583-5.052-12.599-.306-.008-10.656 3.332-23 7.422-12.343 4.091-22.761 7.125-23.149 6.744-1.079-1.06-5.81-21.346-5.206-22.323.291-.472 1.706-.858 3.143-.858 1.437 0 6.248-.642 10.691-1.426 21.277-3.758 34.617-5.668 35.551-5.091.565.349 1.033 1.621 1.041 2.826.007 1.205.264 3.124.57 4.263.54 2.014 1.204 1.895 23.236-4.159 12.474-3.427 23.13-6.266 23.68-6.308.55-.041 2.051 2.654 3.335 5.991m75.512 36.977c4.348 7.385 9.27 15.902 10.936 18.927 5.303 9.628 4.83 9.287 8.983 6.465 1.996-1.356 3.989-2.455 4.431-2.443.442.011 2.603 2.559 4.803 5.661 2.2 3.102 6.716 9.28 10.034 13.728 3.319 4.449 8.025 10.942 10.458 14.428l4.423 6.339-2.458 1.916c-4.545 3.543-16.275 9.998-17.371 9.559-.597-.24-5.811-9.701-11.586-21.025-5.775-11.324-10.941-20.598-11.481-20.609-.796-.015-11.115 3.841-12.362 4.62-.189.118 2.901 10.26 6.867 22.538 3.965 12.278 7.27 22.77 7.343 23.316.152 1.138-21.152 6.758-22.488 5.932-.483-.299-.879-1.754-.878-3.234 0-1.48-.658-6.291-1.464-10.691-3.598-19.66-5.666-33.723-5.154-35.054.305-.796 1.581-1.452 2.836-1.46 3.283-.019 6.832-1.095 6.324-1.917-.412-.666-2.404-7.813-6.571-23.569a6507.916 6507.916 0 0 0-3.957-14.871c-1.158-4.329-1.973-7.946-1.811-8.037 2.254-1.266 10.537-4.327 11.266-4.163.534.12 4.529 6.26 8.877 13.644M178.764 59.078c.146 1.332.914 6.247 1.708 10.922 4.649 27.38 5.644 34.255 5.145 35.554-.305.796-1.581 1.452-2.836 1.46-3.283.019-6.832 1.095-6.324 1.917.412.666 2.404 7.813 6.571 23.569 1.018 3.85 2.799 10.542 3.957 14.871 1.158 4.329 1.973 7.942 1.811 8.028-3.769 1.997-11.41 4.387-12.033 3.764-.897-.897-14.048-23.11-19.042-32.163-5.312-9.63-4.835-9.287-8.987-6.465-1.996 1.356-3.989 2.45-4.431 2.432-.757-.031-15.487-19.74-25.245-33.778l-4.442-6.391 2.442-1.904c4.546-3.545 16.264-9.985 17.356-9.539.597.244 5.811 9.709 11.586 21.034s11.08 20.596 11.79 20.601c.709.006 3.054-.89 5.21-1.99s4.613-2 5.46-2c.847 0 1.54-.321 1.54-.714 0-.393-3.203-10.631-7.117-22.75-3.914-12.12-7.177-22.484-7.25-23.032-.133-.998 19.984-6.625 21.867-6.117.55.148 1.119 1.359 1.264 2.691m-1.825 182.659c.769.538-5.147 11.489-16.799 31.094-3.377 5.683-6.14 10.719-6.14 11.191 0 1.95-1.873 1.749-5.28-.566-1.988-1.351-3.975-2.446-4.417-2.434-.442.013-2.378 2.289-4.303 5.058-1.925 2.769-5.975 8.365-9 12.434-3.025 4.069-7.75 10.53-10.5 14.356l-5 6.956-3.5-2.615c-6.253-4.672-13.974-11.686-13.987-12.706-.007-.547 15.589-16.601 34.658-35.676l34.672-34.682 4.578 3.642c2.519 2.003 4.776 3.779 5.018 3.948M298.75 91.893c2.888 2.468 5.25 4.963 5.25 5.542 0 .58-15.586 16.645-34.635 35.7l-34.635 34.646-5.238-4.053-5.238-4.053 3.237-5.588A839 839 0 0 0 233.235 144c1.378-2.475 5.174-9 8.436-14.5 3.261-5.5 6.249-10.836 6.64-11.858.641-1.679.926-1.718 2.949-.403 6.906 4.487 6.586 4.419 8.481 1.805.968-1.334 3.334-4.592 5.259-7.239 1.925-2.648 7.547-10.407 12.494-17.243l8.993-12.428 3.507 2.635c1.928 1.449 5.869 4.655 8.756 7.124m-42.761 140.251c21.956 12.538 29.012 16.96 28.989 18.173-.012.651-.902 2.308-1.978 3.683s-1.956 2.95-1.957 3.5c-.001.55 8.539 7.22 18.977 14.822 10.439 7.602 18.98 14.152 18.98 14.556 0 1.835-12.858 17.122-14.401 17.122-.599 0-16.684-15.59-35.745-34.646l-34.656-34.645 3.651-4.798c2.008-2.638 4.096-4.823 4.64-4.854.544-.031 6.619 3.158 13.5 7.087m-122.843-99.498l34.656 34.645-3.651 4.798c-2.008 2.638-4.096 4.823-4.64 4.854-.977.056-18.263-9.608-34.261-19.154-4.537-2.708-8.24-5.456-8.228-6.106.012-.651.902-2.308 1.978-3.683s1.961-2.95 1.967-3.5c.007-.55-8.333-7.046-18.533-14.435-10.199-7.389-18.798-13.844-19.107-14.345-.917-1.483 12.042-17.68 14.168-17.707.547-.007 16.59 15.577 35.651 34.633m213.701 79.284c-.206 6.012-.676 11.233-1.046 11.602-.37.37-3.739.173-7.487-.438-17.683-2.882-31.267-4.995-35.939-5.592l-5.125-.655-.686 4.576c-.803 5.35-1.281 5.472-10.709 2.725-5.956-1.735-9.508-2.696-30.706-8.307l-8.351-2.21.59-3.566c.325-1.961.595-4.802.601-6.315L248 201h99.221l-.374 10.93m-230.702-34.078c5.956 1.735 9.508 2.696 30.706 8.307l8.351 2.21-.59 3.566c-.325 1.961-.595 4.803-.601 6.315L154 201H54.779l.374-10.93c.206-6.012.676-11.233 1.046-11.602.37-.37 3.739-.173 7.487.438 17.683 2.882 31.267 4.995 35.939 5.592l5.125.655.686-4.576c.803-5.35 1.281-5.472 10.709-2.725m82.105 70.137L201 248v99.221l-10.93-.374c-6.012-.206-11.188-.632-11.504-.947-.315-.316.337-6.385 1.45-13.487 2.664-17.009 4.943-32.633 4.966-34.049.01-.626-2.051-1.447-4.579-1.826l-4.597-.69.646-3.674c.355-2.021 1.251-5.699 1.991-8.174.739-2.475 3.267-11.859 5.618-20.854l4.274-16.353 3.582.592c1.971.326 4.821.598 6.333.604m25.205-191.868c.561.561-.641 9.488-3.888 28.879-.783 4.675-1.706 11.033-2.052 14.128l-.628 5.628 4.653.698 4.654.698-.646 3.674c-.355 2.021-1.251 5.699-1.991 8.174-.739 2.475-3.267 11.859-5.618 20.854l-4.274 16.353-3.582-.592c-1.971-.326-4.82-.598-6.333-.604L201 154V54.779l10.93.374c6.012.206 11.198.641 11.525.968m-59.732 233.008c6.959 3.102 7.79 3.594 7.652 4.528-.069.464-3.43 11.081-7.467 23.593-4.424 13.708-7.841 22.75-8.599 22.75-1.754 0-15.916-5.697-18.705-7.524l-2.298-1.506 6.879-13.235c3.784-7.279 8.778-17.163 11.097-21.963 2.32-4.801 4.768-8.738 5.441-8.75.673-.012 3.373.936 6 2.107m93.278-223.521c4.958 1.984 9.314 4.092 9.679 4.683.866 1.401-20.801 44.591-22.403 44.658-.673.028-3.373-.907-6-2.078-6.959-3.102-7.79-3.594-7.652-4.528.069-.464 3.43-11.08 7.467-23.593C242.593 70.803 245.928 62 246.71 62c.702 0 5.333 1.624 10.291 3.608m66.249 174.437c11.951 3.881 16.74 5.871 16.715 6.947-.072 3.102-7.525 19.491-8.971 19.728-.822.134-10.944-4.607-22.494-10.535-23.453-12.039-22.337-10.785-18.109-20.344l2.504-5.66 6.802 2.212c3.742 1.217 14.341 4.66 23.553 7.652M93.099 145.621c11.513 5.841 21.166 10.999 21.452 11.461.695 1.125-5.08 14.457-6.184 14.276-1.535-.251-45.85-14.662-46.334-15.067C60.81 155.266 69.372 135 71.028 135c.626 0 10.558 4.779 22.071 10.621'
          fill='#000000FF'
          stroke='#000000FF'
        />
        <path
          d='M219.5 245.053c-2.2 1.04-4.322 2.017-4.715 2.169-.393.153.421 4.553 1.809 9.778l4.387 16.5c1.024 3.85 2.572 9.682 3.44 12.96.869 3.278 1.579 6.513 1.579 7.189 0 .691-1.987 1.526-4.543 1.91l-4.544.681.633 4.63c.348 2.547 1.454 9.805 2.458 16.13l3.057 19.282c.678 4.28 1.526 7.963 1.884 8.184.621.384 19.955-3.994 20.538-4.651.153-.173-3.038-10.44-7.093-22.815-4.055-12.375-7.165-23.062-6.912-23.75.252-.687 1.036-1.254 1.741-1.26.704-.005 3.616-1.097 6.47-2.426 3.867-1.8 5.425-2.116 6.115-1.24.509.647 5.599 10.286 11.311 21.42 5.712 11.134 10.797 20.247 11.301 20.25.719.005 11.62-6.529 16.902-10.131 1.037-.707-1.204-4.131-15.616-23.863-13.049-17.865-11.707-16.749-16.346-13.594-3.386 2.303-3.993 2.435-4.983 1.085-.621-.846-6.171-10.302-12.336-21.015-6.164-10.712-11.507-19.44-11.872-19.395-.366.044-2.465.932-4.665 1.972M145 216.498a7374.922 7374.922 0 0 0-21.49 5.909c-7.145 1.976-13.777 3.593-14.738 3.593-1.268 0-1.925-1.105-2.392-4.022-.353-2.212-.969-4.224-1.367-4.47-.399-.246-4.727.177-9.619.942-4.892.764-14.891 2.322-22.222 3.463-7.33 1.141-13.9 2.415-14.601 2.831-1.008.598-.801 2.809.994 10.59 1.248 5.408 2.43 9.994 2.625 10.19.196.196 3.496-.701 7.333-1.993 24.361-8.203 38.64-12.549 39.494-12.021.54.335.987 1.144.993 1.799.005.655 1.097 3.526 2.426 6.38 1.803 3.873 2.117 5.427 1.24 6.128-1.058.844-33.945 18.055-39.418 20.629-1.233.58-2.246 1.4-2.25 1.822-.004.423 1.707 3.573 3.803 7C81.803 285.069 82.439 286 83.142 286c.364 0 7.746-5.212 16.404-11.581 8.658-6.37 17.462-12.72 19.565-14.111l3.822-2.529-2.319-3.14c-1.275-1.726-2.609-3.657-2.964-4.289-.407-.727 7.105-5.654 20.394-13.376 11.572-6.724 20.908-12.508 20.748-12.854-.161-.346-1.141-2.765-2.178-5.375s-2.162-4.704-2.5-4.654c-.338.049-4.439 1.133-9.114 2.407M302.454 127.581c-8.658 6.37-17.462 12.72-19.565 14.111l-3.822 2.529 2.319 3.14c1.275 1.726 2.609 3.657 2.964 4.289.407.727-7.091 5.645-20.353 13.352-11.548 6.71-20.997 12.323-20.997 12.472 0 .281 4.139 9.87 4.415 10.228.18.234 12.531-2.99 31.075-8.113 7.145-1.974 13.756-3.589 14.691-3.589 1.2 0 1.956 1.254 2.563 4.25.852 4.199.91 4.247 4.809 3.995 2.171-.14 9.347-1.138 15.947-2.216 6.6-1.079 15.294-2.473 19.321-3.098 4.757-.738 7.52-1.657 7.892-2.626.537-1.398-2.331-16.387-3.635-19-.438-.879-2.444-.573-7.587 1.159-22.909 7.714-38.747 12.613-39.227 12.133-.303-.303-1.638-3.149-2.967-6.324a803.645 803.645 0 0 0-2.857-6.773c-.342-.776 26.803-15.553 40.302-21.939 1.233-.584 2.246-1.407 2.25-1.829.004-.423-1.707-3.573-3.803-7-5.992-9.801-6.628-10.732-7.331-10.732-.364 0-7.746 5.212-16.404 11.581M166.365 59.679l-10.135 2.436 1.307 4.193c.719 2.305 4.084 12.678 7.477 23.05 3.394 10.372 5.791 19.169 5.328 19.55-1.866 1.534-12.453 5.262-13.606 4.791-.68-.277-5.957-9.773-11.726-21.102C139.24 81.269 134.103 72 133.594 72c-.727 0-11.63 6.536-16.912 10.137-1.067.728 1.362 4.4 16.816 25.416l11.068 15.053 3.895-2.824c2.143-1.554 4.229-2.478 4.636-2.054.408.425 5.785 9.547 11.95 20.272 6.164 10.725 11.521 19.848 11.903 20.272.512.569 9.011-2.345 10.752-3.687.111-.086-.925-4.415-2.304-9.62-4.542-17.159-7.313-27.415-8.363-30.958-1.773-5.985-1.431-6.809 3.215-7.747l4.25-.858-.312-4.451c-.171-2.448-1.145-9.626-2.164-15.951a9259.914 9259.914 0 0 1-3.085-19.282c-.678-4.28-1.504-7.938-1.836-8.128-.332-.191-5.164.749-10.738 2.089M248.989 203.25c-.006 1.238-.282 3.886-.612 5.885-.695 4.202-1.2 3.94 16.123 8.395 5.5 1.414 14.16 3.674 19.246 5.021 5.085 1.347 9.657 2.449 10.162 2.449.504 0 1.226-1.831 1.604-4.07.378-2.238 1.315-4.31 2.082-4.604.767-.295 5.785.189 11.15 1.074 27.285 4.502 34.163 5.6 35.079 5.6 1.087 0 1.743-3.531 2.737-14.75l.643-7.25H249l-.011 2.25M106.488 181.07c-.378 2.238-1.315 4.31-2.082 4.604-.767.295-5.785-.189-11.15-1.074-27.285-4.502-34.163-5.6-35.079-5.6-1.087 0-1.743 3.531-2.737 14.75l-.643 7.25H153l.011-2.25c.006-1.237.282-3.886.612-5.885.695-4.202 1.2-3.94-16.123-8.395-5.5-1.414-14.16-3.674-19.246-5.021-5.085-1.347-9.657-2.449-10.162-2.449-.504 0-1.226 1.831-1.604 4.07M187.644 252.85c-.86 3.107-2.67 9.925-4.021 15.15a2226.13 2226.13 0 0 1-4.54 17.232c-1.146 4.252-2.083 8.126-2.083 8.608 0 .482 1.913 1.283 4.25 1.781 4.152.884 4.249.996 4.194 4.892-.046 3.269-2.936 22.711-6.044 40.658l-.636 3.671 4.368.545c2.402.299 7.406.821 11.118 1.158l6.75.614V249h-2.757c-1.516 0-4.169-.405-5.896-.9l-3.139-.901-1.564 5.651M201 103.902V153h2.757c1.516 0 4.216.419 6 .93 1.783.512 3.243.749 3.243.528 0-.221 1.546-6.152 3.434-13.18 6.011-22.364 8.566-32.245 8.566-33.131 0-.475-1.912-1.27-4.25-1.768-4.152-.884-4.249-.996-4.194-4.892.046-3.266 2.945-22.768 6.039-40.628l.631-3.64-4.863-.575c-2.675-.317-7.675-.86-11.113-1.208l-6.25-.632v49.098M239.167 229.941c-1.742 2.168-3.167 4.319-3.167 4.78 0 .462 15.295 16.087 33.989 34.724l33.989 33.885 2.154-1.915c3.159-2.809 11.868-13.374 11.868-14.398 0-.787-6.194-5.402-30.595-22.796-4.073-2.903-7.405-5.759-7.405-6.345 0-.587.935-2.381 2.078-3.986 1.144-1.606 1.931-3.351 1.75-3.878-.322-.943-39.557-24.012-40.838-24.012-.36 0-2.081 1.774-3.823 3.941M93.386 103.25C88.054 108.871 84 113.95 84 115.008c0 .765 6.271 5.432 30.595 22.771 4.073 2.903 7.405 5.759 7.405 6.345 0 .587-.935 2.381-2.078 3.986-1.144 1.606-1.931 3.351-1.75 3.878.322.943 39.557 24.012 40.838 24.012.865 0 6.99-7.642 6.99-8.721C166 166.423 98.738 99 97.885 99c-.258 0-2.282 1.913-4.499 4.25M272.474 103c-7.55 10.45-14.163 19-14.696 19-.533 0-2.283-.935-3.888-2.078-1.606-1.144-3.356-1.931-3.89-1.75-.959.324-24 39.509-24 40.816 0 .907 7.643 7.012 8.778 7.012.493 0 16.083-15.351 34.645-34.114l33.749-34.114-3.336-3.466C296.601 90.945 287.76 84 286.716 84c-.284 0-6.693 8.55-14.242 19M132.603 270.132l-33.739 34.133 3.318 3.447c4.993 5.188 12.83 10.681 13.799 9.672 1.107-1.154 19.626-26.495 23.848-32.634 1.797-2.612 3.738-4.75 4.315-4.75.576 0 2.361.935 3.966 2.078 1.606 1.144 3.356 1.931 3.89 1.75.959-.324 24-39.509 24-40.816 0-.903-7.64-7.012-8.77-7.012-.488 0-16.07 15.36-34.627 34.132M291.143 236.411c-3.847 8.696-5.317 7.128 17.736 18.909 11.494 5.874 21.336 10.68 21.871 10.68.973 0 6.553-12.374 7.774-17.238.643-2.565.547-2.609-21.238-9.669-12.036-3.901-22.404-7.093-23.038-7.093-.635 0-2.032 1.985-3.105 4.411M67.2 143.33c-5.699 13.578-7.62 11.432 17.514 19.577C96.75 166.808 107.118 170 107.752 170c.635 0 2.032-1.985 3.105-4.411 3.847-8.696 5.317-7.128-17.736-18.909C81.627 140.806 71.785 136 71.25 136c-.535 0-2.357 3.299-4.05 7.33M146.745 308.982C140.835 320.511 136 330.344 136 330.833c0 .911 12.586 6.523 17.262 7.697 2.599.652 2.607.635 10.018-22.189l7.417-22.841-4.761-2.155c-2.619-1.185-5.591-2.418-6.603-2.739-1.554-.494-3.522 2.691-12.588 20.376M238.72 85.659l-7.417 22.841 4.761 2.155c2.619 1.185 5.591 2.418 6.603 2.739 1.554.494 3.522-2.691 12.588-20.376C261.165 81.489 266 71.656 266 71.167c0-.911-12.586-6.523-17.262-7.697-2.599-.652-2.607-.635-10.018 22.189'
          fill='#FFFFFFFF'
          stroke='#FFFFFFFF'
        />
      </svg>
    ),
    chainId: mantleTestnet.id,
    networkKey: 'mantle',
    isEthGasToken: false,
    chainName: 'Mantle Goerli',
    explorerUrl: mantleTestnet.blockExplorers.default.url,
    rpcUrl: mantleTestnet.rpcUrls.default.http[0],
  },
];

const FromListSepolia = [
  {
    label: 'Ethereum Sepolia Testnet',
    icon: (
      <svg
        className='h-5 w-5'
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect fill='#5E7CF1' width='40' height='40' rx='12' />
        <g transform='translate(4 4)'>
          <circle cx='16' cy='16' r='14' fill='#fff' />
          <svg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16z'
              fill='#5E7CF1'
            />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M16 5.333l6.667 10.725L16 19.878l-6.668-3.82 6.668-10.725zm-.002 15.702l6.669-4.065-6.669 9.697-6.665-9.696 6.665 4.064z'
              fill='#fff'
            />
          </svg>
        </g>
      </svg>
    ),
    chainId: sepolia.id,
    networkKey: 'sepolia',
    isEthGasToken: true,
    chainName: 'Sepolia',
    explorerUrl: sepolia.blockExplorers.default.url,
    rpcUrl: sepolia.rpcUrls.default.http[0],
  },
  {
    label: 'Arbitrum Sepolia Testnet',
    icon: arbitrumIcon,
    chainId: arbitrumSepolia.id,
    networkKey: 'arbitrum',
    isEthGasToken: true,
    chainName: 'Arbitrum Sepolia',
    explorerUrl: arbitrumSepolia.blockExplorers.default.url,
    rpcUrl: arbitrumSepolia.rpcUrls.default.http[0],
  },
  {
    label: 'Base Sepolia Testnet',
    icon: baseIcon,
    chainId: baseSepolia.id,
    networkKey: 'base',
    isEthGasToken: true,
    chainName: 'Base Sepolia',
    explorerUrl: baseSepolia.blockExplorers.default.url,
    rpcUrl: baseSepolia.rpcUrls.default.http[0],
  },
  {
    label: 'Linea Sepolia Testnet',
    icon: lineaIcon,
    chainId: lineaSepolia.id,
    networkKey: PRIMARY_CHAIN_KEY,
    isEthGasToken: true,
    chainName: 'Linea Sepolia',
    explorerUrl: lineaSepolia.blockExplorers.default.url,
    rpcUrl: lineaSepolia.rpcUrls.default.http[0],
  },
  {
    label: 'Zksync Sepolia Testnet',
    icon: zkscyncIcon,
    chainId: zkSyncSepoliaTestnet.id,
    networkKey: 'zksync',
    isEthGasToken: true,
    chainName: 'Zksync Sepolia',
    explorerUrl: zkSyncSepoliaTestnet.blockExplorers.default.url,
    rpcUrl: zkSyncSepoliaTestnet.rpcUrls.default.http[0],
  },
];

const FromList = (() => {
  switch (nodeType) {
    case 'nexus-goerli':
      return FromListGoerli;
    case 'nexus-sepolia':
      return FromListSepolia;
    default:
      return FromListMainnet;
  }
})();

export default FromList;
