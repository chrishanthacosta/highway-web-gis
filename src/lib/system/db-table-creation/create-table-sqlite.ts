
"use server"

import  Database  from 'better-sqlite3';


import React from 'react';
import { SiTruenas } from 'react-icons/si';
export const getBridge  = async (id: Number): Promise<string>  => {
  
  
  return  Promise.resolve( id.toString());
}

export const createTableSqlite = async (configurationSchema:any): Promise<boolean> => {
  
       
const keys:string[] = Object.keys(configurationSchema.fields)
   
    let sqlmid:string = ""
    keys.forEach((key: string) => {
        const prop: any = configurationSchema.fields[key]
        if (prop.db) {
            switch (prop.dataType) {
                case "INTEGER":
                    if (prop.pk && prop.auto) {
                        sqlmid =  `${sqlmid ? sqlmid + "," :""}  ${getIdPrimaryColumnDef(key)}`
                    } else if(prop.pk) {
                         sqlmid =  `${sqlmid ? sqlmid + "," :""}  ${getIntegerPKColumnDef(key) }`
                    } else {
                         sqlmid =  `${sqlmid ? sqlmid + "," :""}  ${getIntegerColumnDef(key,!!prop.null,!!prop.unique)}`
                    }
                    break;
                case "STRING":
                     sqlmid =  `${sqlmid ? sqlmid + "," :""}  ${getStringColumnDef(key,!!prop.null,!!prop.unique)}`
                    break;
                case "REAL":
                     sqlmid =  `${sqlmid ? sqlmid + "," :""}  ${getRealColumnDef(key,!!prop.null,!!prop.unique)}`
                    break;   
                 case "BLOB":
                     sqlmid =  `${sqlmid ? sqlmid + "," :""}  ${getBLOBColumnDef(key,!!prop.null,!!prop.unique)}`
                    break;  
                default:
                    console.log("error in generatezodformschema", prop.dataType)
                    break;
            }
        }
    });

    const sql =   `CREATE TABLE ${configurationSchema.tableName} (${sqlmid} )`

    const db = new Database("app.db");
    db.pragma('journal_mode = WAL');
    console.log("result tb cr-sql",sql,)
     
    

    
    try {
        db.exec(sql)
    
        console.log("suc",)
        db.close();
        return  Promise.resolve( true);
    } catch (e) {
        db.close();
        console.log("tb c fail",)
        return  Promise.resolve( false);
    }
    
    
}

 
const getIdPrimaryColumnDef = (colName: string) :string => {
    
    return `${colName} INTEGER PRIMARY KEY AUTOINCREMENT`

}

const getIntegerPKColumnDef = (colName: string ) :string => {
    
    return `${colName} INTEGER PRIMARY KEY UNIQUE`

}

const getStringColumnDef = (colName: string,notnull:boolean,unique:boolean=false) :string => {
    
    return `${colName} TEXT ${notnull ? "NOT NULL":""} ${unique ? "UNIQUE":""}`

}
const getIntegerColumnDef = (colName: string,notnull:boolean,unique:boolean=false) :string => {
    
    return `${colName} INTEGER ${notnull ? "NOT NULL":""} ${unique ? "UNIQUE":""}`

}

const getRealColumnDef = (colName: string,notnull:boolean,unique:boolean=false) :string => {
    
    return `${colName} REAL ${notnull ? "NOT NULL":""} ${unique ? "UNIQUE":""}`

}

const getBLOBColumnDef = (colName: string,notnull:boolean,unique:boolean=false) :string => {
    
    return `${colName} BLOB ${notnull ? "NOT NULL":""} ${unique ? "UNIQUE":""}`

}
 