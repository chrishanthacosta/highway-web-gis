"use server"

import  Database  from 'better-sqlite3';


import React from 'react'
import { SiTruenas } from 'react-icons/si';
// import { BridgeFormSchema } from '@/components/features/items/forms/bridge-form';
import { z } from "zod";
import { GetInsertSqliteStatement } from '@/lib/system/sqlite-helpers/get-insert-sqlite-stmt';


 

export const createdb = async (): Promise<boolean> => {
  const db = new Database("app.db");
  db.pragma('journal_mode = WAL');
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

export const insertBridge = async (insertStatements: any, ) => {
   
  const db = new Database("app.db");
  db.pragma('journal_mode = WAL');
  
  //const sqlParts = GetInsertSqliteStatement(configurationSchema,data) insertStatementMain

 

  //main table
  const stmt = db.prepare(insertStatements.insertStatementMain);
  const info = stmt.run(insertStatements.dataValuesMain);

  //span table
  insertStatements.linkedInsertStatements.map((linkedInsertStatement: any) => {

    linkedInsertStatement.lSchemaPreparedObjRows.map((row: any) => {
      console.log("a",row.insertStatement)
      console.log("a",row.dataValues)
      const stmt2 = db.prepare(row.insertStatement);
      row.dataValues.unshift(info.lastInsertRowid)
      const info2 = stmt2.run(row.dataValues);
    })

  })

  // const q= await  new Promise<true>((resolve)=> setTimeout(()=> resolve(true),3000  ))

  db.close()
  //const stmt = db.prepare('INSERT INTO cats (name, age) VALUES (?, ?)');
  if (info.changes == 1) {
    return Promise.resolve({success:true,msg:"", lastInsertRowid: info.lastInsertRowid });
  } else {
    return Promise.reject({success:false,msg:"Insert failed",  } );
  }
}

export const getBridge = async (id: Number,mainSql:string, spanSql:string ): Promise<any> => {
  
  const db = new Database("app.db");
  db.pragma('journal_mode = WAL');
  
  //const sqlParts = GetInsertSqliteStatement(configurationSchema,data) insertStatementMain

 

  //main table
  const mainRow = db.prepare(mainSql).get(id);;
   

   //main table
  const stmt = db.prepare(spanSql) 
  const rows = stmt.all(id);
  console.log("rows",rows,)
   
  db.close()
     return Promise.resolve({success:true,msg:"",data: {...mainRow,bridgespans:rows} });
}


export const updateBridge = async (id: Number, updateStatementMain: any,bridgeSpans:any,insertStatements:any) => {
  const db = new Database("app.db");
  db.pragma('journal_mode = WAL');
 
  
  if (updateStatementMain) {
     console.log("updateStatementMain.updateQueryMain", updateStatementMain.updateQueryMain,)
      console.log("updateStatementMain.valuesMain", updateStatementMain.valuesMain,)
    const stmt = db.prepare(updateStatementMain.updateQueryMain);
    const info = stmt.run(updateStatementMain.valuesMain);
  }
  

 //span table
  if (bridgeSpans) {
    //spans table - delete all and insert
     //delete
    const del = db.prepare('DELETE FROM bridgespans WHERE bridgeid = ?');
    del.run( id)
    //insert
    insertStatements.linkedInsertStatements.map((linkedInsertStatement: any) => {

      linkedInsertStatement.lSchemaPreparedObjRows.map((row: any) => {
       
        const stmt2 = db.prepare(row.insertStatement);
        row.dataValues.unshift(id)
        const info2 = stmt2.run(row.dataValues);
      })

    })

  }


  db.close()

}
 

export const GetBridges =async (mainSql:string) => {
  const db = new Database("app.db");
  db.pragma('journal_mode = WAL');
  
  //const sqlParts = GetInsertSqliteStatement(configurationSchema,data) insertStatementMain

 

  //main table
  const rows = db.prepare(mainSql).all() ;
   

  //  //main table
  // const stmt = db.prepare(spanSql) 
  // const rows = stmt.all(id);
  // console.log("rows",rows,)
   
  db.close()
     return Promise.resolve({success:true,msg:"",data:  rows  });
}


 