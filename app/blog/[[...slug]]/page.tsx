import BlogsList from "../../../components/Blogs";
import BlogDetail from "../../../components/BlogDetail";
import { notFound } from "next/navigation";
import blogData from "../../../data/blog-structure.json";

import { Metadata } from "next";

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

export default function Blogs({ params }: { params: { slug?: string[] } }) {
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
    const blog = blogData.find(item => item.url === blogUrlb);

    if (blog) {
      return (
        <div>
          <div className="mt-16">
            <BlogDetail blogId={blog.url} />
          </div>
        </div>
      );
    }
  }

  return notFound();
}
