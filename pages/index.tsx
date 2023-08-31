import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Date from "../components/Date";
import Layout, { siteTitle } from "../components/Layout";
import { getSortedPostsData, TPost } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";

interface IHomeProps {
  allPostsData: TPost[];
}

const Home = ({ allPostsData }: IHomeProps) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I am Name Surname and I am X years old.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.log(context);
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// };

export default Home;
