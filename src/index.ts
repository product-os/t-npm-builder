import { createOutputDir, readInput, writeOutputs } from './transformer';
import * as zx from 'zx'
import { ProcessOutput } from 'zx'

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

	try {
		// cd in
		await zx.$`cd ${input.artifactPath}`

		// Install packages
		await zx.$`npm install`

		console.log('[NPM BUILDER TF] Building package...')
		// Build
		await zx.$`npm run build`

		await zx.$`cd ..`

		await zx.$`cp -r ${input.artifactPath} ${outputDir}`

		const outContract = {
			type: 'type-product-os-t-node-module@1.0.7',
			data: {
				packageName: input.contract.data.packageName
			},
		};

		await writeOutputs([
			{ contract: outContract, artifactType: 'artifact', path: outputDir },
		]);
	} catch (error) {
		if (error instanceof ProcessOutput) {
			console.error('Command returned an error!')
			console.error(error.toString())
		}
		// TODO: Throw an error contract or something
	}
};

run().catch((err) => {
	console.log('ERROR IN TRANSFORMER', err);
	process.exit(1);
});
