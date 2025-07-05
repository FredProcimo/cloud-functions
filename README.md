# Cloud Functions using Firebase Deployment

TypeScript Cloud Functions with automated deployment to Firebase using GitHub Actions.

## Requirements
1. [NodeJS](https://nodejs.org/pt/download): To run javascript projects.
2. [Firebase CLI](https://firebase.google.com/docs/cli#mac-linux-npm): To run firebase commands.

## Local Development

```bash
# Go to Functions
cd functions

# Install dependencies
npm install

# Run in development mode
npm run emulator
```

## Deployment

1. **Go to Github Actions**: You can find the button on the tabs above.

2. **Click on Deploy to Firebase**: You can find the button on the sidebar inside actions.

3. **Click on Run Workflow**: You can find the button on the right of the page inside actions.

### GitHub Repository Setup

1. **Add Secrets**: Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add `GCP_SA_KEY` with the content of your `key.json` file

## Troubleshooting

1. **Build Failures**: Check that all dependencies are in `package.json`
2. **Deployment Issues**: Verify GCP service account permissions
3. **Runtime Errors**: Check console logs in GCP Console