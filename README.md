# Stream Deck Shell Executor Plugin

Execute shell commands directly from your Stream Deck buttons on macOS.

## Features

- Execute any shell command with a button press
- Configurable command timeout (1-300 seconds)
- Custom working directory support
- Built-in variable support for dynamic commands
- Command output logging
- Visual feedback (success/error indicators)

## Installation

The plugin is currently installed and running in developer mode. To use it:

1. Open the Stream Deck application
2. Look for "Shell Executor" in the actions sidebar under "Development" category
3. Drag the "Execute Command" action onto a button

## Configuration

When you add the action to a button, you can configure:

### Shell Command (Required)
The shell command to execute. Can be any valid shell command.

**Examples:**
- `ls -la ~/Documents`
- `open -a "Google Chrome"`
- `git status`
- `npm run build`

### Timeout (Optional, default: 30 seconds)
Maximum time to wait for command execution (1-300 seconds).

### Working Directory (Optional)
Set a custom working directory for command execution. If empty, uses your home directory.

### Log Output (Optional, default: enabled)
When enabled, command output (stdout/stderr) will be logged to Stream Deck logs.

## Variables

Use these variables in your commands for dynamic execution:

| Variable | Description | Example Output |
|----------|-------------|----------------|
| `{{date}}` | Current date | 2025-12-17 |
| `{{time}}` | Current time | 15:30:45 |
| `{{timestamp}}` | Unix timestamp | 1702829445 |
| `{{user}}` | Current username | yourname |
| `{{home}}` | Home directory path | /Users/yourname |

**Example command with variables:**
```bash
echo "Build started at {{time}} by {{user}}" >> {{home}}/build.log
```

## Visual Feedback

- **Green checkmark**: Command executed successfully
- **Red X**: Command failed or timed out

All output is logged to Stream Deck logs, which you can view in the Stream Deck application.

## Development

### Project Structure

```
stream-deck-code-button/
├── src/
│   ├── plugin.ts                    # Main plugin entry point
│   └── actions/
│       └── execute-command.ts        # Shell command execution logic
├── ui/
│   └── property-inspector.html       # Settings UI
├── imgs/
│   ├── action.png                    # Button icon (72x72)
│   └── action@2x.png                 # Button icon (144x144)
├── com.lmg.shell-executor.sdPlugin/  # Compiled plugin
├── manifest.json                     # Plugin metadata
├── package.json                      # Node.js dependencies
├── tsconfig.json                     # TypeScript configuration
└── build.mjs                         # Build script
```

### Building

```bash
npm run build
```

This compiles TypeScript and copies files to the `.sdPlugin` directory.

### Development Workflow

1. Make changes to source files
2. Run `npm run build`
3. Restart the plugin: `streamdeck restart com.lmg.shell-executor`

## Command Examples

### File Operations
```bash
# Create a backup
tar -czf ~/backup-{{date}}.tar.gz ~/Documents

# Clean up old files
find ~/Downloads -mtime +30 -delete
```

### Development
```bash
# Run tests
cd ~/projects/myapp && npm test

# Deploy application
cd ~/projects/myapp && git push && ./deploy.sh
```

### System Control
```bash
# Lock screen
pmset displaysleepnow

# Toggle Wi-Fi
networksetup -setairportpower en0 toggle
```

### Applications
```bash
# Open specific application
open -a "Visual Studio Code" ~/projects/myapp

# Restart application
killall "Google Chrome" && open -a "Google Chrome"
```

## Error Handling

- Commands that fail will show a red X indicator
- All errors are logged with full stderr output
- Timeouts are clearly indicated in logs
- Exit codes are captured and logged

## Logs

View plugin logs in Stream Deck:
1. Open Stream Deck preferences
2. Go to the Plugins tab
3. Find "Shell Executor"
4. Click "View Logs"

## Security

- Commands run with your user permissions
- No sudo/root access unless explicitly configured in your system
- Command output is only logged locally
- Variables are replaced before execution

## Troubleshooting

### Command not executing
- Check the logs for error messages
- Verify the command works in Terminal first
- Ensure the working directory exists
- Check timeout is sufficient for long-running commands

### Variables not being replaced
- Ensure you're using the correct syntax: `{{variable}}`
- Variables are case-sensitive

### Permission denied errors
- The command may require additional permissions
- Check file/directory permissions
- Some commands may require Full Disk Access for Stream Deck in System Preferences

## License

MIT

## Plugin UUID

`com.lmg.shell-executor`

## Version

1.0.0
