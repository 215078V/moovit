const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../services/firebaseService");

const randomAvatar = (gender) => {
  const maleAvatars = ["https://pics.craiyon.com/2023-07-27/5d229e337ad14d2481a6c26b4034f6b8.webp",
    "https://pics.craiyon.com/2023-07-08/769516ec11504fb0ae821e09ed1206b8.webp",
    "https://img.freepik.com/premium-photo/anime-boy-with-black-hair-red-eyes-hoodie-generative-ai_955925-63918.jpg",
    "https://i.pinimg.com/736x/07/29/18/072918dca356761371dfe1022958e67d.jpg"
  ];
  const femaleAvatars = [
    "https://static.vecteezy.com/system/resources/thumbnails/029/796/022/small_2x/asian-girl-anime-avatar-ai-art-photo.jpg",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1d896e62-6509-4051-9679-58081ee70f1d/dfhgpm5-56b5fdb7-71fc-452a-af19-1d8ecf5afb6c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFkODk2ZTYyLTY1MDktNDA1MS05Njc5LTU4MDgxZWU3MGYxZFwvZGZoZ3BtNS01NmI1ZmRiNy03MWZjLTQ1MmEtYWYxOS0xZDhlY2Y1YWZiNmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.EH9IwW8XsZHX04DO2p4lR8KnEKrASx5IwUaQ9pGafaw",
    "https://imgcdn.stablediffusionweb.com/2024/3/31/a07c234b-ab97-4ad4-96b1-e1e88ec45e45.jpg",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a21cfdc2-1c17-4887-8bc0-88de589c1859/dhh3yxr-a885a068-fabd-4f6c-aa13-46a07fc071dd.jpg/v1/fill/w_894,h_894,q_70,strp/best_anime_girl_avatar_for_your_profile_by_thehackerart_dhh3yxr-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcL2EyMWNmZGMyLTFjMTctNDg4Ny04YmMwLTg4ZGU1ODljMTg1OVwvZGhoM3l4ci1hODg1YTA2OC1mYWJkLTRmNmMtYWExMy00NmEwN2ZjMDcxZGQuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.RG3EKaEVN24kQaRPOfw4cPwAGBD_qMVbxBlMJ5hFqEI"
  ];
  return gender === "male"
    ? maleAvatars[Math.floor(Math.random() * maleAvatars.length)]
    : femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
};

exports.register = async (req, res) => {
  const { name, username, password, gender, email } = req.body;

  if (!name || !username || !password || !gender || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const snapshot = await db
      .ref("users")
      .orderByChild("username")
      .equalTo(username)
      .once("value");
    if (snapshot.exists()) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = randomAvatar(gender);

    const newUser = {
      name,
      username,
      password: hashedPassword,
      gender,
      email,
      avatar,
    };

    const ref = db.ref("users").push();
    await ref.set(newUser);

    return res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const snapshot = await db
      .ref("users")
      .orderByChild("username")
      .equalTo(username)
      .once("value");

    if (!snapshot.exists()) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const user = Object.values(snapshot.val())[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, name: user.name, avatar: user.avatar },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful.", token, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
