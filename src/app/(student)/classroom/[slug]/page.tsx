'use client'

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { eventStaticData, subjectStaticData } from '@/lib/staticData'
import { usePathname } from 'next/navigation'
import React from 'react'
import EventCard from '@/components/subject/event-card'

const page = () => {
  const query = usePathname().split('/')[2]
  const data = subjectStaticData.filter((data) => data.id == parseInt(query))[0]
  const events = eventStaticData.filter((data) => data.subjectId == parseInt(query)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard key={event.eventId} data={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

