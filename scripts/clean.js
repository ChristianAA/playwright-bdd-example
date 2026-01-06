#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDirs = ['.features-gen', 'results', 'test-results'];

const rootDir = path.join(__dirname, '..');

console.log('Cleaning generated files...\n');

// Clean root directories
rootDirs.forEach(dir => {
    const fullPath = path.join(rootDir, dir);
    if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`  Removed: ${dir}`);
    }
});
