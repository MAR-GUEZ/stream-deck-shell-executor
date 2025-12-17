import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const watch = process.argv.includes('--watch');

// Ensure output directories exist
const sdPluginDir = 'com.lmg.shell-executor.sdPlugin';
const binDir = join(sdPluginDir, 'bin');
const uiDir = join(sdPluginDir, 'ui');
const imgsDir = join(sdPluginDir, 'imgs');

[sdPluginDir, binDir, uiDir, imgsDir].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// Copy static files
function copyStaticFiles() {
  try {
    if (existsSync('manifest.json')) {
      copyFileSync('manifest.json', join(sdPluginDir, 'manifest.json'));
    }
    if (existsSync('ui/property-inspector.html')) {
      copyFileSync('ui/property-inspector.html', join(uiDir, 'property-inspector.html'));
    }
    if (existsSync('imgs/action.png')) {
      copyFileSync('imgs/action.png', join(imgsDir, 'action.png'));
    }
    if (existsSync('imgs/action@2x.png')) {
      copyFileSync('imgs/action@2x.png', join(imgsDir, 'action@2x.png'));
    }
    console.log('Static files copied successfully');
  } catch (error) {
    console.error('Error copying static files:', error);
  }
}

// Compile TypeScript
function compile() {
  console.log('Compiling TypeScript...');
  try {
    execSync('npx tsc --outDir bin', { stdio: 'inherit' });

    // Move compiled files to sdPlugin/bin
    execSync(`cp -r bin/* ${binDir}/`, { stdio: 'inherit' });

    // Add shebang to plugin.js
    const pluginPath = join(binDir, 'plugin.js');
    if (existsSync(pluginPath)) {
      const content = readFileSync(pluginPath, 'utf-8');
      writeFileSync(pluginPath, '#!/usr/bin/env node\n' + content);
      execSync(`chmod +x ${pluginPath}`);
    }

    console.log('TypeScript compilation complete!');
  } catch (error) {
    console.error('Compilation failed:', error.message);
    process.exit(1);
  }
}

// Build
if (watch) {
  console.log('Watch mode not implemented, running single build...');
  compile();
  copyStaticFiles();
} else {
  compile();
  copyStaticFiles();
  console.log('Build complete!');
}
