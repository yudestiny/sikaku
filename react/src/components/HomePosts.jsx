import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"

export default function HomePosts({posts}) {

  return (
    <div className="bg-white py-12 sm:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">資格取得者たちの声</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            あなたがやることは勉強時間の確保だけ、人生を変えよう
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.created_at} className="text-gray-500">
                  {post.created_at}
                </time>
                {/* <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a> */}
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  {/* <a href=`posts/${post.id}`> */}
                    <span className="absolute inset-0" />
                    {post.qualification_name}：<br/>{post.target}
                  {/* </a> */}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {post.user_name}
                  </p>
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
