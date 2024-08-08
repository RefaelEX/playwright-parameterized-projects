import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";
import { TestOptions } from "./src/my-test";


export default defineConfig<TestOptions>({
    ...baseConfig,
    projects: [
        {
          name: 'test_bob',
          testDir: './tests',
          dependencies: ['setup_bob'],
        },
    
        {
          name: 'test_Alice',
          testDir: './tests',
          dependencies: ['setup_alice'],
        },
    
        {
          name: 'setup_bob',
          testDir: './testSetup',
          use: { person: 'bob' },
          teardown: 'teardown_bob'
        },
    
        {
          name: 'setup_alice',
          testDir: './testSetup',
          use: { person: 'alice' },
          teardown: 'teardown_alice'
        },
        {
          name: 'teardown_bob',
          testDir: './teardown',
          use: { person: 'bob' }
        },
        {
          name: 'teardown_alice',
          testDir: './teardown',
          use: { person: 'alice' }
        }
      ],
})