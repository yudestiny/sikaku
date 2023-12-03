import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Posts({posts}) {

    return (
    <>
    <div className="ml-8">
      <Typography variant="h3">投稿一覧</Typography>
    </div>
    <div className="grid grid-cols-3">
    {posts.data?.map(post => (
    <Card key={post.id} className="m-6 w-96 col-span-1">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          {post.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to={`detail/${post.id}`}><Button>もっと見る</Button></Link>
      </CardFooter>
    </Card>
    ))}
    </div>
    </>
  );
}
