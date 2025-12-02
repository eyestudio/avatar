# Deployment Instructions

Since I cannot access your GitHub account directly to create a repository, here are two easy ways to deploy your application for free.

## Option 1: GitHub Pages (Recommended)

1.  **Create a new repository** on GitHub (e.g., named `avatar-generator`).
2.  **Push your code**:
    Run these commands in your terminal (I have already initialized the git repo for you):
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/avatar-generator.git
    git branch -M main
    git push -u origin main
    ```
3.  **Important: Make Repository Public** (Required for free GitHub Pages):
    - Go to **Settings** > **General**.
    - Scroll down to the **Danger Zone**.
    - Click **Change repository visibility**.
    - Select **Make public**.
4.  **Enable GitHub Pages**:
    - Go to your repository **Settings** > **Pages**.
    - **CRITICAL STEP**: Under **Build and deployment** > **Source**, change the dropdown from "Deploy from a branch" to **"GitHub Actions"**.
    - GitHub will automatically detect the workflow I created (`.github/workflows/deploy.yml`).
    - *Alternatively*, to deploy the `dist` folder manually:
        - Install `gh-pages`: `npm install gh-pages --save-dev`
        - Add this script to `package.json`: `"deploy": "gh-pages -d dist"`
        - Run `npm run build && npm run deploy`

## Option 2: Netlify / Vercel (Drag & Drop)

1.  Locate the `dist` folder in your project directory: `/Users/zhanghai/Documents/GitHub/avatar/dist`
2.  Go to [Netlify Drop](https://app.netlify.com/drop).
3.  Drag and drop the `dist` folder onto the page.
4.  Your site will be live instantly!

## Option 3: Surge.sh (Command Line)

1.  Run `npx surge dist` in your terminal.
2.  Create an account/login when prompted.
3.  It will give you a public URL.
