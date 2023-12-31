import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { SpinnerCircular } from "spinners-react";

// redux
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  deleteProduct,
  productSelector,
} from "../features/product/productSlice";

// importing icons
import { DeleteIcon, AlertIcon } from "../components/icons";

// iterfaces
import { Product } from "../types";

interface DeleteProductModalProps {
  product: Product;
}

const DeleteProductModal = (props: DeleteProductModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { product } = props;

  const selectedProducts = useAppSelector(productSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(selectedProducts.loading);
    setError(selectedProducts.error);
  }, [selectedProducts]);

  const handleDeleteProduct = () => {
    dispatch(deleteProduct({ _id: product._id }));
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

                  {!error && (
                    <div className="w-full border border-grey p-3 rounded-lg mt-3">
                      <p className="text-grey">{error}</p>
                    </div>
                  )}

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
                      className="flex justify-center items-center rounded-md border-2 border-blue bg-blue outline-none px-4 py-2 hover:bg-blue/75 hover:border-blue/75"
                      onClick={() => (handleDeleteProduct(), closeModal())}
                    >
                      {!loading ? (
                        <p className=" capitalize font-semibold text-white text-sm">
                          delete
                        </p>
                      ) : (
                        <SpinnerCircular
                          size={30}
                          thickness={180}
                          speed={100}
                          color="rgba(255, 255, 255, 1)"
                          secondaryColor="rgba(0, 0, 0, 0.01)"
                        />
                      )}
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
