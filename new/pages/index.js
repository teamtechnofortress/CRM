import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import ViewerHome from "@/components/viewer/home";
import axios from 'axios';
import { useRouter } from 'next/router';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const router = useRouter();


  const logout = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/logout`);
    console.log('API Response logout:', response);
    if (response.data.status === "success") {

      alert("User logout successfully");
      router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);


    }else{
      alert("User logout error");

    }

  };

  return (
    <>
    <div>
      <button onClick={logout}>Logout</button>
    </div>

      <ViewerHome />
    </>
  );
}
