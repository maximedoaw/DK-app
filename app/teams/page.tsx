import Card from '@/components/Card/Card'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-wrap justify-center gap-2'>
        <Card 
          imageSrc='/images/Messi.png'
          title='Barcelone'
          description='Club espagnol'
          avatarUrls={['/images/Messi.png','/images/Messi.png','/images/Messi.png']}
          imgUrl='/images/stade.jpg'
        />
                <Card 
          imageSrc='/images/Messi.png'
          title='Barcelone'
          description='Club espagnol'
          avatarUrls={['/images/Messi.png','/images/Messi.png','/images/Messi.png']}
        />        <Card 
        imageSrc='/images/Messi.png'
        title='Barcelone'
        description='Club espagnol'
        avatarUrls={['/images/Messi.png','/images/Messi.png','/images/Messi.png']}
      />        <Card 
      imageSrc='/images/Messi.png'
      title='Barcelone'
      description='Club espagnol'
      avatarUrls={['/images/Messi.png','/images/Messi.png','/images/Messi.png']}
    />        <Card 
    imageSrc='/images/Messi.png'
    title='Barcelone'
    description='Club espagnol'
    avatarUrls={['/images/Messi.png','/images/Messi.png','/images/Messi.png']}
  />        <Card 
  imageSrc='/images/Messi.png'
  title='Barcelone'
  description='Club espagnol'
  avatarUrls={['/images/Messi.png','/images/Messi.png','/images/Messi.png']}
/>
    </div>
  )
}

export default page