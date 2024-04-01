
"use server"

import Database from 'better-sqlite3';

export const GetPhotos =async (bridgeId:number) => {
  const db = new Database("app-photos.db");
  db.pragma('journal_mode = WAL');
  
  //const sqlParts = GetInsertSqliteStatement(configurationSchema,data) insertStatementMain

  const mainSql= `select * from photos where linkId=${bridgeId}`
 

  //main table
  const rows = db.prepare(mainSql).all() ;
   

  //  //main table
  // const stmt = db.prepare(spanSql) 
  // const rows = stmt.all(id);
  // console.log("rows",rows,)
   
    db.close()
    return Promise.resolve({success:true,msg:"",data:  rows  });
}

export const GetPhotoDetails =async (bridgeId:number) => {
  const db = new Database("app-photos.db");
  db.pragma('journal_mode = WAL');
  
  //const sqlParts = GetInsertSqliteStatement(configurationSchema,data) insertStatementMain

  const mainSql= `select id from photos where linkId=${bridgeId}`
 

  //main table
  const rows = db.prepare(mainSql).all() ;
   

  //  //main table
  // const stmt = db.prepare(spanSql) 
  // const rows = stmt.all(id);
  // console.log("rows",rows,)
   
    db.close()
    return Promise.resolve({success:true,msg:"",data:  rows  });
}

export const GetPhoto =async (id:number) => {
  const db = new Database("app-photos.db");
  db.pragma('journal_mode = WAL');
  
  //const sqlParts = GetInsertSqliteStatement(configurationSchema,data) insertStatementMain

  const mainSql= `select * from photos where id=?`
 

  //main table
  
   const mainRow = db.prepare(mainSql).get(id);;
   

  //  //main table
  // const stmt = db.prepare(spanSql) 
  // const rows = stmt.all(id);
  // console.log("rows",rows,)
   
    db.close()
    return Promise.resolve({success:true,msg:"",data:  mainRow  });
}
export const insertPhoto = async (src: string, title:string,date:string,bridgeid?:number, ) => {
   
  const db = new Database("app-photos.db");
  db.pragma('journal_mode = WAL');
  
  //const sqlParts = GetInsertSqliteStatement(configurationSchema,data) insertStatementMain

 

  //main table
  const stmt = db.prepare("insert into photos (src,title,date,linkid) values (?,?,?,?)");
  const info = stmt.run(src,title,date,bridgeid );

   

  // const q= await  new Promise<true>((resolve)=> setTimeout(()=> resolve(true),3000  ))

  db.close()
  //const stmt = db.prepare('INSERT INTO cats (name, age) VALUES (?, ?)');
  if (info.changes == 1) {
    return Promise.resolve({success:true,msg:"", lastInsertRowid: info.lastInsertRowid });
  } else {
    return Promise.reject({success:false,msg:"Insert failed",  } );
  }
}

export const updatePhoto = async (photoid: Number,  title:string) => {
  const db = new Database("app-photos.db");
  db.pragma('journal_mode = WAL');
  
   
    const stmt = db.prepare("update photos set title=? where id =?");
    const info = stmt.run(title,photoid);

  db.close()
  return Promise.resolve({success:true,msg:"updated "   });
}