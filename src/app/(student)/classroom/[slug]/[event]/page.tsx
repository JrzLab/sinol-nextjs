'use client'

import { Card, CardHeader } from '@/components/ui/card'
import { eventStaticData } from '@/lib/staticData'
import { usePathname } from 'next/navigation'
import React from 'react'

const page = () => {
  const query = usePathname().split('/')[3]
  // const subject = 
  const events = eventStaticData.filter((data) => data.eventId == parseInt(query)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
  return (
    <div>
      <Card>
        <CardHeader>
          <h1 className='font-bold'>{events.title}</h1>
          <p>{events.description}</p>
          <p className="-p-1">{}</p>
        </CardHeader>
      </Card>
    </div>
  )
}

export default page