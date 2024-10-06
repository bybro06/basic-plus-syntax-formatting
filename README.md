# Basic Plus Syntax Formatting
Basic Plus Syntax Formatting is a Visual Studio Code extension designed for developers using the Basic Plus language (.bp, .bpi, .bpm files), commonly used in Clev3r LEGO EV3 programming. This extension enhances the readability and formatting of Basic Plus code by providing rich syntax highlighting and customizable themes, making it easier to work with control structures, methods, strings, comments, and more.

## Features
Syntax Highlighting: Automatically highlights keywords, methods, strings, and control structures, including If, For, While, Sub, and Function. Custom colors are applied for different code elements for better code readability.

    · Method and Function Highlighting: Methods before and after dots (e.g., Thread.Run) are color-coded for clarity. Subroutines are also colorized when used after Thread.Run =.

    · Customizable Color Scheme: By default, keywords are highlighted in light blue, functions in purple, methods in green, and comments are shown in mint green. You can further adjust these colors to your liking.

    · String and Number Formatting: Strings enclosed in double quotes are highlighted with customizable colors, along with escape sequences. Numbers, both integers and floats, share the same formatting as strings for consistency.

    · Comment Formatting: Lines starting with a ' (apostrophe) are automatically highlighted in a different color (mint green), ignoring any other formatting on the line, as they are treated as comments.

    · Automatic Code Completion for Control Structures: Writing a For, While, or Function automatically inserts the corresponding EndFor, EndWhile, or EndFunction in the next line, streamlining coding in Basic Plus.

## Requirements
No external dependencies or configurations are required. This extension works out-of-the-box for Basic Plus (.bp, .bpi, .bpm) files in VS Code.

## Extension Settings
At the moment, this extension does not add additional configuration settings within VS Code. Future versions may introduce customizable options for syntax coloring and more advanced formatting controls.

## Known Issues
Subroutine Highlighting After Thread.Run: Subroutines following the Thread.Run = assignment may not always be highlighted correctly due to the current limitations of pattern recognition. We're actively working to improve this feature.

If you encounter any issues with syntax highlighting or formatting, please report them on the GitHub issue tracker.

# Release Notes
## 1.0.0
    · Initial release with basic syntax highlighting for Basic Plus language.
    
## 1.1.0
    · Added highlighting for subroutines after Thread.Run.
    · Improved number formatting and keyword recognition.
    · Enhanced control structure completion with automatic End statements.

## Enjoy coding with Basic Plus Syntax Formatting!