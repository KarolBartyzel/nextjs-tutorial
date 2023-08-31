import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export type TPostHead = {
  id: string;
  date: string;
  title: string;
};

export type TPost = TPostHead & {
  contentHtml: string;
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as TPost;
};

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(
      path.join(postsDirectory, fileName),
      "utf8"
    );
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    } as TPostHead;
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};
