import { fetchUserPosts } from '@/lib/actions/post-actions'
import { DEFAULT_PAGE_SIZE } from '@/lib/constants'
import NoPost from './_components/no-post'
import PostList from './_components/post-list'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
const Page = async ({ searchParams }: Props) => {
  const { page, pageSize } = await searchParams
  const { posts, totalPosts } = await fetchUserPosts({ page: page ? +page : 1, pageSize: DEFAULT_PAGE_SIZE })

  return (
    <div>
      {(!posts || posts.length === 0) ?
        <NoPost /> :
        <PostList
          posts={posts}
          currentPage={page ? +page : 1}
          totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
        />
      }
    </div>
  )
}

export default Page
