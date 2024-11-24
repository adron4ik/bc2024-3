const fs = require('fs');
const { program } = require('commander');
program
  .requiredOption('-i, --input <path>', 'Path to the input JSON file')
  .option('-o, --output <path>', 'Path to the output file')
  .option('-d, --display', 'Display the result in the console')
  .parse(process.argv);
const options = program.opts();
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}
let data;
try {
  data = fs.readFileSync(options.input, 'utf-8');
} catch (err) {
  console.error('Error reading the input file:', err.message);
  process.exit(1);
}
if (!options.output && !options.display) {
  process.exit(0); 
}

const result = "This is a test result"; 
if (options.output) {
  try {
    fs.writeFileSync(options.output, result, 'utf-8');
    console.log(`Result written to ${options.output}`);
  } catch (err) {
    console.error('Error writing to output file:', err.message);
  }
}
