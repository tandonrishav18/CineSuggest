/**
 * build.js — CineSuggest root build assembler
 *
 * Runs AFTER the subproject builds (cs-cards, ai-studio-import) have completed.
 * Creates a root-level dist/ directory that Vercel expects as its Output Directory.
 *
 * Final dist/ structure:
 *   dist/index.html          ← original static login page (root)
 *   dist/styles.css          ← login page stylesheet
 *   dist/app.js              ← login page form logic
 *   dist/logo.js             ← animated CS logo
 *   dist/motion.js           ← motion animation library (path-fixed from node_modules)
 *   dist/assets/             ← movie poster images used by the login page background
 *   dist/home/               ← React Vite Home app (copied from /home)
 *   dist/landing/            ← React Vite Landing app (copied from /landing)
 *   dist/movie-cards/        ← React Vite Movie Cards app (copied from /movie-cards)
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

// ─── 1. Clean and create dist/ ────────────────────────────────────────────────
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST, { recursive: true });
console.log('✓ Created dist/');

// ─── 2. Copy login page index.html, fixing the motion.js path ─────────────────
let indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
// The source references node_modules path which doesn't exist in dist —
// replace with the local ./motion.js we copy in step 4.
indexHtml = indexHtml.replace(
  './ai-studio-import/node_modules/motion/dist/motion.js',
  './motion.js'
);
fs.writeFileSync(path.join(DIST, 'index.html'), indexHtml);
console.log('✓ dist/index.html written (motion.js path fixed)');

// ─── 3. Copy static login page assets ─────────────────────────────────────────
const staticFiles = ['styles.css', 'app.js', 'logo.js'];
for (const file of staticFiles) {
  const src = path.join(ROOT, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DIST, file));
    console.log(`✓ dist/${file}`);
  } else {
    console.warn(`⚠ WARNING: ${file} not found at repo root`);
  }
}

// ─── 4. Copy motion.js from ai-studio-import node_modules ─────────────────────
// Try ai-studio-import first, fall back to root node_modules
const motionCandidates = [
  path.join(ROOT, 'ai-studio-import', 'node_modules', 'motion', 'dist', 'motion.js'),
  path.join(ROOT, 'node_modules', 'motion', 'dist', 'motion.js'),
];
let motionCopied = false;
for (const candidate of motionCandidates) {
  if (fs.existsSync(candidate)) {
    fs.copyFileSync(candidate, path.join(DIST, 'motion.js'));
    console.log(`✓ dist/motion.js (from ${path.relative(ROOT, candidate)})`);
    motionCopied = true;
    break;
  }
}
if (!motionCopied) {
  console.warn('⚠ WARNING: motion.js not found — login page animations may not work');
}

// ─── 5. Copy the root assets/ directory (movie poster images) ─────────────────
const assetsDir = path.join(ROOT, 'assets');
if (fs.existsSync(assetsDir)) {
  fs.cpSync(assetsDir, path.join(DIST, 'assets'), { recursive: true });
  console.log('✓ dist/assets/ (movie posters)');
}

// ─── 6. Copy built sub-applications into dist/ ────────────────────────────────
const subApps = [
  { src: path.join(ROOT, 'home'),        dest: path.join(DIST, 'home') },
  { src: path.join(ROOT, 'landing'),     dest: path.join(DIST, 'landing') },
  { src: path.join(ROOT, 'movie-cards'), dest: path.join(DIST, 'movie-cards') },
];

for (const { src, dest } of subApps) {
  const name = path.basename(src);
  if (fs.existsSync(src)) {
    // Check it has an index.html (i.e. was actually built)
    if (fs.existsSync(path.join(src, 'index.html'))) {
      fs.cpSync(src, dest, { recursive: true });
      console.log(`✓ dist/${name}/`);
    } else {
      console.warn(`⚠ WARNING: ${name}/index.html missing — skipping copy`);
    }
  } else {
    console.warn(`⚠ WARNING: ${name}/ directory not found — was the build run first?`);
  }
}

// ─── 7. Verification ──────────────────────────────────────────────────────────
console.log('\n── Verification ──────────────────────────────────────────');
const checks = [
  path.join(DIST, 'index.html'),
  path.join(DIST, 'styles.css'),
  path.join(DIST, 'app.js'),
  path.join(DIST, 'logo.js'),
  path.join(DIST, 'home', 'index.html'),
  path.join(DIST, 'movie-cards', 'index.html'),
];
let allPassed = true;
for (const check of checks) {
  const rel = path.relative(ROOT, check);
  if (fs.existsSync(check)) {
    console.log(`  ✓ ${rel}`);
  } else {
    console.error(`  ✗ MISSING: ${rel}`);
    allPassed = false;
  }
}

if (!allPassed) {
  console.error('\n✗ Build verification FAILED — some required files are missing.');
  process.exit(1);
}

console.log('\n✓ dist/ assembled successfully for Vercel deployment.');
console.log('  / → dist/index.html (Login Page)');
console.log('  /home → dist/home/index.html (Home Page)');
console.log('  /movie-cards → dist/movie-cards/index.html (Movie Cards)');
