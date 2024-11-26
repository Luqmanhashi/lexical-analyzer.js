// Token class to represent each token
class Token {
    constructor(type, value) {
      this.type = type; // Type of the token (e.g., NUMBER, OPERATOR)
      this.value = value; // The actual value of the token
    }
  
    toString() {
      return `Token(type: '${this.type}', value: '${this.value}')`;
    }
  }
  
  // Lexical Analyzer class
  class LexicalAnalyzer {
    constructor() {
      // Regular expressions for token patterns
      this.tokenPatterns = {
        NUMBER: /^\d+(\.\d+)?/, // Integer or floating-point numbers
        OPERATOR: /^[+\-*/]/,   // Arithmetic operators
        PARENTHESIS: /^[()]/,   // Parentheses
        WHITESPACE: /^\s+/,     // Whitespace
      };
    }
  
    // Method to tokenize an input string
    tokenize(input) {
      let tokens = [];
      let position = 0;
  
      while (position < input.length) {
        let substring = input.slice(position);
        let matched = false;
  
        for (let [type, regex] of Object.entries(this.tokenPatterns)) {
          let match = substring.match(regex);
  
          if (match) {
            if (type !== "WHITESPACE") {
              tokens.push(new Token(type, match[0]));
            }
            position += match[0].length; // Advance by the length of the match
            matched = true;
            break;
          }
        }
  
        if (!matched) {
          throw new Error(`Invalid character at position ${position}: '${substring[0]}'`);
        }
      }
  
      return tokens;
    }
  
    // Utility method to display tokens
    displayTokens(tokens) {
      console.log("Generated Tokens:");
      tokens.forEach(token => console.log(token.toString()));
    }
  
    // Simple evaluation demonstration using tokens
    evaluate(tokens) {
      if (tokens.length < 3) {
        throw new Error("Insufficient tokens for evaluation.");
      }
  
      let operand1 = parseFloat(tokens[0].value);
      let operator = tokens[1].value;
      let operand2 = parseFloat(tokens[2].value);
  
      switch (operator) {
        case "+":
          return operand1 + operand2;
        case "-":
          return operand1 - operand2;
        case "*":
          return operand1 * operand2;
        case "/":
          if (operand2 === 0) {
            throw new Error("Division by zero.");
          }
          return operand1 / operand2;
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
    }
  }
  
  // Main program
  try {
    const expression = "3.5 + 5 * (10 - 4.2)";
    console.log("Input Expression:", expression);
  
    const lexer = new LexicalAnalyzer();
    const tokens = lexer.tokenize(expression);
  
    lexer.displayTokens(tokens);
  
    // Evaluate a simple part of the expression
    const simpleTokens = [
      new Token("NUMBER", "5"),
      new Token("OPERATOR", "*"),
      new Token("NUMBER", "2")
    ];
    console.log("\nEvaluating '5 * 2':", lexer.evaluate(simpleTokens));
  } catch (error) {
    console.error("Error:", error.message);
  }
  