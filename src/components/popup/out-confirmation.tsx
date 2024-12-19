import React from 'react'
import { Card, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { subjectStaticData } from '@/lib/staticData'

const OutConfirmation = ({ toggle, id }: { toggle: () => void, id: number }) => {
  const togglePopUp = () => {
    toggle()
  }

  const data = subjectStaticData.filter((item) => item.id === id)[0]


  return (
    <div className='z-50 w-full h-screen bg-foreground/50 fixed top-0 left-0 flex justify-center items-center'>
      <Card className='w-full max-w-xl'>
        <CardHeader className='items-center'>
          <h1 className='font-bold'>apakah anda yakin?</h1>
          <p>apakah anda yakin ingin keluar dari kelas {data.title}</p>
        </CardHeader>
        <hr />
        <CardFooter className='mt-6 w-full flex gap-2'>
          <Button className='flex-1'>yap</Button>
          <Button className='flex-1' variant='outline' onClick={togglePopUp}>batal</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default OutConfirmation