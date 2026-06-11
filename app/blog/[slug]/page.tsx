import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';

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
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const generateDescription = (content: string) => {
  return content.substring(0, 200) + '...';
};

async function getBlog(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data || data.status !== 'Published') {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getBlog(params.slug);

  if (!article) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: article.title,
    description: generateDescription(article.content),
    openGraph: {
      title: article.title,
      description: generateDescription(article.content),
      type: 'article',
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      authors: [article.author || 'Admin'],
      images: article.image_url ? [article.image_url] : ['/chamos-tech-logo.jpeg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: generateDescription(article.content),
      images: article.image_url ? [article.image_url] : ['/chamos-tech-logo.jpeg'],
    },
  };
}

export async function generateStaticParams() {
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug')
    .eq('status', 'Published');

  return blogs?.map((blog) => ({
    slug: blog.slug,
  })) || [];
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getBlog(params.slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: generateDescription(article.content),
    author: {
      "@type": "Person",
      name: article.author || 'Admin',
    },
    publisher: {
      "@type": "Organization",
      name: "Chamos Tech",
      logo: {
        "@type": "ImageObject",
        url: "https://chamostech.com/chamos-tech-logo.jpeg",
      },
    },
    datePublished: article.created_at,
    dateModified: article.updated_at,
    image: article.image_url || "https://chamostech.com/chamos-tech-logo.jpeg",
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="sticky top-0 z-50 w-full flex justify-center pointer-events-none bg-transparent">
        <div className="flex items-center justify-between px-6 py-3 transition-all duration-500 ease-in-out pointer-events-auto mt-4 w-full max-w-7xl bg-white/70 backdrop-blur-xl border border-white/40 rounded-full shadow-2xl py-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg">
              <Image
                src="/chamos-tech-logo.jpeg"
                alt="Chamos Tech Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-text-dark">
              CHAMOS<span className="text-primary-orange">TECH</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Link href="/#services" className="px-4 py-2 rounded-full text-text-dark transition-all hover:bg-primary-blue/10 hover:text-primary-blue">
              Services
            </Link>
            <Link href="/#specialties" className="px-4 py-2 rounded-full text-text-dark transition-all hover:bg-primary-blue/10 hover:text-primary-blue">
              Specialties
            </Link>
            <Link href="/#blog" className="px-4 py-2 rounded-full text-text-dark transition-all hover:bg-primary-blue/10 hover:text-primary-blue">
              Blog
            </Link>
          </nav>
          <Link href="/">
            <button className="bg-primary-blue text-white px-6 py-2 rounded-full font-medium hover:bg-primary-blue/90 transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <main className="flex-1">
        <article className="py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            {/* Back Button */}
            <Link href="/#blog" className="inline-flex items-center gap-2 text-primary-blue hover:text-primary-blue/80 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>

            {/* Article Header */}
            <div className="mb-10">
              <div className="text-gray-500 flex items-center gap-2 text-sm mb-4">
                <p>by {article.author || 'Admin'}</p>
                <div className="bg-gray-300 size-1 rounded-full" />
                <p>{formatDate(article.created_at)}</p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-text-dark mb-6">
                {article.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {generateDescription(article.content)}
              </p>
            </div>

            {/* Featured Image */}
            {article.image_url && (
              <div className="relative mb-12 rounded-3xl overflow-hidden h-96">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-blue prose-lg max-w-none text-gray-800">
              <div className="space-y-6">
                {article.content.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return <h2 key={idx} className="text-3xl font-bold tracking-tight mt-10 mb-6 text-text-dark">{line.slice(2)}</h2>;
                  }
                  if (line.startsWith('## ')) {
                    return <h3 key={idx} className="text-2xl font-bold tracking-tight mt-8 mb-4 text-text-dark">{line.slice(3)}</h3>;
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h4 key={idx} className="text-xl font-semibold mt-6 mb-3 text-text-dark">{line.slice(2, -2)}</h4>;
                  }
                  if (line.trim().startsWith('- ')) {
                    return <li key={idx} className="ml-6 mb-2 text-gray-700">{line.trim().slice(2)}</li>;
                  }
                  if (line.trim().length > 0) {
                    return <p key={idx} className="text-gray-700 leading-relaxed">{line}</p>;
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t bg-bg-dark py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-md">
                <Image
                  src="/chamos-tech-logo.jpeg"
                  alt="Chamos Tech Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-text-primary">
                CHAMOS<span className="text-primary-orange">TECH</span>
              </span>
            </div>
            <p className="text-sm text-text-secondary">
              © 2025 Chamos Tech. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
