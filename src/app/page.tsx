import Hero from '@/components/layout/hero'
import Posts from '@/components/client/post/posts';
import { fetchPosts } from '@/lib/actions/post-actions';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import { getUserFromCookie } from '@/lib/auth-cookie';

type Props = {
  searchParams: Promise<{ [key: string]: string|string[]|undefined }>
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams
  const { posts, totalPosts } = await fetchPosts({ page: page ? +page : undefined})

  const userInfo = await getUserFromCookie()

  return (
    <main>
      <Hero/>
      <Posts
        posts={posts}
        currentPage={page ? +page : 1}
        totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
      />
    </main>
  );
}
