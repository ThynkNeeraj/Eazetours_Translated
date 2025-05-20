import React from "react";
import Image from "next/image";
import blogStructure from "../data/blog-structure.json";
import {
  IBlogDataType,
  IBlogLink,
  IBlogLinks,
  IBlogSection,
  IBlogBulletPoint,
  IBlogSubheading,
} from "../types/Common";

interface BlogDetailProps {
  blogId?: string;
}

const renderContent = (content: string, links?: IBlogLinks) => {
  if (!links || links.length === 0) return content;

  const parts = content.split(/({{LINK:[^:]+:[^}]+}})/g);
  return parts.map((part, index) => {
    const match = part.match(/{{LINK:([^:]+):([^}]+)}}/);
    if (match) {
      const [, linkKey, text] = match;
      const link = links.find(l => l.key === linkKey);
      if (link) {
        return (
          <a key={index} href={link.url} className="text-[#025C7A] font-semibold">
            {text}
          </a>
        );
      }
    }
    return <span key={index}>{part}</span>;
  });
};

const isContentSection = (section: IBlogSection): section is IBlogSection & { content: string } => {
  return "content" in section;
};

const isBulletPointsSection = (
  section: IBlogSection
): section is IBlogSection & { bullet_points: (string | IBlogBulletPoint)[] } => {
  return "bullet_points" in section;
};

const isSubheadingsSection = (
  section: IBlogSection
): section is IBlogSection & { subheadings: IBlogSubheading[] } => {
  return "subheadings" in section;
};

const isBulletPoint = (point: string | IBlogBulletPoint): point is IBlogBulletPoint => {
  return typeof point === "object" && "content" in point;
};

export default function BlogDetail({ blogId }: BlogDetailProps) {
  const blog = blogStructure.find(item => item.url === blogId) as IBlogDataType | undefined;

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="mt-[78px] sm:mt-[165px] mx-auto mb-12 max-w-[1200px] w-full px-4">
      <div className="py-6">
        <h1 className="text-[30px] text-left font-semibold mb-8 sm:text-[45px]">
          {blog.page_heading}
        </h1>

        {/* Hero Image */}
        <div className="relative w-full h-[200px] h-[250px] sm:h-[600px] rounded-[40px] overflow-hidden shadow-[0px_0px_2px_1px_#00000040] mb-8">
          <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            {renderContent(blog.structure.introduction.content, blog.structure.introduction.links)}
          </p>
        </div>

        {/* Main Sections */}
        {blog.structure.main_sections.map((section, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>

            {isContentSection(section) && (
              <div className="prose prose-lg max-w-none mb-6">
                <p>{renderContent(section.content, section.links)}</p>
              </div>
            )}

            {isBulletPointsSection(section) && (
              <ul className="list-disc pl-6 space-y-4">
                {section.bullet_points.map((point, pointIndex) => (
                  <li key={pointIndex} className="prose prose-lg max-w-none">
                    {isBulletPoint(point) ? (
                      <>
                        <strong>{point.title}</strong>
                        <p>{renderContent(point.content, section.links)}</p>
                      </>
                    ) : (
                      <span>{renderContent(point, section.links)}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {isSubheadingsSection(section) && (
              <div className="space-y-6">
                {section.subheadings.map((subheading, subIndex) => (
                  <div key={subIndex}>
                    <h3 className="text-xl font-semibold mb-2">{subheading.title}</h3>
                    <p className="prose prose-lg max-w-none">{subheading.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Conclusion */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">{blog.structure.conclusion.heading}</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              {renderContent(blog.structure.conclusion.content, blog.structure.conclusion.links)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
