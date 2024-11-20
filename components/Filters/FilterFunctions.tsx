import { PotterObject } from "@/constants/Types";

export function getFilterableFields(object: PotterObject): string[] {
  return Object.entries(object.attributes).filter(([key, value]) => !Array.isArray(value)).map(([key, value]) => key)
}

export function toDropdownFormat(fields: string[]): { label: string; value: string }[] {
  return fields.map((field) => ({
    label: field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase()),
    value: field
  }))
}