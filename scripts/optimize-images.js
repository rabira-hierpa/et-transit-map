import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, basename } from 'path';

const INPUT_DIR = 'route-details';
const OUTPUT_DIR = 'public/optimized';
const THUMB_WIDTH = 600;
const THUMB_QUALITY = 80;
const WEBP_QUALITY = 85;

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  // Create output directories
  const dirs = [
    'public',
    OUTPUT_DIR,
    `${OUTPUT_DIR}/thumbs`,
    `${OUTPUT_DIR}/webp`,
    `${OUTPUT_DIR}/thumbs-webp`
  ];

  for (const dir of dirs) {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
      console.log(`✓ Created directory: ${dir}`);
    }
  }

  // Get all PNG files
  const files = await readdir(INPUT_DIR);
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));

  console.log(`\nFound ${pngFiles.length} PNG files to optimize\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of pngFiles) {
    const inputPath = join(INPUT_DIR, file);
    const filename = basename(file, '.png');

    console.log(`Processing: ${file}`);

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Get original size
      const stats = await import('fs').then(fs => 
        fs.promises.stat(inputPath)
      );
      const originalSize = stats.size;
      totalOriginalSize += originalSize;

      // 1. Create thumbnail PNG (for grid view)
      const thumbPath = join(OUTPUT_DIR, 'thumbs', file);
      await image
        .resize(THUMB_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .png({ quality: THUMB_QUALITY, compressionLevel: 9 })
        .toFile(thumbPath);

      const thumbStats = await import('fs').then(fs => 
        fs.promises.stat(thumbPath)
      );
      const thumbSize = thumbStats.size;
      totalOptimizedSize += thumbSize;

      // 2. Create thumbnail WebP (modern browsers)
      const thumbWebpPath = join(OUTPUT_DIR, 'thumbs-webp', `${filename}.webp`);
      await image
        .resize(THUMB_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: WEBP_QUALITY })
        .toFile(thumbWebpPath);

      const thumbWebpStats = await import('fs').then(fs => 
        fs.promises.stat(thumbWebpPath)
      );
      const thumbWebpSize = thumbWebpStats.size;

      // 3. Create full-size WebP (for lightbox on modern browsers)
      const webpPath = join(OUTPUT_DIR, 'webp', `${filename}.webp`);
      await sharp(inputPath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);

      const webpStats = await import('fs').then(fs => 
        fs.promises.stat(webpPath)
      );
      const fullWebpSize = webpStats.size;

      console.log(`  Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  Thumbnail PNG: ${(thumbSize / 1024).toFixed(2)} KB (${((thumbSize / originalSize) * 100).toFixed(1)}%)`);
      console.log(`  Thumbnail WebP: ${(thumbWebpSize / 1024).toFixed(2)} KB (${((thumbWebpSize / originalSize) * 100).toFixed(1)}%)`);
      console.log(`  Full WebP: ${(fullWebpSize / 1024 / 1024).toFixed(2)} MB (${((fullWebpSize / originalSize) * 100).toFixed(1)}%)`);
      console.log('');

    } catch (error) {
      console.error(`  ❌ Error processing ${file}:`, error.message);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`  Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Total thumbnail size: ${(totalOptimizedSize / 1024).toFixed(2)} KB`);
  console.log(`  Savings: ${(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log('\n✅ Image optimization complete!\n');
}

optimizeImages().catch(console.error);

