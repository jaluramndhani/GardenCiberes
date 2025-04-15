const { execSync } = require("child_process")
const fs = require("fs")

// Jalankan build normal
console.log("Running Next.js build...")
execSync("next build", { stdio: "inherit" })

// Periksa apakah routes-manifest.json dibuat
const routesManifestPath = "./.next/routes-manifest.json"
if (fs.existsSync(routesManifestPath)) {
  console.log("✅ routes-manifest.json successfully created!")
  const manifest = require(routesManifestPath)
  console.log("Routes found:", manifest.dynamicRoutes.length + manifest.staticRoutes.length)
} else {
  console.error("❌ routes-manifest.json not found! Deployment will likely fail.")
}
