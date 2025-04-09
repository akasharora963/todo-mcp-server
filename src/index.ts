import {
    McpServer
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// In-memory storage for todos
interface Todo {
    id: number;
    text: string;
}

let todos: Todo[] = [];
let nextId = 1;

// Create an MCP server
const server = new McpServer({
    name: "todo",
    version: "1.0.0",
});

// Add a tool
server.tool("add-todo", { text: z.string() }, async ({ text }) => {
    const id = nextId++;
    todos.push({ id, text });
    return {
        content: [
            {
                type: "text",
                text: `"${text}" was successfully added to your To Do list with ID: ${id}`,
            },
        ],
    };
});

server.tool("get-todos", {}, async () => {
    if (todos.length === 0) {
        return {
            content: [
                {
                    type: "text",
                    text: "You have no todos in your list.",
                },
            ],
        };
    }

    const todoList = todos.map(todo => `${todo.id}. ${todo.text}`).join('\n');
    return {
        content: [
            {
                type: "text",
                text: `Your todos:\n${todoList}`,
            },
        ],
    };
});

server.tool("remove-todo", { id: z.number() }, async ({ id }) => {
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);

    if (todos.length === initialLength) {
        return {
            content: [
                {
                    type: "text",
                    text: `No todo found with ID: ${id}`,
                },
            ],
        };
    }

    return {
        content: [
            {
                type: "text",
                text: `To Do item (ID: ${id}) was successfully removed from your list`,
            },
        ],
    };
});

// Start receiving messages on stdin and sending messages on stdout
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("To Do MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});