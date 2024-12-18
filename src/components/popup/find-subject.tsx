import { useEffect, useState} from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { subjectStaticData } from '@/lib/staticData'
import Link from 'next/link'

const FindSubject = ({status}: {status: () => void}) => {
  
  interface Course {
    id: number;
    title: string;
    teacher: string;
    description: string;
    notifications: number;
    event: number;
    person: number;
    day: number;
  }

  const [search, setSearch] = useState('')
  const [result, setResult] = useState<Course[]>([])
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const filteredData = subjectStaticData.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    setResult(filteredData)
  }, [search])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const togglePopUp = () => {
    status()
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* <Button onClick={togglePopUp}>Find Subject</Button> */}
      {isOpen && (
        <div className='z-40 w-full h-screen bg-foreground/50 fixed top-0 left-0 flex justify-center items-center'>
          <Card className='w-full max-w-xl'>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h1 className='font-bold'>Find Subject</h1>
                  <p className=''>cari mata pelajaran anda</p>
                </div>
                <Button onClick={togglePopUp}><X/></Button>
              </div>
            </CardHeader>
            <hr />
            <CardContent>
              <form action="" className='pt-4 flex w-full gap-2'>
                <Input name='find' value={search} onChange={handleSearch}/>
              </form>
              <div className="grid grid-cols-1 remove-sb gap-2 max-h-80 mt-4 overflow-auto">
                {result.map(item => (
                  <Link href={`/classroom/${item.id}`}  key={item.id} className=" p-2 border border-input rounded-md">
                    <div className='p-4'>
                      <p className='hover:underline font-bold'>{item.title}</p>
                      <p className='text-sm'>{item.teacher}</p>
                    </div>
                  </Link>
                ))}

              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default FindSubject

