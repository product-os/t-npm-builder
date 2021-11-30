import { createOutputDir, readInput, writeOutputs } from './transformer';
import * as fs from 'fs/promises'

console.log('Template Transformer starting');

const run = async () => {
	const input = await readInput();
	console.log('input:', input.contract);
	console.log('input directory:', input.artifactPath);
	const outputDir = await createOutputDir();
	console.log('output directory:', outputDir);

	// TODO your code goes here. You can
	// - inspect the input contract
	// - process the artifact that you can find in the artifactPath
	//   - note that the input folder is read-only!
	// - produce some new artifact and place it in `outputDir`

	console.log('iterating')
	for (const i of await fs.readdir(input.artifactPath)) {
		console.log('PATH:', i)
	}

	const outContract = {
		type: 'type-my-out-type@1.2.3',
		data: {},
	};

	await writeOutputs([
		{ contract: outContract, artifactType: 'artifact', path: outputDir },
	]);
};

run().catch((err) => {
	console.log('ERROR IN TRANSFORMER', err);
	process.exit(1);
});
