import { PotterObject } from "@/constants/Types"


// Returns an array of all non-array fields for a given object
export function getFilterableFields(object: PotterObject): string[] {
  return Object.entries(object.attributes).filter(([key, value]) => !Array.isArray(value)).map(([key, value]) => key)
}


// Transforms a PotterDB property name into an object in a format used by Dropdowns
// e.g. {label: "Blood status", value: "blood_status"}
export function toDropdownFormat(fields: string[]): { label: string, value: string }[] {
  return fields.map((field) => ({
    label: field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase()),
    value: field
  }))
}