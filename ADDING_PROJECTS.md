# How to Add Your Project to BuildVerse

Welcome to BuildVerse! We're excited to have you showcase your open-source project on our platform. 

Follow these simple steps to submit your project to the platform:

## Step 1: Fork the Repository
1. Navigate to the [BuildVerse GitHub Repository](https://github.com/MistryVishwa/BuildVerse).
2. Click the **Fork** button in the top-right corner to create a copy of the repository under your own GitHub account.

## Step 2: Clone Your Fork
Clone the repository to your local machine:
```bash
git clone https://github.com/YOUR_USERNAME/BuildVerse.git
cd BuildVerse
```

## Step 3: Add Your Project Data
1. Open the file `src/data/projects.js` in your code editor.
2. Add a new object to the `projectsData` array representing your project. Please follow the exact format below:

```javascript
  {
    slug: "your-project-slug-name", // URL friendly string
    title: "Your Awesome Project Name",
    description: "A short, engaging description of what your project does (approx. 15-25 words).",
    author: { 
      name: "Your Name", 
      github: "YourGithubUsername" 
    },
    tags: ["React", "CSS", "Tool"], // Max 3-4 relevant tags
    demoUrl: "https://your-live-demo-link.com", // Live URL to your project
    createdAt: "YYYY-MM-DD" // Today's date
  }
```

> [!IMPORTANT]
> Make sure your `slug` is unique and only contains lowercase letters, numbers, and hyphens.

## Step 4: Commit and Push
Commit your changes and push them to your fork:
```bash
git add src/data/projects.js
git commit -m "feat: Add Your Awesome Project Name"
git push origin master
```

## Step 5: Open a Pull Request
1. Go back to the original [BuildVerse GitHub Repository](https://github.com/MistryVishwa/BuildVerse).
2. You will see a prompt to **Compare & pull request**. Click it.
3. Fill out the Pull Request template with details about your project.
4. Submit the PR!

Our maintainers will review your submission shortly. Once merged, your project will be instantly live on the BuildVerse platform!

## Need Help?
If you have any questions or run into issues, please open an Issue on GitHub, and we'll be happy to assist you.
