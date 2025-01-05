import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FileText, Grid2x2, WholeWord } from 'lucide-react'

const Event = () => {
  const staticFile = [{
    "id": 1,
    "name": "file name",
    "ext": ".pdf",
    "icon": <FileText className='w-full' width={100} />
  }, {
    "id": 2,
    "name": "file name",
    "ext": ".docx",
    "icon": <WholeWord className='w-full' width={100} />
  }, {
    "id": 3,
    "name": "file name",
    "ext": ".exls",
    "icon": <Grid2x2 className='w-full' width={100} />
  }, {
    "id": 4,
    "name": "file name",
    "ext": ".exls",
    "icon": <Grid2x2 className='w-full' width={100} />
  }]
  return (
    <div className='w-full text-sm flex flex-col gap-2'>
      <Card>
        <CardHeader>
          <h1 className='font-bold text-xl'>Event name</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque sapiente veniam porro. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam itaque voluptatibus aspernatur voluptatem, cupiditate minus incidunt id labore illum, ipsa distinctio voluptates reprehenderit ducimus. Voluptates rem eligendi consectetur illo accusantium accusamus quia nesciunt illum tempore dolore voluptate tempora aperiam ad placeat cumque soluta ipsa eius, praesentium neque odit voluptatum, cupiditate repudiandae! Provident atque aut quos sint recusandae harum minus illum. Dolore placeat eligendi maiores deserunt, corrupti aut eum. Quasi, ullam animi voluptate repellat distinctio, nesciunt ad, magnam velit doloribus facere commodi! Pariatur illo nemo hic voluptas vero accusantium. Dolores error ratione odit dolore ullam at aperiam, eveniet corrupti iste eius cumque molestias quaerat vel, nihil quia alias cupiditate et officia quo. Eum magni a accusamus, odio voluptatem vel obcaecati neque, quis molestias consequatur sunt animi nemo officiis commodi, unde impedit dignissimos. Officiis, fugit. Maiores accusantium ad minima quasi maxime voluptas perspiciatis! Cumque totam sed quae vero dicta quaerat praesentium corrupti assumenda quis voluptatem, suscipit ipsum esse, beatae quo facere rem nihil aperiam. Maxime aspernatur minima quae. Numquam eveniet minima nemo, laborum cumque eum blanditiis maxime voluptates ullam nobis? Optio saepe eligendi sapiente voluptatibus assumenda, repellendus nostrum labore unde reprehenderit deleniti magnam porro? Eaque recusandae perferendis voluptatem eos quasi vero! Iure quos obcaecati molestiae nisi quidem nostrum ad sed, deleniti tempore.</p>
        </CardHeader>
        <hr />
        <CardHeader className='flex-row items-end gap-2'>
          <div className="aspect-square bg-black w-12 rounded-full"></div>
          <div className=''>
            <h1 className='text-lg'><b>teacher name</b></h1>
            <p>teacher name</p>
          </div>
        </CardHeader>
      </Card>
      <div className="md:grid-cols-2 grid gap-2 content-start">
        <div>
        <Card className='overflow-hidden'>
          <img src="https://dummyimage.com/900x400" alt="" />
          <hr />
          <CardHeader className='items-end text-end'>
            <h1 className='text-lg'><b>file name</b></h1>
            <p>file image(jpg, png, jpeg) Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod enim architecto unde?</p>
          </CardHeader>
        </Card>
        </div>
        <div>
        <Card>
          <CardHeader className='overflow-hidden items-end text-end'>
            <h1><b>file</b></h1>
            <p>description:  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam quasi eligendi cum.</p>
          </CardHeader>
          <hr />
          <CardHeader>
            <div className="grid grid-cols-4 gap-2">
              {staticFile.map(file => (
                <div className='mb-4' key={file.id}>
                  <div className='mb-2 rounded shadow-sm flex flex-col justify-center aspect-square items-center border'>
                    <h1>{file.icon}</h1>
                  </div>
                  <p>{file.name}{file.ext}</p>
                </div>
              ))}
              {staticFile.map(file => (
                <div className='mb-4' key={file.id}>
                  <div className='mb-2 rounded shadow-sm flex flex-col justify-center aspect-square items-center border'>
                    <h1>{file.icon}</h1>
                  </div>
                  <p>{file.name}{file.ext}</p>
                </div>
              ))}
            </div>
            <Button>Download</Button>
          </CardHeader>
        </Card>
        </div>
        <form>
          <Card>
            <CardHeader className='items-center'>
              <h1 className='text-lg'><b>Pengumpulan tugas</b></h1>
              <p>kumpulkan tugas event ini</p>
            </CardHeader>
            <hr />
            <CardHeader>
              <Input type="file" className='mt-4'/>
            </CardHeader>
          </Card>
        </form>
      </div>
    </div>
  )
}

export default Event