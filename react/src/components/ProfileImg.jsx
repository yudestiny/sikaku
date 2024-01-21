import { UserCircleIcon } from "@heroicons/react/24/outline";

export function ProfileImg({img,size}) {
    return (
      <>
        {img ? (
          <img
            className={`h-${size} w-${size} rounded-full object-cover object-center`}
            src={img}
            alt="nature image"
          />
        ):(
          <UserCircleIcon className={`text-gray-600 h-${size} w-${size} rounded-full object-cover object-center`} />
        )}
      </>
    );
  }