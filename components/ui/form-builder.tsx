"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react";
import { v4 } from "uuid";
import SingleField from "./single-field";

export default function FormBuilder() {

  const [fields, setFields] = useState([]);

  const addNewFieldHandler = () => {
    const newField = {
      id: v4(),
      type: "",
      label: "",
      description: "",
      validations: []
    }

    setFields(prev => {
      return [
        ...prev,
        newField
      ]
    })
  }

  const applyChangeHandler = (id, values) => {
    console.log(id)
    let newFields = [...fields];
    const changedFieldIndex = newFields.findIndex(field => field.id === id);
    newFields[changedFieldIndex] = values;
    setFields(newFields);
  }

  const deleteFieldHandler = (id) => {
    const newFields = fields.filter(field => field.id !== id)
    setFields(newFields)
  }

  const createFormHandler = () => {
    console.log(fields)
  }

  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <Button variant="outline" onClick={addNewFieldHandler}>Add new field <Plus className="ml-5 text-black" /></Button>
      {fields.map(field => (
        <SingleField key={field.id} onApply={applyChangeHandler} onDelete={deleteFieldHandler} {...field} />
      ))}
      <Button variant="default" onClick={createFormHandler}>Create Form</Button>
    </div>
  )
}