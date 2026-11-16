"use client";
import Link from "next/link";
import {useRef} from "react";
export default function Nav(){const menu=useRef<HTMLDetailsElement>(null);return <header className="rf-nav"><Link href="/" className="rf-brand">V.E</Link><nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/#achievements">Achievements</Link><Link href="/#about">Profile</Link><Link href="/#contact">Contact</Link></nav><details ref={menu}><summary>Menu</summary><div onClick={()=>{if(menu.current)menu.current.open=false}}><Link href="/">Home</Link><Link href="/#achievements">Achievements</Link><Link href="/#about">Profile</Link><Link href="/#contact">Contact</Link><Link href="/stats">Progress overview</Link><Link href="/learning-matrix">Learning matrix</Link></div></details></header>}
