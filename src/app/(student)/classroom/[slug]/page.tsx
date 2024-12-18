'use client'

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { subjectStaticData } from '@/lib/staticData'
import { usePathname } from 'next/navigation'
import React from 'react'

const page = () => {
  const query = usePathname().split('/')[2]
  const data = subjectStaticData.filter((data) => data.id == parseInt(query))[0]

  return (
    <div>
      <Card>
        <CardHeader>
          <h1 className="font-bold">{data.title}</h1>
          <p>{data.description}</p>
        </CardHeader>
        <hr />
        <CardFooter className="grid grid-cols-3">
          <div className='w-full pt-6'>
            <h1 className="font-bold">Teacher</h1>
            <p>{data.teacher}</p>
          </div>
          <div className='w-full pt-6'>
            <h1 className="font-bold">Event</h1>
            <p>{data.event}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page