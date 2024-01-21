import { UserCircleIcon } from "@heroicons/react/24/outline";

export function ProfileImg({img}) {
    return (
      <>
        {img ? (
          <img
            className="h-12 w-12 rounded-full object-cover object-center"
            src={img}
            alt="nature image"
          />
        ):(
          <UserCircleIcon className="text-gray-600 h-12 w-12 rounded-full object-cover object-center" />
        )}
      </>
    );
  }