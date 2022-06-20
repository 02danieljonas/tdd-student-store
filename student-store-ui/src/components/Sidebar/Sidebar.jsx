import * as React from "react"
import "./Sidebar.css"
import arrow from "./arrow.svg";
import { useState } from "react";

export default function Sidebar({isOpen, handleOnToggle}) {
  return (
    <section className={`sidebar ${isOpen?"open":"closed"}`}>
      <button onClick={()=>{
        handleOnToggle(!isOpen)
        console.log(isOpen)
      }}>
      <img src={arrow} alt="arrow" color="green" width={45}/>
      </button>
      <p>I  am a  sidebar</p>
    </section>
  )
}
