import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug, getRecentPosts } from "@/lib/blogsData";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | The Wolverines Field Hockey Club",
    };
  }

  return {
    title: `${post.title} | The Wolverines Field Hockey Club`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(slug);

  return (
    <main className="w-full min-h-screen bg-white text-neutral-900 py-8 sm:py-12 lg:py-16 select-none">
      {/* Self-contained animations for Blog Detail Page */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes blogDetailFadeIn {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-blog-detail-header {
              animation: blogDetailFadeIn 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
            }
            .animate-blog-detail-image {
              animation: blogDetailFadeIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
            }
            .animate-blog-detail-content {
              animation: blogDetailFadeIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
            }
          `,
        }}
      />

      <div className="site-container">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm mb-6 text-neutral-500 font-medium overflow-hidden text-ellipsis whitespace-nowrap animate-blog-detail-header">
          <Link
            href="/blogs"
            className="text-[#DE2027] hover:underline shrink-0"
          >
            Blogs
          </Link>
          <span className="text-neutral-400">&gt;</span>
          <span className="text-[#DE2027] truncate">
            {post.title}
          </span>
        </nav>

        {/* Blog Post Header Title with Vertical Red Gradient Bar */}
        <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8 animate-blog-detail-header">
          <div
            className="w-[8px] sm:w-[10px] h-[32px] sm:h-[38px] flex-shrink-0 mt-0.5"
            style={{
              background:
                "linear-gradient(180deg, #D32F2F 0%, #dc2626 22%, #f87171 65%, #ffffff 100%)",
            }}
          />
          <h1
            className="text-2xl sm:text-3xl lg:text-[38px] font-normal uppercase text-neutral-900 tracking-wide leading-tight"
            style={{
              fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
            }}
          >
            {post.title}
          </h1>
        </div>

        {/* Featured Main Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 mb-8 sm:mb-10 shadow-xs animate-blog-detail-image">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Article Body Content */}
        <article className="space-y-6 sm:space-y-8 text-neutral-700 animate-blog-detail-content">
          {post.sections.map((section, idx) => (
            <div key={idx}>
              {/* Section Heading */}
              {section.heading && (
                <h2
                  className={`text-xl sm:text-2xl lg:text-[26px] font-normal uppercase tracking-wide text-neutral-900 mt-8 sm:mt-12 mb-3.5 sm:mb-4 ${
                    section.isCentered ? "text-center" : "text-left"
                  }`}
                  style={{
                    fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                  }}
                >
                  {section.heading}
                </h2>
              )}

              {/* Section Paragraph */}
              {section.content && (
                <p className="text-xs sm:text-sm md:text-[14.5px] text-neutral-600 leading-relaxed sm:leading-[1.7] font-normal mb-4">
                  {section.content}
                </p>
              )}

              {/* Numbered Sub-items */}
              {section.items && (
                <div className="space-y-4 my-3">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx}>
                      <h3 className="font-bold text-xs sm:text-sm text-neutral-900 uppercase mb-1 tracking-wide">
                        {item.numberTitle}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-[14px] text-neutral-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Frequently Asked Questions */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="pt-6 sm:pt-8 border-t border-neutral-100 mt-10">
              <h2
                className="text-center text-xl sm:text-2xl lg:text-[26px] font-normal uppercase tracking-wide text-neutral-900 mb-6"
                style={{
                  fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                }}
              >
                FREQUENTLY ASKED QUESTION
              </h2>

              <div className="space-y-5">
                {post.faqs.map((faq, faqIdx) => (
                  <div key={faqIdx} className="space-y-1">
                    <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Recent Posts Section */}
        {recentPosts.length > 0 && (
          <section className="mt-14 sm:mt-18 pt-10 border-t border-neutral-200/80">
            {/* Recent Posts Heading */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div
                className="w-[6px] sm:w-[8px] h-[26px] sm:h-[32px] flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(180deg, #D32F2F 0%, #dc2626 22%, #f87171 65%, #ffffff 100%)",
                }}
              />
              <h2
                className="text-2xl sm:text-3xl font-normal uppercase text-neutral-900 tracking-wide leading-none"
                style={{
                  fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
                }}
              >
                RECENT POSTS
              </h2>
            </div>

            {/* 2-Column Cards Grid matching screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {recentPosts.map((rec) => (
                <Link
                  key={rec.id}
                  href={`/blogs/${rec.slug}`}
                  className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={rec.image}
                      alt={rec.title}
                      fill
                      loading="eager"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                    <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug line-clamp-1 group-hover:text-[#DE2027] transition-colors">
                      {rec.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
