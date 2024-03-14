"use server"

import  Database  from 'better-sqlite3';


import React from 'react'
import { SiTruenas } from 'react-icons/si';
import { BridgeFormSchema } from '@/components/features/items/forms/bridge-form';
import { z } from "zod";


export const getBridge = async (id: Number): Promise<string> => {
  
  
  return  Promise.resolve( id.toString());
}

export const createdb = async (): Promise<boolean> => {
  
  const q = `
 CREATE TABLE users (
     id INTEGER PRIMARY KEY,
     name STRING NOT NULL,
     username TEXT NOT NULL UNIQUE
 )
  `
  try {
    db.exec(q)
   
    console.log("suc",)
     db.close();
     return  Promise.resolve( true);
  } catch (e) {
     db.close();
    console.log("fail",)
     return  Promise.resolve( false);
  }
 
}

export const saveBridge = async (data: z.infer<typeof BridgeFormSchema>) => {
  const db = new Database("app.db");
  db.pragma('journal_mode = WAL');
  
  //const stmt = db.prepare('INSERT INTO cats (name, age) VALUES (?, ?)');
  console.log("b saved",data)
  return  Promise.resolve( false);
}

 