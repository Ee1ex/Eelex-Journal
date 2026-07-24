import createMDX from "@next/mdx";

const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: ["rehype-slug"],
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
