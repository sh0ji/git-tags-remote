import { valid, compare } from 'semver';
import { spawn } from 'child_process';

const lsRemoteTags = (repoPath: string): Promise<string> => new Promise((resolve, reject) => {
	let stderr = '';
	let stdout = '';

	const child = spawn('git', ['ls-remote', '--tags', repoPath]);

	child.stdout.on('data', (data) => {
		stdout += data;
	});

	child.stderr.on('data', (data) => {
		stderr += data;
	});

	child.on('error', reject);

	child.on('close', (exitCode) => {
		if (exitCode !== 0 || stderr.length) reject(new Error(stderr));
		resolve(stdout.toString().trim());
	});
});

const parseTags = (tags: string): Map<string, string> => {
	const tagMap = new Map<string, string>();
	tags.split('\n')
		.forEach((str) => {
			const ref = str.split(/\t/);
			tagMap.set(ref[1].split('/')[2].replace(/\^\{\}$/, ''), ref[0]);
		});
	return new Map(
		[...tagMap.entries()]
			.filter((arr) => valid(arr[0]))
			.sort((a, b) => compare(a[0], b[0]))
			.reverse(),
	);
};

export const get = async (repo: string): Promise<Map<string, string>> => {
	const tags = await lsRemoteTags(repo);
	return parseTags(tags);
};

export const latest = async (repo: string): Promise<[string, string]> => {
	const tags = await get(repo);
	return tags.entries().next().value as [string, string];
};

export default { get, latest };
