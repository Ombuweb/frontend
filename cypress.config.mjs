import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        testIsolation: false, // Fixes the "efault blank page" issue
        baseUrl: "http://localhost:3000", // Adjust this to your application's base
    },
    env: {
        cognito_username: 'tjiheron@gmail.com',
        cognito_password: 't2Y45678$',
    }
});
