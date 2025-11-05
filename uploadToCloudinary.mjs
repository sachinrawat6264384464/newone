import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: "dfjecbhki",
  api_key: "761772554578776",
  api_secret: "tVO3hYgwHnX4CXOBNKpwmxP7oAM",
});

const rootFolder = "./public"; // folder that contains all your image folders
const cloudinaryRootFolder = "Homestorey-media"; // main folder name in Cloudinary

// Recursive function to upload all images
const uploadFolderRecursive = async (localFolder, cloudFolder) => {
  const files = fs.readdirSync(localFolder);

  for (const file of files) {
    const filePath = path.join(localFolder, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // If it’s a subfolder → recurse into it
      const newCloudFolder = `${cloudFolder}/${file}`;
      await uploadFolderRecursive(filePath, newCloudFolder);
    } else if (/\.(jpg|jpeg|png|webp|svg)$/i.test(file)) {
      // Upload only images
      console.log(`⏫ Uploading: ${filePath} → ${cloudFolder}`);
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: cloudFolder,
        });
        console.log(`✅ Uploaded: ${result.secure_url}`);
      } catch (err) {
        console.error(`❌ Error uploading ${file}: ${err.message}`);
      }
    } else {
      console.log(`⚠️ Skipping non-image: ${file}`);
    }
  }
};

// Run the uploader
(async () => {
  console.log(`🚀 Starting upload from: ${rootFolder}`);
  await uploadFolderRecursive(rootFolder, cloudinaryRootFolder);
  console.log("🎉 All uploads complete!");
})();
