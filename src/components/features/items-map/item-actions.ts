
"use server"

import  Database  from 'better-sqlite3';


import React from 'react'
import { SiTruenas } from 'react-icons/si';
// import { CulvertFormSchema } from '@/components/features/items/forms/bridge-form';
import { z } from "zod";
import { GetInsertSqliteStatement } from '@/lib/system/sqlite-helpers/get-insert-sqlite-stmt';
import { Item } from './item-store';

const maindbFileName = "app.db"
const photodbFileName = "app-photos.db"
 

 

 
 

export const GetItems =async ( ) :Promise<any> => {
  const db = new Database(maindbFileName);
  db.pragma('journal_mode = WAL');
  
  //const sqlParts = GetInsertSqliteStatement(configurationSchema,data) insertStatementMain

 

  //main table
  const bridgeRows = db.prepare("select id,location, 'bridge' as type, latitude,longitude from bridges  ").all() ;
  const culvertRows = db.prepare("select id,location, 'culvert' as type, latitude,longitude from culverts  ").all() ;
   

  //  //main table
  // const stmt = db.prepare(spanSql) 
  // const rows = stmt.all(id);
  // console.log("rows",rows,)
   
  db.close()
     return Promise.resolve({success:true,msg:"",data:  [...bridgeRows,...culvertRows]  });
}


 