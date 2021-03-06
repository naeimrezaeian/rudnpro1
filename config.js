module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST ,
    PORT: process.env.PORT || 3000,
    REDIS_HOST_SERVER:'188.126.44.111',    
    REDIS_HOST:'188.126.44.111', 
    DATABASE_HOST:'188.126.44.111',
    //DATABASE_HOST:'192.168.0.155',
    REFRESH_TOKEN_SECRET: 'VERYSECRETKEYREFRESH',
    ACCESS_TOKEN_SECRET:'VERYSECRETKEY',
    ROLE:{ADMIN: 'admin', TEACHER: 'teacher',STUDENT:'student'},
    ERROR_200:"Successfully",
    ERROR_400:"Error in insert new record",
    ERROR_401:"Not Allowed",
    ERROR_403:"Token Error",
    ERROR_404:"Data not found",
    ERROR_405:"Validation Error",
    ERROR_406:"Invalid JSON",
    ERROR_407:"Data already exists ",
    ERROR_408:"Invalid File ",
    ERROR_500:"Internal Server Error",
   
  }