import test from 'ava';
import gtr from '.';

const github = 'https://github.com/sh0ji/focus-rover.git';
const gitlab = 'git@gitlab.com:wwnorton/platform/epub-build.git';
const invalid = 'github.com/sh0ji/focus-rover';

test('public github get', async (t) => {
    const tags = await gtr.get(github);
    t.is(tags.get('v1.0.0-rc.1'), '48d18c388f4e0b1a963a409bfe3d8fedb3acd50a');
    t.is(tags.get('v1.0.0-rc.2'), '8e048a0fd9cb668366eef550be445ac761efd667');
});

test('public github latest', async (t) => {
    const latest = await gtr.latest(github);
    t.is(latest[0], 'v1.0.0-rc.2');
    t.is(latest[1], '8e048a0fd9cb668366eef550be445ac761efd667');
});

test('private gitlab get', async (t) => {
    const tags = await gtr.get(gitlab);
    t.is(tags.get('v1.0.0-beta.1'), 'cf1f4d2017367cda6bbf78d6624d89e26529d6be');
    t.is(tags.get('v1.0.0-rc.2'), '812e4e8af098a45352b1309d22141d47274994e4');
});

test('private gitlab latest', async (t) => {
    const latest = await gtr.latest(gitlab);
    t.is(latest[0], 'v1.0.0-rc.2');
    t.is(latest[1], '812e4e8af098a45352b1309d22141d47274994e4');
});

test('invalid url', async (t) => {
    const error = await t.throws(gtr.get(invalid));
    t.is(
        error,
        `fatal: '${invalid}' does not appear to be a git repository\n` +
        'fatal: Could not read from remote repository.\n\n' +
        'Please make sure you have the correct access rights\n' +
        'and the repository exists.\n'
    );
});
