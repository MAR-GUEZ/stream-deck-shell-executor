import streamDeck, { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { exec } from "child_process";
import { promisify } from "util";
import { homedir, userInfo } from "os";

const execAsync = promisify(exec);

/**
 * Settings structure for the Execute Command action
 */
type Settings = {
  command?: string;
  timeout?: number;
  workingDir?: string;
  logOutput?: boolean;
};

/**
 * Execute Command Action
 * Executes shell commands when the Stream Deck button is pressed
 */
@action({ UUID: "com.lmg.shell-executor.execute" })
export class ExecuteCommand extends SingletonAction<Settings> {
  /**
   * Called when the action appears on the Stream Deck
   */
  override async onWillAppear(ev: WillAppearEvent<Settings>): Promise<void> {
    streamDeck.logger.info(`Execute Command action appeared with settings: ${JSON.stringify(ev.payload.settings)}`);
  }

  /**
   * Called when the user presses the action button
   */
  override async onKeyDown(ev: KeyDownEvent<Settings>): Promise<void> {
    const { command, timeout = 30, workingDir, logOutput = true } = ev.payload.settings;

    // Validate command
    if (!command || command.trim() === '') {
      streamDeck.logger.error('No command configured');
      await ev.action.showAlert();
      return;
    }

    streamDeck.logger.info(`Executing command: ${command}`);

    try {
      // Replace variables in command
      const processedCommand = this.replaceVariables(command);

      if (logOutput) {
        streamDeck.logger.info(`Processed command: ${processedCommand}`);
      }

      // Determine working directory
      const cwd = workingDir && workingDir.trim() !== '' ? workingDir : homedir();

      // Execute command with timeout
      const timeoutMs = timeout * 1000;

      const { stdout, stderr } = await execAsync(processedCommand, {
        cwd,
        timeout: timeoutMs,
        maxBuffer: 1024 * 1024 * 10, // 10MB buffer
        shell: '/bin/zsh', // Use zsh as default shell on macOS
        env: {
          ...process.env,
          PATH: `/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${process.env.PATH || ''}`
        }
      });

      // Log output if enabled
      if (logOutput) {
        if (stdout && stdout.trim() !== '') {
          streamDeck.logger.info(`Command output (stdout):\n${stdout}`);
        }
        if (stderr && stderr.trim() !== '') {
          streamDeck.logger.warn(`Command output (stderr):\n${stderr}`);
        }
      }

      // Show success feedback
      await ev.action.showOk();
      streamDeck.logger.info('Command executed successfully');

    } catch (error: any) {
      // Handle errors
      streamDeck.logger.error(`Command execution failed: ${error.message}`);

      if (logOutput) {
        if (error.stdout) {
          streamDeck.logger.info(`Command output (stdout):\n${error.stdout}`);
        }
        if (error.stderr) {
          streamDeck.logger.error(`Command output (stderr):\n${error.stderr}`);
        }
      }

      // Check for timeout
      if (error.killed && error.signal === 'SIGTERM') {
        streamDeck.logger.error(`Command timed out after ${timeout} seconds`);
      }

      // Show error feedback
      await ev.action.showAlert();
    }
  }

  /**
   * Replace variables in the command string
   */
  private replaceVariables(command: string): string {
    const now = new Date();

    // Date and time variables
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const time = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const timestamp = Math.floor(now.getTime() / 1000).toString();

    // User variables
    const user = userInfo().username;
    const home = homedir();

    // Replace all variables
    return command
      .replace(/\{\{date\}\}/g, date)
      .replace(/\{\{time\}\}/g, time)
      .replace(/\{\{timestamp\}\}/g, timestamp)
      .replace(/\{\{user\}\}/g, user)
      .replace(/\{\{home\}\}/g, home);
  }
}
