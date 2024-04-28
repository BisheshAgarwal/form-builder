import { Settings, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react";

export default function SingleField({ onApply, onDelete, ...fieldProps }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({ ...fieldProps })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const valueChangeHandler = (key, value) => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const applyHandler = () => {
    onApply(values.id, values);
    setIsSettingsOpen(false)
  }

  return (
    <div className="w-96 border-gray-500 grid grid-cols-3 items-center">
      <p>{fieldProps.label || "Field label"}</p>
      <Button variant="outline" onClick={() => setIsSettingsOpen(true)}><Settings /></Button>
      <Button variant="outline" onClick={() => onDelete(values.id)}><Trash2 className="text-red-400" /></Button>
      <Popover open={isSettingsOpen} onOpenChange={applyHandler}>
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent side="right">
          <Card>
            <CardContent className="mt-5 flex flex-col gap-5">
              <Select value={values.type || ""} onValueChange={(value) => valueChangeHandler("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="radio">Radio</SelectItem>
                  <SelectItem value="dropdown">Dropdown</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
              <Input type="text" placeholder="Enter label" value={values.label || ""} onChange={(e) => valueChangeHandler("label", e.target.value)} />
              <Input type="text" placeholder="Enter description" value={values.description || ""} onChange={(e) => valueChangeHandler("description", e.target.value)} />
              {["radio", "checkbox", "dropdown"].includes(values?.type) && <Input type="text" placeholder="Comma separated values" value={values.options || ""} onChange={e => valueChangeHandler("options", e.target.value)} />}
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  )
}