"use server"

import  Database  from 'better-sqlite3';
const db = new Database("app.db");
 db.pragma('journal_mode = WAL');

import React from 'react'
import { SiTruenas } from 'react-icons/si';
export const getBridge  = async (id: Number): Promise<string>  => {
  
  
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

 