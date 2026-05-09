// 1. Primitive Types
let age: number = 25;
let name: string = "Alice";
let isActive: boolean = true;
let emptyValue: null = null;
let unassignedValue: undefined = undefined;

// 2. Special Types
let dynamicValue: any = 10;
dynamicValue = "Hello";

let unknownValue: unknown = "Hello";

function logMessage(): void {
    console.log("This is a log message.");
}

function throwError(message: string): never {
    throw new Error(message);
}

// 3. Object Types
let user: { name: string; age: number } = { name: "Alice", age: 25 };

// 4. Array Types
let numbers: number[] = [1, 2, 3, 4];
let names: string[] = ["Alice", "Bob", "Charlie"];

// 5. Tuple Types
let person: [string, number] = ["Alice", 25];

// 6. Custom Types
type Point = { x: number; y: number };
let p1: Point = { x: 10, y: 20 };

interface User {
    name: string;
    age: number;
}
let user2: User = { name: "Bob", age: 30 };

// 7. Union and Intersection Types
let id: string | number = "123";
id = 456;

type Person = { name: string };
type Employee = { id: number };
let employee: Person & Employee = { name: "Alice", id: 123 };

// 8. Literal Types
let direction: "left" | "right" | "up" | "down" = "left";

// 9. Enum Types
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE",
}
let color: Color = Color.Green;

// Output
console.log(age, name, isActive, emptyValue, unassignedValue);
console.log(dynamicValue);
console.log(unknownValue);
logMessage();
// throwError("Something went wrong!");
console.log(user);
console.log(numbers, names);
console.log(person);
console.log(p1);
console.log(user2);
console.log(id);
console.log(employee);
console.log(direction);
console.log(color);