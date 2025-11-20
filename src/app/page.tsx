import HomeScreen from "@/components/home/home-screen/HomeScreen";
import AuthScreen from "@/components/home/auth-screen/AuthScreen";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("THIS IS USER: ", user);

  return <main>{user ? <HomeScreen /> : <AuthScreen />}</main>;
}
