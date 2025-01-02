'use client';

import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import profile from '@/app/image/profile.jpg'

const page = () => {
  return (
    <div className='flex flex-col items-center text-sm'>
      <div className="rounded-full bg-black w-24 aspect-square overflow-hidden border-2 border-black">
        <Image src={profile} alt='profile images' width={100} height={100} className='object-cover object-center '/>
      </div>
      <div className="mt-4 fex text-center flex-col items-center">
        <h1 className='text-lg'><b>Alif Mahendra</b></h1>
        <p>alif.mhndr@gmail.com</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-4'>
        <Card>
          <CardHeader>
            <h1 className='text-base font-bold'>Information</h1>
          </CardHeader>
          <hr />
          <CardHeader>
            <p className=''>last login: 21 Januari 2023</p>
            <p>seesion exp: 12 Januari 2023 / 23:00 WIB</p>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default page