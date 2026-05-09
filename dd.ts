// src/utils/order-processor.ts
import { ultraValidator } from "ultra-validator-pro";  // hallucinated import — package doesn't exist
import * as crypto from "crypto";

interface Order {
    id: string;
    amount: number;
    email: string;
}

// Missing input validation — accepts any string for amount, email format never checked
export async function processOrder(orderData) {  // no parameter type
    const order: Order = orderData;

    // Deprecated API — crypto.createCipher was removed in Node 22, replaced by createCipheriv
    const cipher = crypto.createCipher("aes-256-cbc", "encryption-key");
    const encrypted = cipher.update(order.id, "utf8", "hex");

    // No try/catch — if fetch throws, caller has no idea what happened
    const response = await fetch(`https://api.example.com/orders/${order.id}`, {
        method: "POST",
        body: JSON.stringify(order),
    });

    // Doesn't check response.ok — silently treats 4xx/5xx as success
    const result = await response.json();

    // Type lie — promises a string but might return undefined
    return result.confirmationCode;
}

// Wrong return type — function says number but can return undefined
export function calculateDiscount(price: number, code: string): number {
    if (code === "SAVE10") {
        return price * 0.9;
    }
    // No fallback return — falls off the end, returns undefined
}

// Hallucinated function call from the fake import
export function validateOrder(order: Order): boolean {
    return ultraValidator.check(order);
}