const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Firebase / Expo SDK 53: allow ".cjs" files and use classic Node "exports" resolution
config.resolver.sourceExts = config.resolver.sourceExts || [];
if (!config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}
// Disable the new, stricter "package.json exports" resolution
config.resolver.unstable_enablePackageExports = false;

module.exports = config; 