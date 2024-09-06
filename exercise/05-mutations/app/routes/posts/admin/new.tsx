// 🐨 implement the action function here.
// 1. accept the request object
// 2. get the formData from the request
// 3. get the title, slug, and markdown from the formData
// 4. call the createPost function from your post.model.ts
// 5. redirect to "/posts/admin".

import { LoaderArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/node";
import { createPost } from "~/models/post.server";
import { useActionData } from "@remix-run/react";

export async function action({ request }: LoaderArgs) {
  const formData = await request.formData();
  const title = formData.get("title");

  if (typeof title !== "string" || !title) {
    return json({ title: "Title is required" });
  }

  const slug = formData.get("slug");

  if (typeof slug !== "string" || !slug) {
    return json({ slug: "Slug is required" });
  }

  const markdown = formData.get("markdown");

  if (typeof markdown !== "string" || !markdown) {
    return json({ markdown: "Markdown is required" });
  }

  const newPost = await createPost(title, slug, markdown);
  return redirect(`/posts/${newPost.slug}`);
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
  const errors = useActionData();

  return (
    // 🐨 change this to a <Form /> component from @remix-run/react
    // 🐨 and add method="post" to the form.
    <form method="POST">
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" className={inputClassName} />
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" className={inputClassName} />
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={8}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
        {errors?.markdown ? (
          <em className="text-red-600">{errors.markdown}</em>
        ) : null}
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </form>
  );
}
