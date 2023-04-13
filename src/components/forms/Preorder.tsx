import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { api } from "@/utils/api";
import Toast from "@/components/Toast";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  closeModal: any;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Preorder({
  isOpen,
  setIsOpen,
  closeModal,
}: ModalProps) {
  const { mutateAsync: addPreorder } = api.database.addPreorder.useMutation();

  //   function closeModal() {
  //     setIsOpen(false);
  //     const scrollY = document.body.style.top;
  // document.body.style.position = '';
  // document.body.style.top = '';
  // window.scrollTo(0, parseInt(scrollY || '0') * -1);
  //   }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    (async () => {
      await addPreorder({
        name: data.name as string,
        email: data.email as string,
        quantity: Number(data.quantity),
        deliveryAddress: data.deliveryAddress as string,
        message: data.message as string,
      })
        .then((data) => {
          if ((data as string).includes("Error")) {
            toast.custom((t) => (
              <div className={t.visible ? "animate-enter" : "animate-leave"}>
                <Toast
                  title="Error"
                  message="Duplicate email address."
                  type="error"
                />
              </div>
            ));
          } else {
            toast.custom((t) => (
              <div className={t.visible ? "animate-enter" : "animate-leave"}>
                <Toast
                  title="Pre-order sent!"
                  message="Your pre-order has been sent successfully."
                  type="success"
                />
              </div>
            ));
          }

          closeModal();
        })
        .catch((e) => {
          toast.custom((t) => (
            <div className={t.visible ? "animate-enter" : "animate-leave"}>
              <Toast
                title="Error"
                message="An error occurred while sending your pre-order."
                type="error"
              />
            </div>
          ));

          console.error(e);
        });
    })().catch((e) => {
      console.error(e);
    });
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-20 mx-auto block  "
          onScroll={(e) => e.preventDefault()}
        >
          <div
            className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto block  bg-black bg-opacity-40"
            onClick={closeModal}
          >
          </div>
            <div className="absolute z-10 left-[50%] top-[50%] mx-auto block  w-full translate-x-[-50%] translate-y-[-50%]  bg-white">
              {/* <div className="flex min-h-full items-center justify-center text-center"> */}
                <div className="bg-primary-2 flex w-full max-w-lg transform flex-col items-start overflow-hidden rounded p-10 text-left transition-all">
                  <h1 className="text-center text-xl font-medium leading-6 text-white 2xl:text-2xl">
                    Pre-order
                  </h1>
                  <form
                    className="mt-4 flex w-full flex-col gap-y-2 p-1"
                    onSubmit={handleSubmit}
                  >
                    <input
                      required
                      name="name"
                      className="secondary-input"
                      placeholder="Name"
                      type="text"
                    />
                    <input
                      required
                      name="email"
                      className="secondary-input"
                      placeholder="Email"
                      type="email"
                    />
                    <input
                      required
                      name="quantity"
                      className="secondary-input"
                      placeholder="Quantity"
                      type="number"
                    />
                    <input
                      required
                      name="deliveryAddress"
                      className="secondary-input"
                      placeholder="Delivery Address"
                      type="text"
                    />
                    <textarea
                      required={false}
                      name="message"
                      placeholder="Message (optional)"
                      rows={5}
                    />
                    <button className="primary-button mt-2" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              {/* </div> */}
            </div>
        </div>
      )}
    </>
  );
  // return (
  //   <Transition appear show={isOpen} as={Fragment}>
  //     <Dialog as="div" className="relative z-[100] overflow-y-hidden" onClose={closeModal}>
  //       <Transition.Child
  //         as={Fragment}
  //         enter="ease-out duration-300"
  //         enterFrom="opacity-0"
  //         enterTo="opacity-100"
  //         leave="ease-in duration-200"
  //         leaveFrom="opacity-100"
  //         leaveTo="opacity-0"
  //       >
  //         <div className="fixed inset-0 bg-black bg-opacity-40" />
  //       </Transition.Child>

  //       <div className="fixed inset-0">
  //         <div className="flex min-h-full items-center justify-center text-center">
  //           <Transition.Child
  //             as={Fragment}
  //             enter="ease-out duration-300"
  //             enterFrom="opacity-0 scale-95"
  //             enterTo="opacity-100 scale-100"
  //             leave="ease-in duration-200"
  //             leaveFrom="opacity-100 scale-100"
  //             leaveTo="opacity-0 scale-95"
  //           >
  //             <Dialog.Panel className="bg-primary-2 flex w-full max-w-lg transform flex-col items-start overflow-hidden rounded p-10 text-left transition-all">
  //               <Dialog.Title className="text-center text-xl font-medium leading-6 text-white 2xl:text-2xl">
  //                 Pre-order
  //               </Dialog.Title>

  //               <form
  //                 className="mt-4 flex w-full flex-col gap-y-2"
  //                 onSubmit={handleSubmit}
  //               >
  //                 <input
  //                   required
  //                   name="name"
  //                   className="secondary-input"
  //                   placeholder="Name"
  //                   type="text"
  //                 />
  //                 <input
  //                   required
  //                   name="email"
  //                   className="secondary-input"
  //                   placeholder="Email"
  //                   type="email"
  //                 />
  //                 <input
  //                   required
  //                   name="quantity"
  //                   className="secondary-input"
  //                   placeholder="Quantity"
  //                   type="number"
  //                 />
  //                 <input
  //                   required
  //                   name="deliveryAddress"
  //                   className="secondary-input"
  //                   placeholder="Delivery Address"
  //                   type="text"
  //                 />
  //                 <textarea
  //                   required={false}
  //                   name="message"
  //                   placeholder="Message (optional)"
  //                   rows={5}
  //                 />
  //                 <button className="primary-button mt-2" type="submit">
  //                   Submit
  //                 </button>
  //               </form>
  //             </Dialog.Panel>
  //           </Transition.Child>
  //         </div>
  //       </div>
  //     </Dialog>
  //   </Transition>
  // );
}
