import { posts } from '@/app/data/posts';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BlogPost({ params }: PageProps) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
} 