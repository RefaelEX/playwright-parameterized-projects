import { test } from "../src/my-test";

test(`test teardown`, async () => {
    console.log('teardown person: ',process.env.PERSON);
});