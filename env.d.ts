
// Fixed: Removed vite/client reference which could not be found in the current environment.
// Fixed: Removed readonly modifier from env to avoid conflict with existing global Process interface declarations (e.g., from Node types).
// Fixed: Removed declare var process to avoid "Cannot redeclare block-scoped variable" error as it is already defined in the global scope.

interface ProcessEnv {
  API_KEY: string;
}

interface Process {
  env: ProcessEnv;
}
