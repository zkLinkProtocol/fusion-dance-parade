import React from 'react';

const NFTCollectionTable: React.FC = () => {
  const tableData = [
    { order: '1st - 999th', amount: 2 },
    { order: '1000th - 2499th', amount: 3 },
    { order: '2500th - 4999th', amount: 4 },
    { order: '5000th - 7999th', amount: 5 },
    { order: '8000th - 8999th', amount: 6 },
    { order: '9000th - 10000th', amount: 7 },
  ];

  return (
    <div className='container mx-auto text-slate-400'>
      <table className='table-auto border border-slate-400'>
        <thead>
          <tr className='bg-transparent'>
            <th className='border border-slate-400 px-4 py-2'>Order of "Chad" NFT</th>
            <th className='border border-slate-400 px-4 py-2'>
              The amount of different "Nova Infinity Stone" NFTs needed
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className='bg-transparent'>
              <td className='border border-slate-400 px-4 py-2 text-white'>{row.order}</td>
              <td className='border border-slate-400 px-4 py-2 text-center text-white'>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Rules: React.FC = () => {
  return (
    <div className='max-md:max-w-full w-full'>
      <div className='max-md:mt-10 max-md:max-w-full relative mb-5 mt-24 self-start text-2xl  font-black leading-[56.16px] tracking-tight text-white md:text-5xl'>
        Rules
      </div>
      <div className='w-full rounded-lg bg-slate-900 p-8 text-left text-sm text-slate-400'>
        1. Connect your wallet and check your whitelist eligibility.
        <br /> <br />
        2. If you have whitelist qualifications, you can transfer any amount of corresponding meme coins across the
        chain to Nova and mint your "Nova Infinity Stone" NFTs <br /> <br />
        3. Collect or mint some different "Nova Infinity Stone" NFTs, then merge your "Chad" NFT. The amount of "Nova
        Infinity Stone" NFTs required to merge "Chad" NFT will increase based on the amount of "Chad" NFT that has been
        merged.
        <br />
        <br />
        For example: the 1st-999th“Chad” NFT requires the synthesis of 2 different "Nova Infinity Stone" NFTs
        <br />
        <br />
        <NFTCollectionTable />
        <br />
        4. Bonus：We have a total of 10,000 “Chad” NFTs and 10,000 Mystery boxes. Users who mint “Chad” NFT and join the
        zkLink Aggregation Parade will be guaranteed a mystery box.
        <br />
        <br />
        5. Recreate “Chad” campaign: Join our community, create and vote for your ideal “Chad” Meme. We will mint the
        most popular Chad meme in the community, and replace all “Chad” NFT with new “Chad” NFT. <br />
        <br />
        <br />
        Notice: <br />
        <br />
        An address can only get at most 1 mystery box. <br /> <br />
        If you want to collect or sell "Chad" NFT or Infinity Stones, just trade it on Alienswap. <br /> <br />
        “Chad” NFT is a voucher and badge for early Nova participants, and it is non-transferable, just like SBT. <br />
        <br />
        <br />
        Time: 10th May- 10th June 2024
        <br />
        <br />
        <span className='text-xs'>All rights of this campaign reserved by zkLink Nova.</span>
      </div>
    </div>
  );
};

export default Rules;
