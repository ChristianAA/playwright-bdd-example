#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function scanPagesDirectory(dir) {
    const pages = [];

    if (!fs.existsSync(dir)) return pages;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('Page.ts') || f.endsWith('Actions.ts'));

    files.forEach(file => {
        const baseName = file.replace('.ts', '');
        const className = baseName.charAt(0).toUpperCase() + baseName.slice(1);
        const key = baseName.charAt(0).toLowerCase() + baseName.slice(1);

        pages.push({ key, className, file });
    });

    return pages;
}

function generateTypesFile() {
    const pagesDir = path.join(__dirname, '..', 'src', 'pages');
    const outputFile = path.join(__dirname, '..', 'src', 'support', 'pages.types.ts');

    let imports = [];
    let interfaceProps = [];

    const pages = scanPagesDirectory(pagesDir);

    pages.forEach(({ key, className, file }) => {
        imports.push(`import { ${className} } from '../pages/${file.replace('.ts', '')}';`);
        interfaceProps.push(`    ${key}: ${className};`);
    });

    const content = `// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// Run 'npm run generate:types' to regenerate this file

${imports.join('\n')}

export interface Pages {
${interfaceProps.join('\n')}
}
`;

    fs.writeFileSync(outputFile, content, 'utf-8');
    console.log(`✅ Types generated successfully at:  ${outputFile}`);
}

generateTypesFile();
