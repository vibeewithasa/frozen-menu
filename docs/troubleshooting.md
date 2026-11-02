# Troubleshooting

Use the smallest applicable diagnostic step before changing dependencies or configuration.

## Development server does not start

- Confirm Node.js and npm are installed and available on your PATH.
- Run `npm ci` to install the lockfile-defined dependencies.
- Run `npm run dev` again and read the terminal output for the actual error.
- If Vite reports a busy port, use the alternate local address it prints.

## Type checking or linting fails

```bash
npm run typecheck
npm run lint
```

Read the first reported file and line, fix the source, then rerun the command. Do not silence warnings globally just to make a check pass.

## A flavor image is missing

For a flavor without an explicit `image` property, the expected file is:

`public/images/flavors/<categoryId>/<id>.jpg`

Check letter case, file extension, category ID and the resulting URL in browser developer tools. The fallback UI is not proof that the original image exists.

## Content section does not appear

Check `src/config/site.ts`. Empty arrays and null business details deliberately suppress some sections and navigation links. Do not fill them with fabricated placeholders.

## The deployed page differs from local

Run `npm run build` and `npm run preview`. Compare the deployed commit, hosting build logs, network requests and caching behavior. The Netlify configuration lives in `netlify.toml`.
