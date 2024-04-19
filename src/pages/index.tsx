import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { BottomGradient, SpinCarousel } from 'components/svgs';
import { Button } from 'components/ui/buttons/button';
import { checkMintEligibility } from 'constants/api';

const formSchema = z.object({
  address: z.string().min(1, 'Address is required'),
});

type CollectableCreateFormValue = z.infer<typeof formSchema>;

const Page = () => {
  const { register, handleSubmit, formState } = useForm<CollectableCreateFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: { address: '' },
  });
  const { errors, isSubmitted } = formState;
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const onSubmit = useCallback(async (data: CollectableCreateFormValue) => {
    const res = await checkMintEligibility(data.address);
    setIsEligible(res.result.length > 0);
  }, []);

  return (
    <>
      <section className='h-screen w-full bg-dunes bg-cover bg-center'>
        <div className='max-md:max-w-full relative flex w-full flex-col overflow-hidden pt-6'>
          <BottomGradient className='absolute bottom-[30px] z-10 h-[580px] w-full object-cover' />
          <div className='max-md:mb-2.5 max-md:mt-10 max-md:px-5 relative mb-0 mt-11 flex min-h-[850px] w-[891px] max-w-full flex-col items-center justify-center self-center overflow-hidden px-16 py-20 tracking-tight'>
            <SpinCarousel className='absolute inset-0 object-cover' />
            <div className='max-md:my-10 relative z-[99] mb-24 mt-52 flex w-[585px] max-w-full flex-col items-center'>
              <div className='max-md:text-4xl max-md:leading-[52px] w-[417px] text-center text-5xl font-black leading-[56px] text-white'>
                Brave MEME Coin Hodlers, welcome to Nova!
              </div>
              <div className='max-md:mt-10 max-md:max-w-full mt-12 w-[425px] text-center text-base leading-6 text-neutral-400'>
                You will earn one of the six Nova Meme NFT once you bridge any amount of meme coin into zkLink Nova from
                different layers.
              </div>

              <div className='max-md:flex-wrap mt-9 flex items-start gap-5 self-stretch'>
                <div
                  className={classNames(
                    'flex w-fit shrink-0 grow basis-0 flex-col rounded-lg',
                    isEligible === true && 'bg-[#153B2D] p-0.5',
                    isEligible === false && 'bg-[#3D1A2E] p-0.5',
                  )}
                >
                  <input
                    {...register('address')}
                    placeholder='Input your address here'
                    className={classNames(
                      'placeholder:text-gray4 hover:border-primary focus:border-primary disabled:border-lightGray1 disabled:bg-lightGray4 disabled:text-gray4 w-full rounded-lg border border-[#1A1F24] bg-[#1A1F24] px-2 py-3 text-base text-white focus:outline-0 disabled:cursor-not-allowed',
                      isEligible === true && 'border-[#2A5C4A]',
                      isEligible === false && 'border-[#3D1A2E]',
                    )}
                  />
                  {isSubmitted && errors.address && (
                    <div className='ml-2.5 mt-1.5 self-start text-xs leading-5 text-[#A13146]'>
                      {errors.address.message}
                    </div>
                  )}
                  {isSubmitted && isEligible !== null && (
                    <div
                      className={classNames(
                        'ml-2.5 mt-1.5 self-start text-xs leading-5',
                        isEligible ? 'text-emerald-400' : 'text-[#A13146]',
                      )}
                    >
                      {isEligible ? 'Congrats! Mint your NFT ASAP!' : 'Sorry, you do not have the mint eligibility.'}
                    </div>
                  )}
                </div>
                <Button
                  className='gradient-btn !py-6 !font-normal'
                  onClick={handleSubmit(onSubmit)}
                  disabled={!formState.isDirty}
                >
                  Input Address to Check Mint Eligibility
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
