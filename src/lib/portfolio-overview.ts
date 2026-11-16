import {certifications,thmRooms,htbAcademyModules,htbChallenges,siteConfig} from "./data";
import {fetchHackTheBoxActivity,hackTheBoxAchievementUrl} from "./api/hackthebox";
import {fetchCryptoHackStats} from "./api/cryptohack";
import type {Preview} from "@/components/rainfall/Explorer";
export async function portfolioOverview(){
 const [htb,crypto]=await Promise.all([fetchHackTheBoxActivity(siteConfig.hackthebox.userId),fetchCryptoHackStats()]);
 const platforms:Preview[]=[
 {id:"thm",name:"TryHackMe",href:"/tryhackme",kind:"Rooms & badges",source:"Curated preview",records:thmRooms.slice(0,3).map(x=>({title:x.name,url:x.url}))},
 {id:"htb",name:"Hack The Box",href:"/hackthebox",kind:"Activity & challenges",source:htb?"Public profile":"Curated records",records:htb?htb.slice(0,3).map(x=>({title:x.name,url:hackTheBoxAchievementUrl(x)})):htbChallenges.slice(0,3).map(x=>({title:x.name,url:x.url}))},
 {id:"academy",name:"HTB Academy",href:"/htb-academy",kind:"Modules & badges",source:"Curated records",records:htbAcademyModules.slice(0,3).map(x=>({title:x.name,url:x.url}))},
 {id:"cisco",name:"Cisco",href:"/cisco",kind:"Certificates & course records",source:"Curated records",records:["Ethical Hacker","Network Defense","Endpoint Security"].map(name=>certifications.find(c=>c.name===name)!).map(x=>({title:x.name,url:x.url}))},
 {id:"crypto",name:"CryptoHack",href:"/cryptohack",kind:"Solved challenges",source:crypto?.challenges?"Public profile":"Curated records",records:crypto?.challenges?.slice(0,3).map(x=>({title:x.name,url:crypto.profileUrl}))??[{title:"Introduction to CryptoHack"},{title:"Modular Arithmetic"},{title:"Symmetric Cryptography"}]},
 {id:"pico",name:"picoCTF",href:"/picoctf",kind:"Challenges",source:"Curated records",records:["interencdec","Mod 26","The Numbers"].map(title=>({title}))},
 {id:"cylab",name:"CyLab",kind:"Achievements",source:"Not connected",records:[]}];
 const recent=[...(htb??[]).map(x=>({id:`htb:${x.type}:${x.id}:${x.ownDate}`,title:x.name,date:x.ownDate,platform:"Hack The Box",kind:x.type,href:hackTheBoxAchievementUrl(x)})),...(crypto?.challenges??[]).map(x=>({id:`crypto:${x.name}`,title:x.name,date:x.solvedAt,platform:"CryptoHack",kind:"Challenge",href:"/cryptohack"}))].sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).slice(0,4);
 return {platforms,recent};
}
