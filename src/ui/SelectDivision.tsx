import { districtData } from "@/data/districtData";
import { divisionData } from "@/data/divisionData";
import { DivisionPropsType } from "@/types/FormTypes";
import { Select, SelectItem } from "@nextui-org/react";

const SelectDivision = ({
  division,
  setDivision,
  setDistrict,
  variant = "bordered",
}: DivisionPropsType) => {
  const handleChange = (e: { target: { value: string } }) => {
    // Select the division name
    const selectedDivisionName = e.target.value;
    setDivision(selectedDivisionName);

    // Find the division object
    const findDivision = divisionData.find(
      (divisionItem) => divisionItem.name === selectedDivisionName
    );

    // Filter district by division id
    const filteredDistricts = districtData.filter(
      (item) => item.division_id === findDivision?.id
    );

    // Set the district (default to first if available)
    setDistrict(filteredDistricts.length > 0 ? filteredDistricts[0].name : "");
  };

  return (
    <Select
      isRequired
      disallowEmptySelection
      label="Division"
      variant={variant}
      placeholder="Select a Division"
      selectedKeys={[division]}
      className="w-full"
      onChange={handleChange}
    >
      {divisionData.map((division) => (
        <SelectItem key={division.name} value={division.name}>
          {division.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectDivision;
