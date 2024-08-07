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
          use: { person: 'bob' }
        },
    
        {
          name: 'setup_alice',
          testDir: './testSetup',
          use: { person: 'alice' }
        },
      ],
})