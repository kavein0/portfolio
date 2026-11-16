"use client";
import {useEffect,useRef,useState} from "react";
import type {CSSProperties} from "react";
import Link from "next/link";
import {GlassLayers} from "./LiquidGlass";
import {ArrowUpRight,ArrowRight,CloudRain,Box,GraduationCap,Radio,KeyRound,Landmark,X,FileText,Info,List,Sun,VolumeX} from "lucide-react";
export type Preview={id:string;name:string;href?:string;kind:string;source:string;records:{title:string;url?:string}[]};
const icons=[CloudRain,Box,GraduationCap,Radio,KeyRound,Info,Landmark];
const coordinates=[[24,27,29,28],[54,23,71,27],[84,30,25,54],[54,51,61,53],[20,67,21,79],[48,80,49,81],[80,74,82,79]];
const clips=[
 "polygon(4% 34%,9% 20%,18% 3%,30% 3%,43% 26%,35% 46%,15% 43%)",
 "polygon(34% 0,73% 0,74% 25%,66% 40%,43% 28%)",
 "polygon(74% 5%,94% 10%,100% 35%,79% 48%,67% 38%)",
 "polygon(44% 29%,73% 41%,74% 52%,65% 73%,42% 58%,35% 47%)",
 "polygon(6% 40%,34% 48%,38% 58%,27% 89%,12% 88%,3% 62%)",
 "polygon(38% 57%,63% 74%,65% 84%,58% 95%,28% 94%,29% 82%)",
 "polygon(75% 54%,86% 50%,95% 79%,95% 88%,72% 91%,66% 74%)"];
const mobileClips=["polygon(9% 30%,25% 7%,42% 10%,50% 29%,40% 44%,20% 40%)","polygon(50% 11%,66% 6%,91% 15%,94% 35%,79% 44%,55% 32%)","polygon(7% 38%,37% 45%,46% 58%,32% 68%,12% 68%,4% 53%)","polygon(53% 33%,76% 45%,81% 56%,61% 72%,46% 60%,41% 47%)","polygon(8% 77%,31% 67%,34% 91%,25% 94%,5% 86%)","polygon(46% 61%,61% 73%,66% 85%,64% 94%,36% 94%,34% 76%)","polygon(78% 59%,91% 64%,99% 83%,95% 91%,75% 95%,65% 85%,64% 74%)"];
function PlatformSymbol({id,Icon}:{id:string;Icon:typeof CloudRain}){
 if(id==="cisco")return <svg viewBox="0 0 40 32" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true">{[8,15,22,28,22,15,8].map((h,i)=><path key={i} d={`M${5+i*5} ${16-h/2}v${h}`}/>)}</svg>;
 if(id==="pico")return <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><circle cx="16" cy="16" r="14" opacity=".9"/><path d="M13 25V9h6a5 5 0 0 1 0 10h-3v6zm3-13v4h3a2 2 0 0 0 0-4z" fill="#173040"/></svg>;
 if(id==="crypto")return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinejoin="round" aria-hidden="true"><path d="M7 6l10 5 9 6-1 10-11 3-10-9V8"/><path d="M4 4l4 2"/></svg>;
 return <Icon aria-hidden="true"/>;
}
function Panel({p}:{p?:Preview}){
 if(!p)return <div className="rf-empty"><h3>Choose a platform</h3><p>Select a shard to see certificates and achievements.</p></div>;
 return <><h3>{p.name}</h3><div className="rf-preview-sub"><p>{p.id==="cisco"?"Certificates":p.kind}</p><small>{p.source}</small></div><ul>{p.records.map((r,index)=><li key={`${p.id}:${r.title}:${index}`}>{r.url?<a href={r.url} target="_blank" rel="noreferrer"><FileText/><span>{r.title}</span><ArrowRight/></a>:<span><FileText/>{r.title}</span>}</li>)}</ul>{p.href?<><Link className="rf-action" href={p.href}>View {p.id==="cisco"?"certificates":p.id==="academy"?"modules":"achievements"}<ArrowRight size={17}/></Link><Link className="rf-open-platform" href={p.href}>Open platform <ArrowUpRight size={16}/></Link></>:<p>CyLab is not connected yet. No achievement records are available.</p>}</>;
}
export default function Explorer({platforms}:{platforms:Preview[]}){
 const[active,setActive]=useState<string>();const[list,setList]=useState(false);const[motion,setMotion]=useState(true);const dialog=useRef<HTMLDialogElement>(null);
 const hoverTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(hoverTimer.current)clearTimeout(hoverTimer.current)},[]);
 function cancelHover(){if(hoverTimer.current)clearTimeout(hoverTimer.current)}
 function hover(id:string){cancelHover();hoverTimer.current=setTimeout(()=>setActive(id),150)}
 const chosen=platforms.find(p=>p.id===active);
 function select(id:string){setActive(id);if(matchMedia("(max-width:767px),(hover:none)").matches)dialog.current?.showModal()}
 return <div className="rf-explorer" onKeyDown={e=>{if(e.key==="Escape")setActive(undefined)}}>
 <div className="rf-explorer-grid"><div>
 <h2 className="rf-mobile-heading">Achievements</h2><p className="rf-mobile-heading rf-touch-hint">Tap a shard to explore</p>
 {list?<div className="rf-list">{platforms.map(p=><button key={p.id} onClick={()=>select(p.id)} onFocus={()=>setActive(p.id)}>{p.name}<small>{p.source}</small><ArrowRight size={16}/></button>)}</div>:<div className={`rf-glass ${motion?"":"rf-static"}`} aria-label="Choose a platform">
 <div className="rf-glass-art" aria-hidden="true"/>
 {platforms.map((p,i)=>{const Icon=icons[i];const pos=coordinates[i];return <button key={p.id} type="button" aria-label={p.name} aria-pressed={active===p.id} className={`rf-shard ${active===p.id?"rf-selected":""}`} style={{"--clip":clips[i],"--mobile-clip":mobileClips[i],"--x":pos[0]+"%","--y":pos[1]+"%","--mx":pos[2]+"%","--my":pos[3]+"%"}as CSSProperties} onPointerDown={e=>{if(e.pointerType==="mouse")e.preventDefault()}} onPointerEnter={e=>{if(e.pointerType==="mouse")hover(p.id)}} onPointerLeave={cancelHover} onFocus={()=>setActive(p.id)} onClick={()=>select(p.id)}><span className="rf-shard-art" aria-hidden="true"/><span className="rf-shard-label"><PlatformSymbol id={p.id} Icon={Icon}/><span>{p.name}</span>{!p.href&&<small>Not connected</small>}</span></button>})}
 </div>}
 <noscript><nav>{platforms.filter(p=>p.href).map(p=><Link key={p.id} href={p.href!}>{p.name} · </Link>)}</nav></noscript>
 </div><aside className="rf-preview rf-liquid" aria-label="Selected platform"><GlassLayers/><Panel p={chosen}/></aside></div>
 <div className="rf-tools"><span className="rf-hover-hint"><Info size={20}/>Hover or select a shard to explore.</span><div className="rf-toggle"><button aria-pressed={!list} onClick={()=>setList(false)}>Glass</button><button aria-pressed={list} onClick={()=>setList(true)}><List size={16}/>List</button></div><div className="rf-environment"><button className="rf-motion" aria-pressed={motion} onClick={()=>setMotion(!motion)}><Sun size={18}/>Motion {motion?"on":"off"}</button><span><VolumeX size={18}/>Sound off</span></div></div>
 <dialog ref={dialog} className="rf-sheet" aria-label={chosen?.name} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}><button className="rf-close" aria-label="Close preview" onClick={()=>dialog.current?.close()}><X/></button><Panel p={chosen}/><button className="rf-sheet-close" onClick={()=>dialog.current?.close()}>Close</button></dialog>
 </div>;
}
