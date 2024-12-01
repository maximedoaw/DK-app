import Image from "next/image";
import { Button } from "@/components/ui/button"; // Adapter selon votre structure
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

type CardProps = { 
    imageSrc: string; 
    title: string;
    description: string; 
    avatarUrls: string[];
    imgUrl?: string
}

const Card : React.FC<CardProps> = ({ imageSrc, title, description, avatarUrls, imgUrl }) => {
  return (
    <div className="w-full lg:w-[300px] sm:w-[700px] bg-gray-900 cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48">
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div>

      {/* Description Section */}
      <div className="p-4 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 text-white">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="flex text-sm text-gray-400 items-center">
            {imgUrl && (              
              <Avatar  className="w-6 h-6 border-2  bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 mr-2 border-none">
                <AvatarImage src={imgUrl} alt={`Avatar`} className="w-6 h-6"/>
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            )} 
            {description.length > 25 ? description.substring(0, 25) + "..." : description}
        </p>

        <div className="flex items-center justify-between mt-4">
          {/* Avatars */}
          <div className="flex -space-x-3">
            {avatarUrls.map((url, index) => (
              <Avatar key={index} className="w-8 h-8 border-2 border-gray-800">
                <AvatarImage src={url} alt={`Avatar ${index + 1}`} />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <p className="text-xs text-gray-400"> players</p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-md">
              Decouvrir
            </Button>
          </div>
        </div>
      </div>
    </div>
   )
 }

export default Card;