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

		console.log('[NPM BUILDER TF] Building package...')
		// Build
		const o1 = await zx.$`cp -r ${input.artifactPath} ${outputDir}`
		console.log(o1.stdout, o1.stderr)
		const o3 = await zx.$`cd ${outputDir}/${input.artifactPath} && npm install && npm run build`
		console.log(o3.stdout, o3.stderr)

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
		} else {
			throw error
		}
	}
};

run().catch((err) => {
	console.log('ERROR IN TRANSFORMER', err);
	process.exit(1);
});
