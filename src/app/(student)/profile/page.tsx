'use client';

import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

const page = () => {
  return (
    <div>
      <Card>
        <CardHeader className='flex-row gap-4 text-sm'>
          <div className='w-40 rounded-md aspect-square bg-black '>
            <Image src={"/anjay.png"} width={100} height={100} alt="profile tod" className='object-cover'/>
          </div>
          <div className="w-full">  
            <h1 className='text-2xl font-bold'>Alif Mahendra</h1>
            <p className='text-foreground '>sisa masa aktif 9 tahun</p>
            <p className="mt-4">joined at: 23 januari 2023</p>
            <p>last login at: 23 januari 2023</p>
            <p>desc: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus, neque?</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default page