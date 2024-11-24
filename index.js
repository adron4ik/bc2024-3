const fs = require('fs');
const { program } = require('commander');
program
  .requiredOption('-i, --input <path>', 'Path to the input JSON file')
  .option('-o, --output <path>', 'Path to the output file')
  .option('-d, --display', 'Display the result in the console')
  .parse(process.argv);
const options = program.opts();
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}
let data;
try {
  data = JSON.parse(fs.readFileSync(options.input, 'utf-8'));
} catch (err) {
  console.error("Error reading or parsing the file:", err.message);
  process.exit(1);
}
const filteredData = data.filter(item => item.parent === "BS3_BanksLiab")
  .map(item => `${item.indicator}: ${item.value}`);
const result = filteredData.join('\n');
if (options.output) {
  fs.writeFileSync(options.output, result, 'utf-8');
}
if (options.display) {
  console.log(result);
}
if (!options.output && !options.display) {
  process.exit(0);
}
