'use client'

import { eventStaticData } from '@/lib/staticData'
import { usePathname } from 'next/navigation'
import React from 'react'

const page = () => {
  const query = usePathname().split('/')[3]
  const events = eventStaticData.filter((data) => data.subjectId == parseInt(query)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return (
    <div>
      haloo
    </div>
  )
}

export default page