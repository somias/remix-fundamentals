import { Link, Outlet } from "@remix-run/react";

export default function Dashboard() {
  return (
    <div className="flex">
      <div className="mr-24">
        <h1>Hi, I'm dashboard!</h1>
        <Link to="first-dashboard">First dashboard</Link>
      </div>

      <Outlet />
    </div>
  );
}
