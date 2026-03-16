import React from 'react'

export default function Footer() {
  return (
    <>
      <div>
        <div className='flex justify-center items-center gap-7'>
          <div className='w-8'>
            <img src="/assets/logo/govt.png" alt="govt logo" className='w-full' />
          </div>
          <div className='w-8'>
            <img src="/assets/logo/dghs.png" alt="dghs logo" />
          </div>
          <div className='w-18'>
            <img src="/assets/logo/groupmappers.png" alt="groupmappers logo" />
          </div>
          <div className='w-16'>
            <img src="/assets/logo/brac.png" alt="brac logo" />
          </div>
          <div className='w-16'>
            <img src="/assets/logo/imacs.png" alt="imacs logo" />
          </div>
          <div className='w-8'>
            <img src="/assets/logo/unops.png" alt="unops logo" />
          </div>
          <div className='w-16'>
            <img src="/assets/logo/moru.png" alt="moru logo" />
          </div>
          <div className='w-8'>
            <img src="/assets/logo/mis.png" alt="mis logo" />
          </div>
          <div className='w-6'>
            <img src="/assets/logo/iedcr.png" alt="iedcr logo" />
          </div>
        </div>
        <p className='text-center text-[rgb(60,93,170)] text-xs mt-4'>
          The EWARS system has been developed with funding support from The Global Fund and TA provided by IMACS.
        </p>
      </div>
    </>
  )
}
