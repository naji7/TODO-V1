"use client";

import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  startTransition,
  Fragment,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TODO_ADD,
  TODO_ONCHANGE,
  TODO_ADD_ALL_TASKS,
} from "../../redux/actions";
import { ethers } from "ethers";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Skeleton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { TaskCard } from "@/components/cards/taskCard";
import { AddTaskModal } from "@/components/modals/addTask";
import { ABI, CONTRACT_ADDRESS } from "@/utils/abi";
import Lottie from "lottie-react";
import lottieBlock from "../../public/lotties/lottieBlock.json";
import LoadingModal from "@/components/modals/loading";
import { IoIosAddCircle } from "react-icons/io";
import { IconButton } from "@/components/button";
import TaskCardSkeleton from "@/components/skeleton/taskCardSkeleton";
import ItemNotFound from "@/components/cards/itemNotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SuccessMessage, ErrorMessage } from "@/components/alert/messages";
import Brand from "@/components/brand";
import { PopoverDropdown } from "@/components/popover/popover";
import "../../styles/global.css";

declare var window: any;

// gets a prop from getServerSideProps
export default function Tasks() {
  const storedTasks = useSelector((state: any) => state.tasks);

  // const count = useSelector(selectCount)
  const dispatch = useDispatch();
  const [walletBalance, setWalletBalance] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [provider, setProvider] = useState() as any;
  const [contract, setContract] = useState() as any;
  const [taskCount, setTaskCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const notify = () => toast("Your task has been successfully created.");

  const fetchBlockchainData = async () => {
    // console.log("count ," count);
    try {
      setIsPageLoading(true);
      // load web3
      const provider: any = new ethers.BrowserProvider(window.ethereum);
      await provider.getCode(CONTRACT_ADDRESS);
      setProvider(provider);
      const network = await provider.getNetwork();

      // load contract
      const toDoContract: any = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        provider
      );
      setContract(toDoContract);

      await getAllTasks(toDoContract);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTasks = async (contractData: any) => {
    const taskCountInBigNumber = await contractData.taskCount();

    const taskCount = Number(taskCountInBigNumber);
    // const taskCount = taskCountInBigNumber.toNumber();
    setTaskCount(taskCount);

    const tasks: any = [];
    for (var i = 1; i <= taskCount; i++) {
      const task = await contractData.tasks(i);
      const obj = {
        content: task.content,
        createdDate: task.createdDate,
        id: task.id,
        completed: task.completed,
        completedDate: task.completedDate,
      };
      tasks.push(obj);
    }

    dispatch({
      type: TODO_ADD_ALL_TASKS,
      payload: tasks,
    });

    setTasks(tasks);
    setFilteredTasks(tasks);
    setIsPageLoading(false);
  };

  const addTask = async (data: string) => {
    try {
      // add task
      const signer = await provider?.getSigner();
      let transaction = await contract?.connect(signer).createTask(data);
      setIsLoading(true);
      onClose();
      let response = await transaction.wait();
      if (response) {
        dispatch({
          type: TODO_ADD,
          payload: {
            content: data,
          },
        });

        await getAllTasks(contract);
        setIsLoading(false);
        SuccessMessage({
          message: `Your ${data} task has been successfully created.`,
        });
      }
    } catch (error) {
      ErrorMessage({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  const filterTasks = (status: string) => {
    var filtTasks: any = storedTasks;
    if (status === "all") {
      filtTasks = storedTasks;
    } else if (status === "pending") {
      filtTasks = storedTasks.filter((e: any) => {
        console.log("e : ", e);
        return e.completed === false;
      });
    } else if (status === "completed") {
      filtTasks = storedTasks.filter((e: any) => {
        return e.completed === true;
      });
    }

    setFilteredTasks(filtTasks);
  };

  const completeTask = async (id: number) => {
    try {
      const signer = await provider.getSigner();
      let transaction = await contract.connect(signer).completeTask(id);
      setIsLoading(true);
      const response = await transaction.wait();
      if (response) {
        dispatch({
          type: TODO_ONCHANGE,
          payload: {
            id: id,
          },
        });
        await getAllTasks(contract);
        await filterTasks(activeFilter);
        setIsLoading(false);
        SuccessMessage({
          message: `Your have successfully completed the task.`,
        });
      }
    } catch (error) {
      console.log("error : ", error);
      ErrorMessage({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const signer = await provider.getSigner();
      let transaction = await contract.connect(signer).deleteTask(id);
      setIsLoading(true);
      const response = await transaction.wait();
      if (response) {
        await getAllTasks(contract);
        await filterTasks(activeFilter);
        setIsLoading(false);
        SuccessMessage({
          message: `task has been successfully deleted.`,
        });
      }
    } catch (error) {
      console.log("error");
      ErrorMessage({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockchainData();
  }, []);

  return (
    <Fragment>
      {" "}
      {isLoading && <LoadingModal isOpen={isLoading} />}
      <ToastContainer />
      <div className="bg-color-dark min-h-screen">
        <div className="px-20 py-10">
          <div className="flex justify-between ">
            <Brand />
            <PopoverDropdown
              onclick={() => {
                // signOut({ redirect: "/" } as any);
              }}
              address={"0x782349234345324"}
              walletBalance={walletBalance.slice(0, 10)}
            />
          </div>
          <h1 className="mt-10 flex justify-center font-bold text-4xl text-gray-400">
            Todo-list
          </h1>

          <div className="flex justify-center flex-col items-center">
            <div className="flex mt-10 w-1/2 justify-between items-center">
              <Button
                color="primary"
                className="my-3 bg-orange-500 px-9 py-3 text-white rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200 tracking-wide"
                onPress={onOpen}
              >
                ADD TASK
              </Button>

              <AddTaskModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onclick={(e: any) => {
                  addTask(e);
                }}
              />

              <Tabs
                aria-label="Options"
                color="warning"
                // selectedKey={selected}
                classNames={{
                  tabList: "bg-gray-700",
                  tabContent: "text-white",
                }}
                onSelectionChange={(status: any) => {
                  setActiveFilter(status);
                  filterTasks(status);
                }}
              >
                <Tab key="all" title="All"></Tab>
                <Tab key="pending" title="Pending"></Tab>
                <Tab key="completed" title="Completed"></Tab>
              </Tabs>
            </div>

            <div className="flex mt-10 w-1/2 justify-between rounded-lg bg-gray-700 shadow-2xl">
              <div className="px-5 py-5 w-full">
                {(() => {
                  if (isPageLoading) {
                    return <TaskCardSkeleton />;
                  } else if (filteredTasks.length === 0) {
                    return (
                      <div className="flex justify-center">
                        <ItemNotFound />
                      </div>
                    );
                  } else if (filteredTasks.length !== 0 && !isPageLoading) {
                    return (
                      <div className="grid gap-y-3">
                        {filteredTasks.map((task: any, index: any) => {
                          return (
                            <TaskCard
                              key={index}
                              value={task.content}
                              createdAt={Number(task.createdDate)}
                              id={Number(task.id)}
                              onChecked={(id: number) => {
                                completeTask(id);
                              }}
                              isCompleted={task.completed}
                              onDelete={(id: number) => {
                                deleteTask(id);
                              }}
                              completedDate={Number(task.completedDate)}
                            />
                          );
                        })}
                      </div>
                    );
                  }
                })()}
                <></>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
