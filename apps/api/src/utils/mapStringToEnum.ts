function mapStringToEnum<T>(str: string, enumType: T): T[keyof T] | undefined {
  const enumKeys = Object.keys(enumType).filter((key) => isNaN(Number(key)));
  const enumValues = enumKeys.map((key) => enumType[key]);

  const index = enumKeys.findIndex((key) => key === str);
  if (index !== -1) {
    return enumValues[index];
  }
  throw new Error('Invalid enum value');
  return undefined;
}

export default mapStringToEnum;
