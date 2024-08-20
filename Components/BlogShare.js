import { FaTwitter } from "react-icons/fa";

/**
 * @description Generates a Twitter share button for a blog post, allowing users to
 * tweet about it. It takes a `data` object as input and returns JSX for a button
 * that includes a link to the Twitter API with pre-filled text, URL, and hashtags.
 * 
 * @param {object} obj - Referred to as `data`. It contains several key-value pairs,
 * including `Title`, `Tags`, which are used to construct the Twitter share button's
 * link and text content.
 * 
 * @param {object} obj.data - Expected to hold blog data.
 * 
 * @returns {JSX.Element} A React element consisting of a div with a button that
 * contains a Twitter icon and a tweet sharing link. The link includes the title of
 * the blog post, its URL, and hashtags.
 */
function BlogShare({ data }) {
  return (
    <>
      <div className="text-center pb-4">
        <button className="bg-indigo-500 px-3 py-1 font-semibold text-white inline-flex items-center space-x-2 rounded">
          <FaTwitter />
          <a
            className="twitter-share-button"
            rel="noopener noreferrer"
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=${
              data.Title
            } by @austinL394
            &url=blogs.soumya-jit.tech/blogs/${String(
              data.Title.split(" ").join("-").toLowerCase()
            )}
            &hashtags=${data.Tags.split(" ")}`}
          >
            Tweet
          </a>
        </button>
      </div>
    </>
  );
}

export default BlogShare;
