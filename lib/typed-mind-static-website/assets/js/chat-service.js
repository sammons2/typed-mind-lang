// Chat Service - API communication with ChatGPT and Claude
class ChatService {
  constructor(tokenManager) {
    this.tokenManager = tokenManager;
    this.systemPrompt = this.buildSystemPrompt();
  }

  /**
   * Build the system prompt with TypedMind grammar documentation
   */
  buildSystemPrompt() {
    return `You are a TypedMind AI assistant. TypedMind is a DSL (Domain Specific Language) for describing software architecture.

IMPORTANT: Always provide TypedMind code in properly formatted code blocks with the language identifier "typedmind" for syntax highlighting.

## TypedMind DSL Grammar Reference

TypedMind supports both longform and shortform syntax for describing software architecture.

### Entity Types:
- **Program**: Defines an application entry point
- **File**: Defines a source code file
- **Function**: Defines a function with its type signature  
- **Class**: Defines a class with inheritance
- **Constants**: Defines a constants/configuration file
- **DTO**: Defines a Data Transfer Object
- **Asset**: Defines a static asset
- **UIComponent**: Defines a UI component (&! for root)
- **RunParameter**: Defines a runtime parameter
- **Dependency**: Defines an external dependency

### Shortform Syntax Patterns:
- Program: \`Name -> EntryPoint [Purpose] [Version]\`
- File: \`Name @ path:\`
- Function: \`Name :: Signature\`
- Class: \`Name <: BaseClass[, Interface1, Interface2]\`
- Constants: \`Name ! path [: Schema]\`
- Asset: \`Name ~ Description\`
- UI Component: \`Name & Description\` | \`Name &! Description\` (root)
- Run Parameter: \`Name $type Description [(required)]\`
- Dependency: \`Name ^ Purpose [Version]\`

### Continuation Patterns:
- Imports: \`<- [Database, UserModel]\`
- Exports: \`-> [createUser, getUser]\`
- Calls: \`~> [validate, save]\`
- Input: \`<- UserCreateDTO\`
- Output: \`-> UserDTO\`
- Methods: \`=> [create, read, update]\`
- Affects: \`~ [UserList, UserForm]\`
- Contains: \`> [Header, Footer]\`
- Contained By: \`< [Dashboard]\`
- DTO Field: \`- name: string "User name"\`
- Comment: \`# This is a comment\`
- Description: \`"Creates a new user"\`
- Default Value: \`= "default-value"\`
- Consumes: \`$< [DATABASE_URL, API_KEY]\`

### Example TypedMind Code:

\`\`\`typedmind
# Todo Application Architecture
TodoApp -> AppEntry "Main todo application" v1.0.0

# Data Models
UserService @ src/services/user.ts:
  <- [Database, UserModel]
  -> [createUser, getUser, updateUser]
  "Handles user business logic"

createUser :: (data: UserCreateDTO) => Promise<User>
  "Creates a new user in the database"
  <- UserCreateDTO
  -> User
  ~> [validateUser, Database.insert, sendWelcomeEmail]
  ~ [UserList, UserCount]
  $< [DATABASE_URL, SMTP_HOST]

UserCreateDTO % "Data for creating a new user"
  - name: string "User full name"
  - email: string "User email address"
  - password: string "User password (will be hashed)"
  - age?: number "User age (optional)"

App &! "Root application component"
  > [Header, MainContent, Footer]

UserList & "Displays list of users"
  < [MainContent]
  > [UserCard]

DATABASE_URL $env "PostgreSQL connection string" (required)
SMTP_HOST $env "Email server host"
  = "localhost"

express ^ "Web framework" v4.18.0
@types/node ^ "Node.js type definitions" v20.0.0
\`\`\`

Your role is to help users:
1. Generate TypedMind code from natural language descriptions
2. Explain TypedMind syntax and patterns
3. Convert between longform and shortform syntax
4. Review and improve architecture definitions
5. Answer questions about software architecture patterns

Always respond with clear, well-structured TypedMind code when generating architecture definitions.`;
  }

  /**
   * Send a message to the selected AI provider
   */
  async sendMessage(message, provider, conversationHistory = []) {
    try {
      const token = await this.tokenManager.decryptToken(provider);
      if (!token) {
        throw new Error('No API token found. Please configure your API token first.');
      }

      if (provider === 'openai') {
        return await this.sendToOpenAI(message, token, conversationHistory);
      } else if (provider === 'anthropic') {
        return await this.sendToClaude(message, token, conversationHistory);
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }
    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  }

  /**
   * Send message to OpenAI ChatGPT
   */
  async sendToOpenAI(message, token, conversationHistory) {
    const messages = [
      { role: 'system', content: this.systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: messages,
        max_tokens: 2000,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error('Invalid API token. Please check your OpenAI API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else if (response.status === 403) {
        throw new Error('Access denied. Please check your API key permissions.');
      } else {
        throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
      }
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI API');
    }

    return {
      content: data.choices[0].message.content,
      role: 'assistant',
      provider: 'openai',
      timestamp: Date.now()
    };
  }

  /**
   * Send message to Anthropic Claude
   */
  async sendToClaude(message, token, conversationHistory) {
    // Convert conversation history to Claude format
    const messages = [
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': token,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 2000,
        system: this.systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error('Invalid API token. Please check your Anthropic API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else if (response.status === 403) {
        throw new Error('Access denied. Please check your API key permissions.');
      } else {
        throw new Error(errorData.error?.message || `Claude API error: ${response.status}`);
      }
    }

    const data = await response.json();
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      throw new Error('Invalid response format from Claude API');
    }

    return {
      content: data.content[0].text,
      role: 'assistant',
      provider: 'anthropic',
      timestamp: Date.now()
    };
  }

  /**
   * Test API token validity
   */
  async testToken(provider) {
    try {
      const testMessage = "Hello! This is a test message to verify the API connection.";
      const response = await this.sendMessage(testMessage, provider, []);
      return { success: true, response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Extract TypedMind code blocks from a message
   */
  extractTypedMindCode(content) {
    const codeBlocks = [];
    const regex = /```(?:typedmind|tmd)?\n?([\s\S]*?)```/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const code = match[1].trim();
      if (code) {
        codeBlocks.push(code);
      }
    }

    return codeBlocks;
  }

  /**
   * Get conversation history in the format expected by each provider
   */
  formatConversationHistory(history, provider) {
    if (provider === 'openai') {
      return history.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
    } else if (provider === 'anthropic') {
      // Claude expects alternating user/assistant messages
      return history
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
    }
    return [];
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.ChatService = ChatService;
}