import express from "express";
import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";
import { client } from "../index";
import multer from "multer";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body, validationResult } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

async function uploadToBucket(files: Express.Multer.File[]): Promise<string[]> {
  const uploadedLinks = await Promise.all(
    files.map(async (file) => {
      const fileExt = mime.extension(file.mimetype);
      console.log(file);
      const fileName = file.originalname;
      if (!fileExt) {
        throw new Error("Invalid file type");
      }

      const newFileName = `${fileName}-${Date.now()}`;

      const params = {
        Bucket: process.env.S3_BUCKET_NAME as string,
        Key: `${fileName}-${Date.now()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await client.send(new PutObjectCommand(params));
      return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${newFileName}`;
    })
  );

  return uploadedLinks;
}

//this will be the root
router.post(
  "/",
  verifyToken,
  upload.array("imageFiles", 6),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night must be a number"),
    body("adultCapacity")
      .notEmpty()
      .isNumeric()
      .withMessage("Adult capacity must be a number"),
    body("childCapacity")
      .notEmpty()
      .isNumeric()
      .withMessage("Child capacity must be a number"),
    body("starRating")
      .notEmpty()
      .isNumeric()
      .withMessage("Star rating must be a number"),
    body("facilities")
      .customSanitizer((value) => (Array.isArray(value) ? value : [value]))
      .isArray({ min: 1 })
      .withMessage("At least one facility is required"),
  ],
  async (req: Request, res: Response) => {
     console.log("Creating hotel with data:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Bad Request", errors: errors.array() });
    }

    try {
      const files = req.files as Express.Multer.File[];
      const imageUrls = await uploadToBucket(files);

      const newHotel: HotelType = {
        ...req.body,
        imageUrls,
        lastUpdated: new Date(),
        userId: req.userId,
        // Ensure facilities is always an array
        facilities: Array.isArray(req.body.facilities)
          ? req.body.facilities
          : [req.body.facilities],
      };

      const hotel = new Hotel(newHotel);
      await hotel.save();
      res.status(201).send(hotel);
    } catch (error) {
      console.log("error creating hotel", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json(hotels);
  } catch (error) {
    console.log("error getting hotels", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

//specific hotel by id
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toString();
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    console.log("error getting hotel", error);
    res.status(500).json({ message: "Error fetching hotel" });
  }
});

//update hotel
router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.hotelId, userId: req.userId },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        res.status(400).json("Hotel not found");
        return;
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadToBucket(files);

      // Parse the existing imageUrls from the request body
      let existingImageUrls: string[] = [];
      if (req.body.imageUrls) {
        try {
          existingImageUrls = JSON.parse(req.body.imageUrls);
        } catch (error) {
          console.error("Error parsing imageUrls:", error);
          existingImageUrls = [];
        }
      }

      // Combine the new and existing image URLs
      hotel.imageUrls = [...updatedImageUrls, ...existingImageUrls];

      await hotel.save();
      res.status(200).json(hotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
