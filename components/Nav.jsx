"use client"

import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useState, useEffect } from "react"
import Link from 'next/link'
import Image from "next/image"

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href={"/"} className='flex gap-2 items-center'>
                <Image src="/assets/images/logo-text.svg"
                    alt="promptoia logo"
                    width={30}
                    height={30}
                    className="object-contain" />
                <p className="logo_text">NPrompt</p>
            </Link>
           

            {/* desktop navigation */}
            <div className="sm:flex hidden">
                {
                    session?.user ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link href={"/create-prompt"} className="black_btn">
                                Create New Prompt
                            </Link>
                            <button type="button" onClick={signOut} className="outline_btn"> Sign Out</button>
                            <Link href={"/profile"}>
                                <Image src={session?.user.image}
                                    width={37}
                                    height={37}
                                    className="rounded-full"
                                    alt="Profile"
                                />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        type="button"
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn"

                                    >
                                        Sign in
                                    </button>
                                ))
                            }
                        </>
                    )
                }


            </div>
            {/* mobile navigation */}
            <div className="sm:hidden flex relative">
                {
                    session?.user ? (
                        <div className="flex">
                            <Image src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="Profile"
                                onClick={() => setToggleDropDown((prev) => !prev)}
                            />
                            {
                                toggleDropDown && (
                                    <div className="dropdown">
                                        <Link href={"/profile"}
                                            className="dropdown_link"
                                            onClick={() => setToggleDropDown(false)}
                                        >
                                            My Profile
                                        </Link>

                                        <Link href={"/create-prompt"}
                                            className="dropdown_link"
                                            onClick={() => setToggleDropDown(false)}
                                        >
                                            Create Prompt
                                        </Link>

                                        <button type="button"
                                            onClick={() => {
                                                setToggleDropDown(false)
                                                signOut();
                                            }}
                                            className="mt-5 w-full black_btn"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) :
                        (
                            <>
                                {
                                    providers && Object.values(providers).map((provider) => (
                                        <button
                                            type="button"
                                            key={provider.name}
                                            onClick={() => signIn(provider.id)}
                                            className="black_btn"

                                        >
                                            Sign in
                                        </button>
                                    ))
                                }
                            </>
                        )
                }
            </div> 
        </nav>
    )
}

export default Nav;