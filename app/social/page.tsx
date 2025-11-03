import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users } from "lucide-react";
import SocialTabs from "@/components/SocialTabs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import FriendRequest from "@/models/FriendRequest";

async function getSocialData(userId: string) {
  await dbConnect();

  const friends = await User.findById(userId)
    .populate("friends", "name image email")
    .select("friends")
    .lean();

  const friendRequests = await FriendRequest.find({ toUser: userId, status: "pending" })
    .populate("fromUser", "name image email")
    .lean();

  return {
    friends: JSON.parse(JSON.stringify(friends?.friends || [])),
    friendRequests: JSON.parse(JSON.stringify(friendRequests)),
  };
}

export default async function SocialPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  const { friends, friendRequests } = await getSocialData(session.user.id);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Exploración Social</h1>
          <p className="text-muted-foreground">Conecta con otros fans de anime y manga</p>
        </div>
        <Users className="h-12 w-12 text-primary" />
      </div>
      <SocialTabs initialFriends={friends} initialFriendRequests={friendRequests} />
    </div>
  );
}
