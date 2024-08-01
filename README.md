# Typesource

Typesource is a web app to practice touch typing on source code.

## Up and running

Install dependencies:

```bash
npm install
```

Start the dev server

```bash
npm run dev
```

## Requirements

The MVP will include the "file browser" that is the component to search and pick the source code from Github and the
"editor" that is the component that renders the source code and let's you play.

The file browser:

- [ ] [v0.0.1] Allows the user to search a public repository on github
- [ ] [v0.0.1] Once the repo is selected it allows the user to navigate folders and files
- [ ] [v0.0.1] Allows the user to pick a file

The editor:

- [ ] [v0.0.1] Displays the source code from a file
- [ ] [v0.0.1] The source code is hightlighted as a code editor will
- [ ] [v0.0.1] Once the user starts typing all character are grayed out
- [ ] [v0.0.1] On each keypress the cursor is moved to the right one step and the character before the cursor is colored if it
      matches the typed character otherwise the character turns red.
- [ ] [v0.0.1] Whitespaces at the beginning and the of each line are ignored
- [ ] [v0.0.2] Allows the user to place the cursor where they whant

We need a way to give the user feedback on how they are going, introducting the "statistics" component.

The statistics:

- [ ] [v0.0.2]Shows the accuracy of the typed characters
- [ ] [v0.0.2]Shows the elapsed time since the user started typing
- [ ] [v0.0.2]Shows the words per minutes counter
