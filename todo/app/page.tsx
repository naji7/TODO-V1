"use client";

import Brand from "@/components/brand";
import { WalletButton } from "@/components/button";
import FeaturesCard from "@/components/cards/featuresCard";
import Image from "next/image";
import { MdManageHistory } from "react-icons/md";
import { SiNginxproxymanager } from "react-icons/si";
import { LuListTodo } from "react-icons/lu";
import { useDisclosure } from "@nextui-org/react";

import { SignUp } from "@/components/modals/signUp";
import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div className="homeBackground min-h-screen">
      <div className="mx-20">
        <div className="pt-6 h-16 mx-10 mx-auto flex justify-center justify-between ">
          <Brand />

          <WalletButton
            onClick={onOpen}
            // onClick={async()=>{
            //   // connectToDB()
            //   await connectMongo();
            // }}
            value={"Sign In"}
          />

          <SignUp isOpen={isOpen} close={onClose} onOpenChange={onOpenChange} />
        </div>
        <div className="pt-20 flex flex-col justify-center items-center">
          <div className="pt-20 flex flex-col items-center z-20 md:flex-row">
            <div className="text-center mb-12 md:text-left md:w-1/2 md:pr-10">
              <h1 className="text-6xl font-bold leading-snug">
                Organize your work and life, finally.
              </h1>
              <p className="leading-relaxed mb-10 text-lg text-slate-300">
                One simple to do list for you and your team Over 30 million
                people organize their tasks, lists and manage their team’s
                projects with TODO
              </p>
              <button className="bg-color-secondary px-9 py-3 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">
                Get Started - It's Free
              </button>
            </div>
            <div className="md:w-1/2">
              <img src="/images/wing.png" alt="" />
            </div>
          </div>

          <div className="py-20">
            <div className="pt-20 text-center m-auto mb-20 md:w-1/2">
              <h4 className="font-bold text-color-secondary mb-6">Capture</h4>
              <h1 className="text-3xl md:text-4xl font-bold leading-snug">
                “TODO makes it easy to go as simple or as complex as you want”
              </h1>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 lg:gap-8 px-4 sm:px-6 lg:px-8">
              <FeaturesCard
                icon={<MdManageHistory color="#ff7d3b" fontSize={"2.5em"} />}
                title="Organize everything in life"
                description={
                  "Whether there is a work-related task or a personal goal, TODO is here to help you manage all your to-dos."
                }
              />
              <FeaturesCard
                icon={<LuListTodo color="#ff7d3b" fontSize={"2.5em"} />}
                title="Keep track of everything"
                description={
                  "More to do than you can keep in your head? TODO makes it simple to capture tasks from anywhere."
                }
              />
              <FeaturesCard
                icon={
                  <SiNginxproxymanager color="#ff7d3b" fontSize={"2.5em"} />
                }
                title="Immutable Data"
                description={"Blockchain is being used by TODO to store data"}
              />
            </div>
          </div>

          <div className="container py-20">
            <div className="pt-20 text-center m-auto mb-20 md:w-1/2">
              <h4 className="font-bold text-color-secondary mb-6">
                How It Works
              </h4>
              <h1 className="text-3xl md:text-4xl font-bold leading-snug">
                Get started with just a few clicks
              </h1>
            </div>

            <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 md:space-x-6">
              <div className="text-center cursor-pointer">
                <div className="relative bg-gray-700 inline-block px-6 py-3 rounded-lg cursor-pointer">
                  <p className="font-bold text-6xl lg:after:content-[''] lg:after:flex lg:after:bg-[url('/images/line.png')] lg:after:absolute lg:after:top-4 lg:after:left-32 2xl:after:left-52 lg:after:bg-no-repeat lg:after:h-7 lg:after:w-52">
                    1
                  </p>
                </div>
                <h3 className="text-xl font-bold py-4 text-white">
                  Connect MetaMask
                </h3>
                <p className="text-slate-400">
                  Use your MetaMask wallet to authenticate
                </p>
              </div>
              <div className="text-center cursor-pointer">
                <div className="relative bg-color-secondary inline-block px-6 py-3 rounded-lg cursor-pointer">
                  <p className="font-bold text-6xl lg:after:content-[''] lg:after:flex lg:after:bg-[url('/images/line-bottom.png')] lg:after:absolute lg:after:top-4 lg:after:left-32 2xl:after:left-52 lg:after:bg-no-repeat lg:after:h-7 lg:after:w-52">
                    2
                  </p>
                </div>
                <h3 className="text-xl font-bold py-4 text-white">Add Tasks</h3>
                <p className="text-slate-400">
                  Use one click to add your tasks
                </p>
              </div>
              <div className="text-center cursor-pointer">
                <div className="relative bg-gray-700 inline-block px-6 py-3 rounded-lg cursor-pointer">
                  <p className="font-bold text-6xl">3</p>
                </div>
                <h3 className="text-xl font-bold py-4 text-white">
                  Manage Your Tasks
                </h3>
                <p className="text-slate-400">
                  You can add, complete, delete your tasks
                </p>
              </div>
            </div>
          </div>

          <div className="container py-20">
            <div className="pt-20 text-center m-auto mb-20 md:w-1/2">
              <h4 className="font-bold text-color-secondary mb-6">Tech Used</h4>
              <h1 className="text-3xl md:text-4xl font-bold leading-snug">
                Use with the tools you love
              </h1>
            </div>
            <div className="relative m-auto w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px]  before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:content-['']">
              <div className="animate-infinite-slider flex w-[calc(250px*10)] justify-between">
                <div className="slide flex w-[125px] items-center justify-center">
                  <img src="/images/next.png" alt="" />
                </div>
                <div className="slide flex w-[125px] items-center justify-center">
                  <img src="/images/node.png" alt="" />
                </div>
                <div className="slide flex w-[125px] items-center justify-center">
                  <img src="/images/react.png" alt="" />
                </div>
                <div className="slide flex w-[125px] items-center justify-center">
                  <img src="/images/solidity.png" alt="" />
                </div>

                <div className="slide flex w-[125px] items-center justify-center">
                  <img src="/images/next.png" alt="" />
                </div>
                <div className="slide flex w-[125px] items-center justify-center">
                  <img src="/images/node.png" alt="" />
                </div>
                <div className="slide flex w-[125px] items-center justify-center">
                  <img src="/images/react.png" alt="" />
                </div>
                <div className="slide flex w-[125px] items-center justify-center">
                  <img src="/images/solidity.png" alt="" />
                </div>
                {/* {LOGOS.map((logo, index) => (
                <div
                  className="slide flex w-[125px] items-center justify-center"
                  key={index}
                >
                  {logo}
                </div>
              ))} */}
              </div>
            </div>
          </div>

          <div className="container py-20">
            <div className="pt-20 text-center m-auto mb-20 md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold leading-snug text-color-secondary text-color-secondary pb-10">
                Ready to be more productive?
              </h1>
              <button className="bg-color-secondary px-9 py-3 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">
                Start for free
              </button>
            </div>
          </div>

          <span className="w-full p-0.5 bg-slate-900"></span>
          <p className="py-4 text-slate-500 font-bold text-lg">© 2023 TODO</p>
        </div>
      </div>
    </div>
  );
}
