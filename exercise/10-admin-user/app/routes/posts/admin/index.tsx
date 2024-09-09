import { Link } from "@remix-run/react";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { requireAdminUser } from "~/session.server";

// 🐨 add a loader here so we can get the request
// 🐨 call requireAdminUser from session.server with the request
// 💰 return json({}) (you must return a response)
export async function loader({ request }: LoaderArgs) {
  await requireAdminUser(request);

  return json({});
}

export default function AdminIndex() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  );
}
