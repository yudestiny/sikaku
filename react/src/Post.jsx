import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Post({posts}) {
  // useEffect (() => {
  //   const fetchData = async() => {
  //     try {
  //       const response = await axiosClient.get(`posts/index`);
  //       setPosts(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchData();
  // },[])
  console.log(posts)
  return (
    <>
    <div className="ml-8">
      <Typography variant="h3">投稿一覧</Typography>
    </div>
    <div className="grid grid-cols-3">
    {posts.data?.map(post => (
    <Card id={post.id} className="m-6 w-96 col-span-1">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          {post.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>もっと見る</Button>
      </CardFooter>
    </Card>
    ))}
    </div>
    </>
  );
}
