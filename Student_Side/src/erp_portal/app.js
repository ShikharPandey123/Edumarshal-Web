const express = require('express') ; 
const app = express() ;
const { PORT } = require('./config/env.config') ;
const connectDB = require('./config/db.config');
const handleCors = require("./config/cors.config");
const cookieParser = require('cookie-parser') ;

const studentRoutes = require('./routes/student.routes') ;
const teacherRoutes=require("./routes/teacher.routes");

app.set('trust proxy', true) ;
app.use(cookieParser()) ;
app.use(express.json()) ;
app.use(handleCors);
connectDB() ;

app.use('/v1/student', studentRoutes) ;
app.use('/v1/teacher',teacherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})