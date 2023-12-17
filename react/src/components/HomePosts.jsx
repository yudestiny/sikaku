import { Chip, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"

export default function HomePosts({posts}) {

  const judgeIsNew = (dayOfCreate) => {
    const dateCreated = new Date(dayOfCreate);
    const today = new Date(Date.now());
    today.setDate(today.getDate()-30);
    return dateCreated.getTime() > today.getTime();
  }

  return (
    <div className="bg-gray-100 py-8 m-2 justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-4">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="flex gap-x-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">新規取得者たちの声</h2>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>

          </div>
          <p className="mt-2 sm:text-lg leading-8 text-gray-600">
            あなたがやることは勉強時間の確保だけ、<br />人生を変えよう
          </p>
        </div>
        <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 mt-4 pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 2xl:grid-cols-3 justify-center">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col justify-center relative bg-white shadow p-3 items-stretch text-">
              { judgeIsNew(post.created_at) && (
              <Chip color="amber" value="new" className="text-white absolute -top-1 -right-1 " />
              )}
              <div className="flex gap-x-4 text-xs">
                <time dateTime={post.created_at} className="text-gray-500">
                  {post.created_at}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {post.qualification_name}：<br/>{post.target}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
              </div>
              <div className=" mt-8 flex items-center justify-between gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {post.user_name}
                  </p>
                </div>
                <div className="text-end mr-4">
                  <Link to={`/posts/detail/${post.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:text-gray-400 absolute bottom-2 right-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    <div className="items-center">
      <Link to="/posts">
        <Typography
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 text-right">もっと見る→</Typography>
      </Link>
    </div>
    </div>
  )
}
