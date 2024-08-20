import { getAllBlogPosts, getAllTopics } from "../../Lib/Data";
import { serialize } from "next-mdx-remote/serialize";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Head from "next/head";
import BlogInner from "../../Components/BlogInner";
import BlogShare from "../../Components/BlogShare";
import Comments from "../../Components/Comments";
import { SWRConfig } from "swr";
import { remarkHeadingId } from "remark-custom-heading-id";
import { getHeadings } from "../../Lib/GetHeadings";
import LikeBtn from "../../Components/LikeBtn";

/**
 * @description Generates static paths for a Next.js page, which are used to pre-render
 * pages at build time. It retrieves all blog posts, extracts the title, converts it
 * to a valid URL slug, and maps them into an array of objects defining the paths.
 * 
 * @returns {any} An object containing two properties: `paths` and `fallback`. The
 * `paths` property holds an array of objects, each with a `params` property containing
 * an object with a single key-value pair (`id`) mapped from the input `allBlogs`.
 */
export const getStaticPaths = () => {
  const allBlogs = getAllBlogPosts();
  return {
    paths: allBlogs.map((blog) => ({
      params: {
        id: String(blog.data.Title.split(" ").join("-").toLowerCase()),
      },
    })),
    fallback: false,
  };
};

/**
 * @description Retrieves blog posts and topics, filters a specific page based on the
 * URL parameter, serializes its content with metadata, and returns props to be
 * pre-rendered at build time, including the filtered page's data, content, ID,
 * headings, and all topics.
 * 
 * @param {any} context - Used to pass route parameters.
 * 
 * @returns {object} Composed of five properties: `data`, `content`, `id`, `headings`,
 * and `topics`.
 */
export const getStaticProps = async (context) => {
  const params = context.params;
  const allBlogs = getAllBlogPosts();
  const allTopics = getAllTopics();

  const page = allBlogs.find(
    (blog) =>
      String(blog.data.Title.split(" ").join("-").toLowerCase()) === params.id
  );

  const { data, content } = page;
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: { remarkPlugins: [remarkHeadingId] },
  });

  const headings = await getHeadings(content);

  return {
    props: {
      data: data,
      content: mdxSource,
      id: params.id,
      headings: headings,
      topics: allTopics,
    },
  };
};

/**
 * @description Renders a blog page, including metadata in the HTML head, and a layout
 * consisting of a navigation bar, main content, like button, share button, comments
 * section, and footer. The content is rendered conditionally based on the provided
 * data.
 * 
 * @param {object} obj - 5-tuple, comprising five properties: data, content, id,
 * headings, and topics. Each property corresponds to a distinct piece of information
 * that will be used within the function's JSX return statement.
 * 
 * @param {any} obj.data - Used to contain metadata for rendering the blog page.
 * 
 * @param {string} obj.content - Used for rendering blog content.
 * 
 * @param {string} obj.id - Used to identify specific content.
 * 
 * @param {object} obj.headings - Used to render blog headings.
 * 
 * @param {object} obj.topics - Used to render navigation topics on the page.
 * 
 * @returns {JSX.Element} A React component that consists of two main elements:
 * `<Head>` and a container `<div>`. The `<div>` contains various child components
 * such as `<Navbar>`, `<BlogInner>`, `<LikeBtn>`, etc.
 */
function id({ data, content, id, headings, topics }) {
  return (
    <>
      <Head>
        <title>{data.Title}</title>
        <meta name="title" content={data.Title} />
        <meta name="description" content={data.Abstract} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blogs.soumya-jit.tech/" />
        <meta property="og:title" content={data.Title} />
        <meta property="og:description" content={data.Abstract} />
        <meta
          property="og:image"
          content={`https://raw.githubusercontent.com/austinL394/Bits-0f-C0de/main/public${data.HeaderImage}`}
        />

      </Head>

      <div className="min-h-screen relative bg-white dark:bg-gray-900">
        <Navbar topics={topics} />
        <div className="py-24">
          <BlogInner data={data} content={content} headings={headings} />
          <LikeBtn id={id} />
          <BlogShare data={data} />

          <SWRConfig>
            <Comments id={id} />
          </SWRConfig>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default id;
