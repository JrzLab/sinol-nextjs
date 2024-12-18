'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

const page = () => {
  const query = usePathname().split('/')[2]
  return (
    <div>{query}</div>
  )
}

export default page