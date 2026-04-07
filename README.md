## Spec-Driven Development

```
https://github.com/github/spec-kit
```

## Steps

### Constitution

Use the /speckit.constitution command to create your project's governing principles and development guidelines that will guide all subsequent development.

###

### Specify

Use the /speckit.specify command to describe what you want to build. Focus on the what and why, not the tech stack.

```
/speckit.specify Create a Note-Taking Application with basic features (no folder, no tag) and the best ui/ux design suitable for notes taking app.
+ auto generate title base on content or datetime
+ auto save note
```

### Clarify (optional)

```
/speckit.clarify
```

### Create a technical implementation plan

```
/speckit.plan Technical Requirements & Constraints: * **Directory Structure:** All source code MUST be placed within the `notes-app` directory. * **Technology Stack:** * Framework: React + Vite * Language: TypeScript * Styling: Tailwind CSS * UI Components: Shadcn * Testing: Vitest * Package Manager: pnpm* **Testing Policy:** * It is NOT required to write unit tests for ALL React Components. * All existing unit tests MUST pass successfully before starting any new task. * **File Operations:** Always verify (check for existence) that a file has been successfully created after performing a create-file operation.
Using new dependency version if possible.
Using context7 to get more information for implementation.
```

### Break down into tasks

```
/speckit.tasks
```

### Analyze (optional)

```
/speckit.analyze
```

### Execute implementation

```
/speckit.implement
```
