import * as sql from "mssql";


export const sqlConfig: sql.config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const testConnection=()=>{
  if (sqlConfig){
    console.log('DB connection is woking well');
  }else{
    console.log('no connection');
    
  }
  
}
testConnection()

