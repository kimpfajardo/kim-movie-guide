import Image from "next/image";
import { blurDataURL } from "../utils/blurDataURL";

export const MobileMovieCover = ({ name, image }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-[300px] aspect-[9/16]">
        <Image
          className="object-cover w-full h-full rounded-lg shadow-lg"
          src={
            image?.original ?? image?.medium ?? "/static/no-img-available.png"
          }
          fill
          objectFit="cover"
          alt={name}
          draggable="false"
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority
        />
      </div>
    </div>
  );
};
