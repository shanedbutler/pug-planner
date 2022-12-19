import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const UnregisterModal = ({ open, setOpen, handleUnregister }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-md max-w-sm bg-white text-center shadow-xl transition-all">
                                <div className="bg-white px-7 py-4">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                                        <ExclamationCircleIcon
                                            className="h-7 w-7 text-red-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Are you sure you want to
                                                unregister?
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Upon clicking unregister you
                                                    will be removed from the
                                                    game list. If you decide to
                                                    re-register you will be
                                                    placed at the bottom of the
                                                    list.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-2 pt-3 pb-4 flex sm:px-6">
                                    <button
                                        type="button"
                                        className="rounded-md border border-transparent bg-red-100 py-2 px-4 mx-auto text-sm font-medium text-gray-700 shadow-sm hover:bg-red-200 focus:bg-red-200 hover:text-black focus:text-black"
                                        onClick={handleUnregister}
                                    >
                                        Unregister
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-md border border-transparent bg-lime-100 py-2 px-4 mx-auto text-sm font-medium text-gray-700 shadow-sm hover:bg-lime-200 focus:bg-lime-200 hover:text-black focus:text-black"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
