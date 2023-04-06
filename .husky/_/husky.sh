#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename -- "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  readonly husky_skip_init=1
  export husky_skip_init
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi

  if [ $exitCode = 127 ]; then
    echo "husky - command not found in PATH=$PATH"
  fi


  #!/usr/bin/env sh
  #
  # Git hook script to check if there is a debugger statement in staged JavaScript files
  # This script is based on pre-commit hook script from https://github.com/sindresorhus/np
  #

  # Get staged JavaScript files
  js_files=$(git diff --cached --name-only --diff-filter=ACM -- '*.js' '*.jsx' '*.ts' '*.tsx' '*.vue')

  # Check if there is a debugger statement in any of the staged JavaScript files
  for file in $js_files
  do
    if grep -q 'debugger' "$file"; then
      echo "Error: Found 'debugger' statement in $file. Please remove it before committing." >&2
      exit 1
    fi
  done

  exit $exitCode
fi
