import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPositions } from '../managers/PositionManager';
import { login, registerUser } from '../managers/UserManager';

export const Register = () => {
    const navigate = useNavigate();

    const [positions, setPositions] = useState([]);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const primaryRef = useRef();
    const secondaryRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        let newUser = {};

        if (primaryRef.current.value === 'none') {
            //handlePrimaryRequired();
        } else if (secondaryRef.current.value === 'none') {
            //handleSecondaryRequired();
        } else {
            newUser = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                primaryPositionId: parseInt(primaryRef.current.value),
                secondaryPositionId: parseInt(secondaryRef.current.value),
            };
            registerUser(newUser)
                .then((user) => login(user.email))
                .then(() => navigate('/'));
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    const getPositions = () => {
        fetchPositions().then((pos) => setPositions(pos));
    };

    useEffect(() => {
        getPositions();
    }, []);

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-xl space-y-8">
                    <div className="mt-10 sm:mt-0">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0 text-center">
                                <h3 className="text-3xl font-medium leading-6 text-gray-900">
                                    Register
                                </h3>
                                <p className="mt-3 text-sm text-gray-600">
                                    All information is required
                                </p>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-6 mt-5">
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form onSubmit={handleSubmit}>
                                    <div className="overflow-hidden shadow rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        First name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        required
                                                        ref={firstNameRef}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="last-name"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Last name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="family-name"
                                                        required
                                                        ref={lastNameRef}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-6">
                                                    <label
                                                        htmlFor="email-address"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Email address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email-address"
                                                        id="email-address"
                                                        autoComplete="email"
                                                        required
                                                        ref={emailRef}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-6">
                                                    <label
                                                        htmlFor="password"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        autoComplete="email"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="primaryPosition"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Primary Position
                                                    </label>
                                                    <select
                                                        id="position"
                                                        name="position"
                                                        ref={primaryRef}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    >
                                                        <option
                                                            value="none"
                                                            hidden
                                                        >
                                                            Select...
                                                        </option>
                                                        {positions.map(
                                                            (position) => (
                                                                <option
                                                                    key={
                                                                        position.id
                                                                    }
                                                                    value={
                                                                        position.id
                                                                    }
                                                                >
                                                                    {
                                                                        position.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="secondaryPosition"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Secondary Position
                                                    </label>
                                                    <select
                                                        id="secondaryPosition"
                                                        name="secondaryPosition"
                                                        ref={secondaryRef}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    >
                                                        <option
                                                            value="none"
                                                            hidden
                                                        >
                                                            Select...
                                                        </option>
                                                        {positions.map(
                                                            (position) => (
                                                                <option
                                                                    key={
                                                                        position.id
                                                                    }
                                                                    value={
                                                                        position.id
                                                                    }
                                                                >
                                                                    {
                                                                        position.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 text-right py-5 px-5 sm:px-6">
                                            <button
                                                type="submit"
                                                className="rounded-md border border-transparent bg-violet-100 py-2 px-4 mr-3 text-sm font-medium text-black shadow-sm hover:bg-violet-200 focus:bg-violet-200"
                                            >
                                                Register
                                            </button>
                                            <button
                                                className="rounded-md border border-transparent bg-rose-100 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-rose-200 focus:bg-rose-200"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
