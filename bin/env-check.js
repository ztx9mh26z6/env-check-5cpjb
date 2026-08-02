#!/usr/bin/env node
'use strict';
const fs = require('fs');
const file = process.argv[2] || '.env.required';
if (!fs.existsSync(file)) {
  console.error('missing list file', file);
  process.exit(2);
}
const keys = fs
  .readFileSync(file, 'utf8')
  .split(/\r?\n/)
  .map((l) => l.replace(/#.*$/, '').trim())
  .filter(Boolean);
const miss = keys.filter((k) => !process.env[k]);
if (miss.length) {
  console.error('missing env:', miss.join(', '));
  process.exit(1);
}
console.log('ok', keys.length, 'vars');
