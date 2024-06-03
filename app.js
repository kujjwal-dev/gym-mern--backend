import express from "express"
import { config } from "dotenv"
import cors from "cors"
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({ path: "./config.env"});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    // You can also set other CORS headers such as Access-Control-Allow-Methods, Access-Control-Allow-Headers, etc.
    next();
  });

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/send/mail",async(req,res,next) => {
    const { name,email,message } = req.body;
    if(!name || !email || !message ){
        return next(
            res.status(400).json({
                success: false,
                message: "Please provide all details",
            })
        )
    }
    try {
        await sendEmail({
            email: "trptrp098@gmail.com",
            subject: "Gym Website Contact",
            message,
            userEmail: email
        });
        res.status(200).json({
            success: true,
            message: "Mesaage Sent Successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
        
    }
})

app.use(router);



app.listen(process.env.PORT,() => {
    console.log(`Server listening at port ${process.env.PORT}`);
});