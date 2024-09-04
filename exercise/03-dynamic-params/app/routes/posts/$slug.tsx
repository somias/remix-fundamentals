import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import { getPost } from "~/models/post.server";

export async function loader({ params }: LoaderArgs) {
  const post = await getPost(params.slug);
  return json(post);
}

export default function PostSlug() {
  const post = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(post?.markdown) }} />
    </main>
  );
}
