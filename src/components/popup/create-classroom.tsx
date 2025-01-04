'use client'

import { Card, CardContent, CardHeader } from '../ui/card'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'


const CreateClassroom = ({status}: {status: () => void}) => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const togglePopUp = () => {
    status()
    setIsOpen(!isOpen)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const classroomData = {
      name: formData.get('classroom') as string,
      description: formData.get('description') as string,
    }

    // fetch('', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(classroomData),
    // }).then(res => res.json()).then(res => res.status == 200 ? 
    //   router.push(`/classroom/${res.data.id}`) : 
    //   toast({
    //     title: "Failed to create classroom",
    //     description: "gagal membuat kelas baru",
    //   })
    // )
  }

  return (
    <>
      {isOpen && (
        <div className='z-40 w-full px-6 h-screen bg-foreground/50 fixed top-0 left-0 flex justify-center items-center'>
          <Card className='w-full max-w-xl'>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h1 className='font-bold'>Create classroom</h1>
                  <p className=''>buat kelas anda</p>
                </div>
                <Button onClick={togglePopUp}><X/></Button>
              </div>
            </CardHeader>
            <hr />
            <CardContent>
              <form onSubmit={handleSubmit} className='pt-4 flex w-full gap-6 flex-col'>
                <div className='w-full flex flex-col gap-2'>
                  <label className='text-sm' htmlFor="classroom">nama kelas </label>
                  <Input name='classroom' id='classroom' />
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <label className='text-sm' htmlFor="description">deskripsi kelas </label>
                  <Textarea name="description" id="description"></Textarea>
                </div>
                <Button type='submit'>buat kelas</Button>
              </form>
            </CardContent>
          </Card>
          
        </div>
      )}
    </>
  )
}

export default CreateClassroom