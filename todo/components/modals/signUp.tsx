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
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "../textField";
// import { ErrorMessage, SuccessMessage } from "../alert/messages";
import { ErrorMessage, SuccessMessage } from "@/components/alert/messages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADD_USER_DETAILS } from "./../../redux/actions/index";

type SignUpProps = {
  isOpen: boolean;
  onOpenChange: any;
  close: Function;
};

export const SignUp = (props: SignUpProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpenChange, close } = props;
  const [currentTab, setCurrentTab] = useState<string>("signin");
  const [alias, setAlias] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogin = async () => {
    try {
      const loginResponse = await axios.post("api/auth/login", {
        email,
        password,
      });
      if (loginResponse?.status === 201) {
        close();
        router.push("/tasks");
      }
    } catch (error: any) {
      if (error?.response) {
        ErrorMessage({ message: error?.response?.data?.msg });
      } else {
        ErrorMessage({ message: "Something went wrong" });
      }
    } finally {
    }
  };

  const onSignUp = async () => {
    try {
      const signUpResponse = await axios.post("api/auth/signup", {
        alias,
        email,
        password,
        redirect: false,
      });

      if (signUpResponse?.status === 201) {
        close();
        router.push("/tasks");
      }
    } catch (error: any) {
      if (error?.response) {
        ErrorMessage({ message: error?.response?.data?.msg });
      } else {
        ErrorMessage({ message: "Something went wrong" });
      }
    } finally {
    }
  };

  const nullTab = async () => {
    setAlias("");
    setEmail("");
    setPassword("");
  };

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
            <ToastContainer />
            {currentTab === "signin" ? (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  SIGN IN
                </ModalHeader>
                <ModalBody>
                  <div>
                    <TextField
                      value={"Email *"}
                      id={"email"}
                      type={"email"}
                      placeHolder={"Enter email"}
                      onChange={(e: any) => {
                        setEmail(e.target.value);
                      }}
                    />
                    &nbsp;
                    <TextField
                      value={"Password *"}
                      id={"password"}
                      type={"password"}
                      placeHolder={"Enter password"}
                      onChange={(e: any) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </ModalBody>
                &nbsp;
                <a
                  className="md:decoration-blue-400 decoration-zinc-950 text-sky-700 flex justify-center cursor-pointer hover:text-sky-500"
                  onClick={() => {
                    nullTab();
                    setCurrentTab("signout");
                  }}
                >
                  Don't you have an account
                </a>
                &nbsp;
                <div className="flex justify-center ">
                  <Button
                    color="primary"
                    className="bg-orange-500 px-9 py-3 text-white rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200 tracking-wide"
                    onPress={onLogin}
                  >
                    SIGN IN
                  </Button>
                </div>
                <ModalFooter></ModalFooter>
              </>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  SIGN UP
                </ModalHeader>
                <ModalBody>
                  <div>
                    <TextField
                      value={"Alias *"}
                      id={"alias"}
                      type={"text"}
                      placeHolder={"Enter alias"}
                      onChange={(e: any) => {
                        setAlias(e.target.value);
                      }}
                    />
                    &nbsp;
                    <TextField
                      value={"Email *"}
                      id={"email"}
                      type={"email"}
                      placeHolder={"Enter email"}
                      onChange={(e: any) => {
                        setEmail(e.target.value);
                      }}
                    />
                    &nbsp;
                    <TextField
                      value={"Password *"}
                      id={"password"}
                      type={"password"}
                      placeHolder={"Enter password"}
                      onChange={(e: any) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </ModalBody>
                &nbsp;
                <a
                  className="md:decoration-blue-400 decoration-zinc-950 text-sky-700 flex justify-center cursor-pointer hover:text-sky-500"
                  onClick={() => {
                    nullTab();
                    setCurrentTab("signin");
                  }}
                >
                  You already have an account
                </a>
                &nbsp;
                <div className="flex justify-center ">
                  <Button
                    color="primary"
                    className="bg-orange-500 px-9 py-3 text-white rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200 tracking-wide"
                    onPress={onSignUp}
                  >
                    SIGN UP
                  </Button>
                </div>
                <ModalFooter></ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
