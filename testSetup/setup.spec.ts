import { test } from "../src/my-test";

test('test setup', async ({ person }) => {
    console.log('setting person: ', person);
    process.env.PERSON = person;
  });