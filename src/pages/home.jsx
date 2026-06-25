
import React from "react";
import Hero from "../components/sections/hero";
import About from "../components/sections/aboutme";
import Projects from "../components/sections/projects";
import Brandicons from "../components/sections/brandsinfra";
import Work from "../components/sections/work";
import Goal from "../components/sections/goals";
import Studeis from "../components/sections/studies";
import Reach from "../components/sections/reach";
import Techstack from "../components/sections/techstack";
export default function Home() {
  return (
    <main className="">
        
      <Hero />
<      About />
      <Projects />
            <Brandicons />

            <Work />

             <Techstack />


      <Goal />
      <Studeis />
      <Reach />
   
    </main>
  );
}
