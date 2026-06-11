'use client';
import React, { useState, useEffect } from 'react';
import { LazyImage } from './lazy-image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Blog {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  author?: string;
  status: "Draft" | "Published";
  created_at: string;
  updated_at: string;
  slug: string;
  description?: string;
}

export function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'Published')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogs(data || []);
    } catch (err: any) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const generateDescription = (content: string) => {
    return content.substring(0, 150) + '...';
  };

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="space-y-4 mb-12">
            <h2 className="text-sm font-bold tracking-wider text-primary-blue uppercase">From Our Blog</h2>
            <h3 className="text-5xl font-bold tracking-tighter text-text-dark sm:text-6xl">
              Industry Insights & Resources
            </h3>
          </div>
          <div className="flex justify-center py-12">
            <div className="text-gray-500">Loading blogs...</div>
          </div>
        </div>
      </section>
    );
  }

	return (
		<section className="py-24 bg-white">
			<div className="mx-auto w-full max-w-7xl px-4 md:px-6">
				<div className="space-y-4 mb-12">
					<h2 className="text-sm font-bold tracking-wider text-primary-blue uppercase">From Our Blog</h2>
					<h3 className="text-5xl font-bold tracking-tighter text-text-dark sm:text-6xl">
						Industry Insights & Resources
					</h3>
					<p className="max-w-[800px] text-gray-600 text-lg">
						Deep dives into the systems we build and the industries we serve.
					</p>
				</div>
        {blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No blogs published yet!
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 z-10">
            {blogs.map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.id}
                className="group hover:bg-gray-50 active:bg-gray-100 flex flex-col gap-4 rounded-2xl p-3 duration-150 transition-all border border-transparent hover:border-gray-200"
              >
                <LazyImage
                  src={blog.image_url || "/business-management-system.jpeg"}
                  fallback="/business-management-system.jpeg"
                  inView={true}
                  alt={blog.title}
                  ratio={16 / 9}
                  className="transition-all duration-500 group-hover:scale-[1.02]"
                />
                <div className="space-y-3 px-1 pb-2">
                  <div className="text-gray-500 flex items-center gap-2 text-xs sm:text-sm">
                    <p>by {blog.author || 'Admin'}</p>
                    <div className="bg-gray-300 size-1 rounded-full" />
                    <p>{formatDate(blog.created_at)}</p>
                  </div>
                  <h2 className="line-clamp-2 text-xl leading-7 font-bold tracking-tight text-text-dark">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                    {generateDescription(blog.content)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
			</div>
		</section>
	);
}
