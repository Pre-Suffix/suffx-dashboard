import { fetchEndpoint } from "@/utils/api";
import { headers } from "next/headers";
import Navbar from "../ui/navbar";
import Content from "../ui/content";

export default async function Dashboard() {
  const Headers = await headers();
  const status = await fetchEndpoint(Headers, "auth/status");
  
  if(status.error) return (
    <script>window.location.href = "/";</script>
  )

  return (
    <main className="w-screen h-screen">
      <div className="w-full flex-none drop-shadow-lg">
        <Navbar page="guilds" />
      </div>
      <div className="flex flex-col">
        <div className="flex grow h-full">
          <Content page="guilds" headers={Headers} />
        </div>
      </div>
    </main>
  );
}
