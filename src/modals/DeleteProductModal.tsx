import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import axios from "axios";

// importing icons
import { DeleteIcon, AlertIcon } from "../components/icons";

// backend url
import { BASE_URL } from "../config/apiConfig";

// iterfaces
import { Product } from "../types";

interface DeleteProductModalProps {
  product: Product;
}

const DeleteProductModal = (props: DeleteProductModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { product } = props;

  const deleteProduct = async () => {
    setLoading(true);
    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}products/${product._id}`,
      // headers: {
      //   Authorization: `Bearer ${getAccess()}`,
      // },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response.data.product);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal} className="">
        <DeleteIcon />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-blue/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Modal
                  </Dialog.Title> */}
                  <div className="mt-2 flex flex-col items-center justify-center">
                    <AlertIcon />
                    <p className="text-center uppercase font-bold">
                      are you sure?
                    </p>
                    <p className="text-center font-semibold text-sm mt-3">
                      You will not be able to undo this action if you proceed!
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-5">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border-2 border-blue outline-none px-4 py-2 text-sm hover:bg-dark/10 capitalize font-semibold"
                      onClick={closeModal}
                    >
                      cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border-2 border-blue bg-blue outline-none px-4 py-2 text-sm text-white hover:bg-blue/75 capitalize font-semibold"
                      onClick={() => (deleteProduct(), closeModal())}
                    >
                      delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteProductModal;
