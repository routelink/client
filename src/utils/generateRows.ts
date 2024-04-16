type BaseFieldType = 'str' | 'int' | 'float' | 'date';
type FieldType = BaseFieldType | Record<string, BaseFieldType>;
type FieldDescription = { [key: string]: FieldType };

function randomStr(length: number = 10): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function randomInt(min: number = 0, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number = 0.0, max: number = 100.0): number {
  return Math.random() * (max - min) + min;
}

function randomDate(start: Date = new Date(2000, 0, 1), end: Date = new Date()): number {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  ).getTime();
}

function generateFields(fields: FieldDescription): unknown {
  const row: { [key: string]: unknown } = {};
  Object.entries(fields).forEach(([column, type]) => {
    if (typeof type === 'string') {
      // Base case
      switch (type) {
        case 'str':
          row[column] = randomStr();
          break;
        case 'int':
          row[column] = randomInt();
          break;
        case 'float':
          row[column] = randomFloat();
          break;
        case 'date':
          row[column] = randomDate();
          break;
      }
    } else {
      // If the type is an object, handle it recursively
      row[column] = generateFields(type);
    }
  });
  return row;
}

export const generateRows = (numRows: number, fields: FieldDescription) => {
  return Array.from({ length: numRows }, () => generateFields(fields));
};
