import { Link } from "@remix-run/react";

export default function AdminCreateNewPostRoute() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post from admin route
      </Link>
    </p>
  );
}
