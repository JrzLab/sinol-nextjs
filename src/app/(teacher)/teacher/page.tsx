import { ActivityChart } from '@/app/chart/ActivityChart';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { chartStaticData1 } from '@/lib/staticData';
import Link from 'next/link';
import React from 'react'

const page = () => {
  const cardData = [
    {
      title: "Total Subject",
      description: "Total Subject You Get",
      total: 20,
    },
    {
      title: "Attendance",
      description: "Submitted Attendance",
      total: 20,
    },
    {
      title: "Assignment",
      description: "Submitted Assignment",
      total: 20,
    },
    {
      title: "Rank Table",
      description: "Rank Of All User",
      total: 20,
    },
  ];

  return (
    <>
      <div className='grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1'>
        { cardData.map((doc) => (
          <Card key={doc.title}>
            <CardHeader className='flex flex-row items-start gap-4'>
              <div className='grid'>
                <Link href={doc.title} className='hover:underline font-bold'>{doc.title}</Link>
                <p>{doc.description}</p>
              </div>
            </CardHeader>   
            <CardFooter>
              <b className=' text-2xl'>{doc.total}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div>
        {/* <ActivityChart/> */}
      </div>
    </>
  )
}

export default page