import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page"
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const HomePage = async () => {
  await delay(1000);

  return <div className="">Home Page</div>;
};

export default HomePage;
