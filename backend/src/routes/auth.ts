import express, { Request, Response } from "express";
import { validationResult, check } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Bad Request", errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // const isMatch = await argon2.verify(user.password, password);
      // Compare passwords without encryption
      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      res.cookie("authCookie", token, {
        httpOnly: true,
        sameSite: "none",
        //When httpOnly is set to true, it means that the cookie is accessible only through the HTTP(S) protocol and cannot be accessed by client-side scripts (e.g., JavaScript running in the browser). This is a security measure to mitigate the risk of cross-site scripting (XSS) attacks.
        secure: process.env.NODE_ENV === "production", //false for dev 
        //When secure is set to true, it means that the cookie should only be sent over secure, encrypted connections (i.e., HTTPS). If the request is made over an unsecured HTTP connection, the browser won't include the cookie in the request.
        maxAge: 1000 * 60 * 60 * 24, //1 day (is same as the duration of expiry of the token)
      });

      return res.status(200).json({ userId:user._id });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/validate-token", verifyToken, async (req: Request, res: Response) => {
    res.status(200).send({userId:req.userId});
}); //the verify token middleware actually validates the token and adds the userId property to the req object


router.post("/logout", (req: Request, res: Response) => {

    res.clearCookie("authCookie").send("Cookie Cleared");
    //The res.clearCookie() method is used to clear a cookie by overwriting it with an empty value and an immediate expiration date. This effectively removes the cookie from the client's browser.
});



export default router;