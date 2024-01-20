import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Posts({posts}) {
    console.log(posts)
    return (
    <>
    
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center mb-8">
    {posts.data?.map(post => (
    <Card key={post.id} className="m-6 w-80 2xl:w-96 col-span-1 justify-center mx-auto">
      <CardBody className="bg-cover">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {post.qualification_name}
        </Typography>
        <Typography>
          {post.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-center justify-between">
        <Link to={`detail/${post.id}`}><Button>もっと見る</Button></Link>
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-1 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span>{post.favorites ? (post.favorites.length):("")}</span>
        </div>
      </CardFooter>
    </Card>
    ))}
    </div>
    </>
  );
}
