import User from "../models/User.js";


export const firebaseLogin = async (req, res ) => {
  try {
    const fbUser = req.firebaseUser;
    let user = await User.findOne({firebaseUid: fbUser.uid})
    if(!user) {
      user = await User.create({
        firebaseUid: fbUser.uid,
        email: fbUser.email,
        name: fbUser.email.split("@")[0],
        photo: fbUser.picture || ""
      })
    }

    res.status(200).json({
      message: "Login Success",
      user
    })

    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

