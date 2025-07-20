import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        testIsolation: false, // Fixes the "efault blank page" issue
        baseUrl: "http://localhost:3000", // Adjust this to your application's base
    },
    env: {
        cognito_username: '',
        cognito_password: '',
    }
});
