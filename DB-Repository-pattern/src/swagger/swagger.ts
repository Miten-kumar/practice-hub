import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product & User API",
      version: "1.0.0",
      description:
        "Versioned REST API documentation for users and products, including paginated v2 product endpoints and structured error responses.",
    },
    tags: [
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Products V1",
        description: "Original product endpoints",
      },
      {
        name: "Products V2",
        description:
          "Version 2 product endpoints with pagination and HATEOAS links",
      },
    ],
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            prod_id: { type: "integer", example: 1 },
            prod_name: { type: "string", example: "Wireless Mouse" },
            prod_description: {
              type: "string",
              example: "Ergonomic wireless mouse with USB receiver",
            },
            price: { type: "number", example: 999.99 },
            stock: { type: "integer", example: 25 },
          },
        },
        UpdateProductRequest: {
          type: "object",
          properties: {
            prod_name: { type: "string", example: "Wireless Mouse Pro" },
            prod_description: {
              type: "string",
              example: "Updated ergonomic wireless mouse",
            },
            price: { type: "number", example: 1299.99 },
            stock: { type: "integer", example: 30 },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Manush" },
            email: { type: "string", example: "manush@example.com" },
            mobile_no: { type: "string", example: "9876543210" },
            password: { type: "string", example: "secret123" },
          },
        },
        CreateUserRequest: {
          type: "object",
          required: ["name", "email", "mobile_no", "password"],
          properties: {
            name: { type: "string", example: "Manush" },
            email: { type: "string", example: "manush@example.com" },
            mobile_no: { type: "string", example: "9876543210" },
            password: { type: "string", example: "secret123" },
          },
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "Updated Manush" },
            email: { type: "string", example: "updated@example.com" },
            mobile_no: { type: "string", example: "9876501234" },
            password: { type: "string", example: "newsecret123" },
          },
        },
        ProductListV1Response: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Products retrieved successfully",
            },
            products: {
              type: "array",
              items: { $ref: "#/components/schemas/Product" },
            },
          },
        },
        ProductListV2Response: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Products retrieved successfully",
            },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/Product" },
            },
            pagination: {
              type: "object",
              properties: {
                page: { type: "integer", example: 1 },
                limit: { type: "integer", example: 10 },
                total: { type: "integer", example: 42 },
                totalPages: { type: "integer", example: 5 },
              },
            },
            links: {
              type: "object",
              properties: {
                next: {
                  type: "string",
                  nullable: true,
                  example: "http://localhost:3000/v2/products?page=2&limit=10",
                },
                prev: {
                  type: "string",
                  nullable: true,
                  example: null,
                },
              },
            },
          },
        },
        ProductUpdateResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Product updated successfully",
            },
            product: { $ref: "#/components/schemas/Product" },
          },
        },
        UserCreateResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "User created successfully" },
            user: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
            },
          },
        },
        UserUpdateResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "User updated successfully" },
            user: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                code: { type: "string", example: "PRODUCT_NOT_FOUND" },
                message: { type: "string", example: "Product not found" },
                details: {
                  nullable: true,
                  example: null,
                },
              },
            },
            meta: {
              type: "object",
              properties: {
                statusCode: { type: "integer", example: 404 },
                method: { type: "string", example: "PATCH" },
                path: { type: "string", example: "/v2/products/999" },
                timestamp: {
                  type: "string",
                  format: "date-time",
                  example: "2026-03-24T10:30:00.000Z",
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/routes/v2/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
