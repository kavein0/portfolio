"use client";
import Link from "next/link";
import {GlassLayers} from "./LiquidGlass";
import {useRef} from "react";
import {usePathname} from "next/navigation";
export default function Nav(){const menu=useRef<HTMLDetailsElement>(null);const path=usePathname();return <header className="rf-nav rf-liquid"><GlassLayers/><Link href="/" className="rf-brand">V.E</Link><nav aria-label="Main navigation"><Link href="/" aria-current={path==="/"?"page":undefined}>Home</Link><Link href="/#achievements" aria-current={path!=="/"?"page":undefined}>Achievements</Link><Link href="/#about">Profile</Link><Link href="/#contact">Contact</Link></nav><details ref={menu}><summary>Menu</summary><div onClick={()=>{if(menu.current)menu.current.open=false}}><Link href="/" aria-current={path==="/"?"page":undefined}>Home</Link><Link href="/#achievements" aria-current={path!=="/"?"page":undefined}>Achievements</Link><Link href="/#about">Profile</Link><Link href="/#contact">Contact</Link><Link href="/certificates">Certificates &amp; training</Link><Link href="/stats">Progress overview</Link><Link href="/learning-matrix">Learning matrix</Link></div></details></header>}
