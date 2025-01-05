'use client'

import { useToast } from "@/hooks/use-toast"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { X } from "lucide-react"

const CreateEventPopUp = ({status}: {status: () => void}) => {
  interface IFile {
    id: number
    name: string
    ext: string
  }

  const [ isOpen, setIsOpen ] = useState(true)
  const [ file, setFile ] = useState<IFile[]>([])
  const { toast } = useToast()

  const togglePopUp = () => {
    status()
    setIsOpen(!isOpen)
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const fileArray = Array.from(files)
    const fileNames = fileArray.map(file => file.name)
    const fileExt   = fileArray.map(file => file.type)

    const list: IFile[] = []
    let i = 0
    fileArray.map(file => {
      list.push({name: file.name, ext: file.type, id: i++})
    })

    setFile( list )
    toast({title: 'File Uploader', description: 'file berhasil diupload'})
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
        //   toast('Classroom created successfully', 'success') :
        //   toast('Failed to create classroom', 'error')
        // )
    // })
  }

  return (
    <> 
    {isOpen && (
      <div className='z-40 w-full px-4 h-screen bg-foreground/50 fixed top-0 left-0 flex justify-center items-center'>
        <Card className='w-full max-w-xl'>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <h1 className='font-bold'>Create Event</h1>
                <p className=''>buat event untuk kelas anda</p>
              </div>
              <Button onClick={togglePopUp}><X/></Button>
            </div>
          </CardHeader>
          <hr />
          <CardContent>
            <form onSubmit={handleSubmit} className='pt-4 flex w-full gap-6 flex-col'>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-sm' htmlFor="classroom">nama event </label>
                <Input name='classroom' id='classroom' />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-sm' htmlFor="description">deskripsi event </label>
                <Textarea name="description" id="description"></Textarea>
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='text-sm' htmlFor="file">file </label>
                <Input type="file" id="file" onChange={handleFiles} name="file" multiple/>
              </div>
              <Card >
                <CardHeader>
                  {file.map((file) => (
                    <div key={file.id}>
                      {file.name}
                      {file.ext}
                    </div>
                  ))}
                </CardHeader>
              </Card>
              <Button type='submit'>buat kelas</Button>
            </form>
          </CardContent>
        </Card>
        
      </div>
    )}
  </>
  )
}

export default CreateEventPopUp