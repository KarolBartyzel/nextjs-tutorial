import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Layout from "../../components/Layout";
import Date from "../../components/Date";
import { getAllPostIds, getPostData, TPost } from "../../lib/posts";

interface IPostProps {
  postData: TPost;
}

const Post = ({ postData }: IPostProps) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};

export default Post;
