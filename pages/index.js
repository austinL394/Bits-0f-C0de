import Head from "next/head";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import BlogHeader from "../Components/BlogHeader";
import { getAllBlogPosts, getAllTopics } from "../Lib/Data";

/**
 * @description Initializes by retrieving lists of blog posts and topics using external
 * functions, then returns an object containing these lists as props to be statically
 * generated at build time.
 * 
 * @returns {object} Used to populate props for a React component. This object contains
 * two key-value pairs: "blogs" and "topics", where "blogs" and "topics" are arrays.
 */
export const getStaticProps = () => {
  const allBlogs = getAllBlogPosts();
  const allTopics = getAllTopics();
  return {
    props: {
      blogs: allBlogs,
      topics: allTopics,
    },
  };
};

/**
 * @description Renders a home page with metadata and content, including a navigation
 * bar (`Navbar`), header, blog headers (`BlogHeader`) for published blogs, and footer.
 * It accepts two props: `blogs`, an array of blog data, and `topics`, an array of
 * topic names.
 * 
 * @param {object} obj - Expected to contain two properties: `blogs` and `topics`.
 * The value of `blogs` is an array of blog objects, while `topics` likely contains
 * an array or other collection of topics related to software development.
 * 
 * @param {object} obj.blogs - Intended for rendering blog posts.
 * 
 * @param {object} obj.topics - Used to pass topics related to software development.
 * 
 * @returns {JSX.Element} A React component that consists of several elements: Head,
 * div with Navbar, Header, flex container with mapped blog posts, and Footer.
 */
export default function Home({ blogs, topics }) {
  return (
    <>
      <Head>
        <title>Bits-0f-C0de 🚀</title>
        <meta name="title" content="Bits-0f-C0de 🚀" />
        <meta
          name="description"
          content="Tech blogs and articles on various topics related to Software Development"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blogs.soumya-jit.tech/" />
        <meta property="og:title" content="Bits-0f-C0de 🚀" />
        <meta
          property="og:description"
          content="Tech blogs and articles on various topics related to Software Development"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/austinL394/Bits-0f-C0de/main/Extra/sc.png"
        />

      
      </Head>

      <div className="min-h-screen relative bg-white dark:bg-gray-900">
        <Navbar topics={topics} />
        <Header />

        <div className="px-0.5 md:px-7 pb-14 pt-6 mx-auto">
          <div className="flex flex-wrap">
            {blogs &&
              blogs.map(
                (blog) =>
                  blog.data.isPublished && (
                    <BlogHeader
                      key={blog.data.Id}
                      data={blog.data}
                      content={blog.content}
                      readTime={blog.readTime.text}
                    />
                  )
              )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
