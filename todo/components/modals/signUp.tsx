import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { TextField } from "../textField";

type SignUpProps = {
  isOpen: boolean;
  onOpenChange: any;
  onclick: Function;
};

export const SignUp = (props: SignUpProps) => {
  const { isOpen, onOpenChange, onclick } = props;
  const [currentTab, setCurrentTab] = useState("signin");

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      //   size={"sm"}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-gray-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
          {
            currentTab === "signin" ? <><ModalHeader className="flex flex-col gap-1">Add TODO</ModalHeader>
            <ModalBody>
              <div>
              <TextField value = {"Email"} id={"email"} type={"email"} placeHolder={"Enter email"} onChange={()=>{console.log("haii")}} />
              &nbsp;
              <TextField value = {"Password"} id={"password"}type={"password"}  placeHolder={"Enter password"} onChange={()=>{console.log("haii")}} />
              </div>
            </ModalBody>
            &nbsp;
           <a className="md:decoration-blue-400 decoration-zinc-950 text-sky-700 flex justify-center cursor-pointer hover:text-sky-500" onClick={()=>{setCurrentTab("signout")}}>Don't you have an account</a>
           &nbsp;
           <div className="flex justify-center ">
           <Button
                color="primary"
                className="bg-orange-500 px-9 py-3 text-white rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200 tracking-wide"
                // onPress={onOpen}
              >
                SIGN IN
              </Button>
           </div>
           
            <ModalFooter>
              
            </ModalFooter></> : <><ModalHeader className="flex flex-col gap-1">Add TODO</ModalHeader>
            <ModalBody>
              <div>
              <TextField value = {"Alias"} id={"alias"} type={"text"} placeHolder={"Enter alias"} onChange={(e)=>{console.log(e.target.value)}} />
              &nbsp;
              <TextField value = {"Email"} id={"email"} type={"email"} placeHolder={"Enter email"} onChange={()=>{console.log("haii")}} />
              &nbsp;
              <TextField value = {"Password"} id={"password"}type={"password"}  placeHolder={"Enter password"} onChange={()=>{console.log("haii")}} />
              </div>
            </ModalBody>
            &nbsp;
           <a className="md:decoration-blue-400 decoration-zinc-950 text-sky-700 flex justify-center cursor-pointer hover:text-sky-500" onClick={()=>{setCurrentTab("signin")}}>You already have an account</a>
           &nbsp;
           <div className="flex justify-center ">
           <Button
                color="primary"
                className="bg-orange-500 px-9 py-3 text-white rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200 tracking-wide"
                // onPress={onOpen}
              >
                SIGN UP
              </Button>
           </div>
           
            <ModalFooter>
              
            </ModalFooter></>
          }
            
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
