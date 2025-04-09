# To Do List MCP Server

A Model Context Protocol (MCP) implementation of a simple To Do list manager that provides basic CRUD operations through MCP tools.

### Features

- Add new To Do items
- View all To Do items
- Remove To Do items by ID
- Type-safe operations using Zod validation
- In-memory storage for simplicity
- Stdio transport for easy integration

### Installation

```bash
npm install @modelcontextprotocol/sdk zod
```

### Usage

Run the server:

```bash
npm run start
```

Available tools:

1. `add-todo`: Add a new To Do item
  - Parameters: `{text: string}`
  - Returns success message with assigned ID


2. `get-todos`: Retrieve all To Do items
  - Returns formatted list of all items or empty state message


3. `remove-todo`: Remove a To Do item
  - Parameters: `{id: number}`
  - Returns success message on removal or error if ID not found



### Example Usage

```typescript
// Add a new todo
await client.callTool({
    name: "add-todo",
    arguments: { text: "Buy groceries" }
});

// Get all todos
await client.callTool({ name: "get-todos" });

// Remove a todo
await client.callTool({
    name: "remove-todo",
    arguments: { id: 1 }
});
```

### Implementation Details

- Uses MCP Server SDK for protocol compliance
- Implements tools pattern for operations 
- Uses stdio transport for communicatio
- Maintains state in memory for simplicity

### Testing

Test the server using MCP Client like claude:

1. Run the server
2. Connect with MCP Inspector
3. Test each tool individually
4. Verify responses and error handling

