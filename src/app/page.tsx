import Hero from '@/components/hero'
import Posts from '@/components/client/post/posts';
import { fetchPosts } from '@/lib/actions/post-actions';

export default async function Home() {
  const posts = await fetchPosts()

  return (
    <main>
      <Hero/>
      <Posts posts={posts} />
    </main>
  );
}
