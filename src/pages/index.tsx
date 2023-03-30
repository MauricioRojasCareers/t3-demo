import { type NextPage } from "next";

import { api } from "@/utils/api";
import { LoadingPage } from "@/components/loading";
import { CreatePostWizard } from "@/components/postWizard";
import Link from "next/link";
import { PageLayout } from "@/components/layout";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <LoadingPage />;

  if (!data) return <div>Something Went Wrong</div>;

  return (
    <>
      <PageLayout>
        <div className="flex border-b border-slate-400  p-8">
          <CreatePostWizard />
        </div>

        <div className="flex flex-col">
          {data.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <div className="relative flex flex-row border-b border-slate-400  p-8">
                {post.content}
              </div>
            </Link>
          ))}
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
