const sharp = require('sharp');

const files = [
  ['earth.png', 82],
  ['floatingastronaut.png', 82],
  ['headshot.png', 82],
  ['pod.png', 80],
  ['microbe.png', 80],
  ['nasawebsite.png', 80],
  ['japan.jpg', 80],
];

files.forEach(([file, quality]) => {
  const out = file.replace(/\.(png|jpg)$/, '.webp');
  sharp(file)
    .webp({ quality })
    .toFile(out, (err, info) => {
      if (err) console.error(`✗ ${file}:`, err.message);
      else console.log(`✓ ${file} → ${out} (${(info.size/1024).toFixed(0)} KB)`);
    });
});