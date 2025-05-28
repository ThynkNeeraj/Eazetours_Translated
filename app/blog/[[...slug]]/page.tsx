import BlogsList from "../../../components/Blogs";
import BlogDetail from "../../../components/BlogDetail";
import { notFound } from "next/navigation";
import blogData from "../../../data/blog-structure.json";
import { Metadata } from "next";
import Script from "next/script";
import { IBlogDataType } from "../../../types/Common"; // adjust import path if needed

type Params = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const param = await props.params;
  const slug = param.slug;

  if (slug !== undefined && slug.length === 1) {
    const blogUrlb = slug[0];
    const blog = blogData.find(item => item.url === blogUrlb);

    if (blog) {
      return {
        title: blog.title,
        description: blog.description,
      };
    }
  }

  return {
    title: "Latest Blogs - Eaze Tours",
    description:
      "Discover the latest travel blogs and updates from Eaze Tours. Get insights, tips, and destination guides for your next adventure!",
  };
}

export default async function Blogs({ params }: { params: { slug?: string[] } }) {
  const { slug } = params;

  if (!slug) {
    return (
      <div>
        <div className="mt-16">
          <BlogsList />
        </div>
      </div>
    );
  } else if (slug.length === 1) {
    const blogUrlb = slug[0];
    const blog = blogData.find(item => item.url === blogUrlb) as IBlogDataType | undefined;

    if (blog) {
      const faqSchema =
        blog.faq && blog.faq.length > 0
          ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": blog.faq.map(faqItem => ({
                "@type": "Question",
                "name": faqItem.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faqItem.answer,
                },
              })),
            }
          : null;

      return (
        <>
          {faqSchema && (
            <Script
              id="blog-faq-schema"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          )}
          <div>
            <div className="mt-16">
              <BlogDetail blogId={blog.url} />
            </div>
          </div>
        </>
      );
    }
  }

  return notFound();
}
